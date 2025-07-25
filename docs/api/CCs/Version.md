# Version CC

?> CommandClass ID: `0x86`

## Version CC methods

### `get`

```ts
async get(): Promise<Pick<VersionCCReport, "libraryType" | "protocolVersion" | "firmwareVersions" | "hardwareVersion"> | undefined>;
```

### `sendReport`

```ts
async sendReport(options: VersionCCReportOptions): Promise<void>;
```

### `getCCVersion`

```ts
async getCCVersion(
	requestedCC: CommandClasses,
): Promise<MaybeNotKnown<number>>;
```

### `reportCCVersion`

```ts
async reportCCVersion(
	requestedCC: CommandClasses,
	version?: number,
): Promise<void>;
```

### `getCapabilities`

```ts
async getCapabilities(): Promise<Pick<VersionCCCapabilitiesReport, "supportsZWaveSoftwareGet"> | undefined>;
```

### `reportCapabilities`

```ts
async reportCapabilities(): Promise<void>;
```

### `getZWaveSoftware`

```ts
async getZWaveSoftware(): Promise<Pick<VersionCCZWaveSoftwareReport, "sdkVersion" | "applicationFrameworkAPIVersion" | "applicationFrameworkBuildNumber" | "hostInterfaceVersion" | "hostInterfaceBuildNumber" | "zWaveProtocolVersion" | "zWaveProtocolBuildNumber" | "applicationVersion" | "applicationBuildNumber"> | undefined>;
```

## Version CC values

### `applicationBuildNumber`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "applicationBuildNumber",
}
```

- **label:** Application build number
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `applicationFrameworkAPIVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "applicationFrameworkAPIVersion",
}
```

- **label:** Z-Wave application framework API version
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `applicationFrameworkBuildNumber`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "applicationFrameworkBuildNumber",
}
```

- **label:** Z-Wave application framework API build number
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `applicationVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "applicationVersion",
}
```

- **label:** Application version
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `firmwareVersions`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "firmwareVersions",
}
```

- **label:** Z-Wave chip firmware versions
- **min. CC version:** 1
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string[]"`

### `hardwareVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "hardwareVersion",
}
```

- **label:** Z-Wave chip hardware version
- **min. CC version:** 2
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"number"`

### `libraryType`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "libraryType",
}
```

- **label:** Library type
- **min. CC version:** 1
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"number"`

### `protocolVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "protocolVersion",
}
```

- **label:** Z-Wave protocol version
- **min. CC version:** 1
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `sdkVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "sdkVersion",
}
```

- **label:** SDK version
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `serialAPIBuildNumber`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "hostInterfaceBuildNumber",
}
```

- **label:** Serial API build number
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `serialAPIVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "hostInterfaceVersion",
}
```

- **label:** Serial API version
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `zWaveProtocolBuildNumber`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "zWaveProtocolBuildNumber",
}
```

- **label:** Z-Wave protocol build number
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`

### `zWaveProtocolVersion`

```ts
{
	commandClass: CommandClasses.Version,
	endpoint: 0,
	property: "zWaveProtocolVersion",
}
```

- **label:** Z-Wave protocol version
- **min. CC version:** 3
- **readable:** true
- **writeable:** false
- **stateful:** true
- **secret:** false
- **value type:** `"string"`
