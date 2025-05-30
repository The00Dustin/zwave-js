import { ZWaveError, ZWaveErrorCodes } from "@zwave-js/core";
import { Bytes } from "@zwave-js/shared";
import { clamp } from "alcalzone-shared/math";
import type {
	SetbackSpecialState,
	SetbackState,
	Switchpoint,
	Timezone,
} from "./_Types.js";

export const setbackSpecialStateValues: Record<SetbackSpecialState, number> = {
	"Frost Protection": 0x79,
	"Energy Saving": 0x7a,
	Unused: 0x7f,
};

/**
 * @publicAPI
 * Encodes a setback state to use in a ThermostatSetbackCC
 */
export function encodeSetbackState(state: SetbackState): Bytes {
	let rawValue: number;
	if (typeof state === "string") {
		rawValue = setbackSpecialStateValues[state];
	} else {
		state = clamp(state, -12.8, 12);
		rawValue = Math.round(state * 10);
	}

	const ret = new Bytes(1);
	ret.writeInt8(rawValue);
	return ret;
}

/**
 * @publicAPI
 * Decodes a setback state used in a ThermostatSetbackCC
 */
export function decodeSetbackState(
	data: Uint8Array,
	offset: number = 0,
): SetbackState | undefined {
	const val = Bytes.view(data).readInt8(offset);
	if (val > 120) {
		// Special state, try to look it up
		const foundEntry = Object.entries(setbackSpecialStateValues).find(
			([, v]) => val === v,
		);
		if (!foundEntry) return;
		return foundEntry[0] as SetbackSpecialState;
	} else {
		return val / 10;
	}
}

/**
 * @publicAPI
 * Decodes a switch point used in a ClimateControlScheduleCC
 */
export function decodeSwitchpoint(data: Uint8Array): Switchpoint {
	return {
		hour: data[0] & 0b000_11111,
		minute: data[1] & 0b00_111111,
		state: decodeSetbackState(data, 2),
	};
}

/**
 * @publicAPI
 * Encodes a switch point to use in a ClimateControlScheduleCC
 */
export function encodeSwitchpoint(point: Switchpoint): Bytes {
	if (point.state == undefined) {
		throw new ZWaveError(
			"The given Switchpoint is not valid!",
			ZWaveErrorCodes.CC_Invalid,
		);
	}
	return Bytes.concat([
		[
			point.hour & 0b000_11111,
			point.minute & 0b00_111111,
		],
		encodeSetbackState(point.state),
	]);
}

/**
 * @publicAPI
 * Decodes timezone information used in time related CCs
 */
export function parseTimezone(data: Uint8Array): Timezone {
	const hourSign = !!(data[0] & 0b1000_0000);
	const hour = data[0] & 0b0111_1111;
	const minute = data[1];
	const standardOffset = (hourSign ? -1 : 1) * (hour * 60 + minute);
	const deltaSign = !!(data[2] & 0b1000_0000);
	const deltaMinutes = data[2] & 0b0111_1111;
	const dstOffset = standardOffset + (deltaSign ? -1 : 1) * deltaMinutes;

	return {
		standardOffset,
		dstOffset,
	};
}

/**
 * @publicAPI
 * Decodes timezone information used in time related CCs
 */
export function encodeTimezone(tz: Timezone): Bytes {
	if (
		Math.abs(tz.standardOffset) >= 24 * 60
		|| Math.abs(tz.dstOffset) >= 24 * 60
	) {
		throw new ZWaveError(
			"The given timezone is not valid!",
			ZWaveErrorCodes.CC_Invalid,
		);
	}
	const minutes = Math.abs(tz.standardOffset) % 60;
	const hour = Math.floor(Math.abs(tz.standardOffset) / 60);
	const hourSign = tz.standardOffset < 0 ? 1 : 0;

	const delta = tz.dstOffset - tz.standardOffset;
	const deltaMinutes = Math.abs(delta);
	const deltaSign = delta < 0 ? 1 : 0;

	return Bytes.from([
		(hourSign << 7) | (hour & 0b0111_1111),
		minutes,
		(deltaSign << 7) | (deltaMinutes & 0b0111_1111),
	]);
}
