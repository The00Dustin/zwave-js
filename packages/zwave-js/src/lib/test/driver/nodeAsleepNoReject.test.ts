import { BasicCCGet, BasicCCSet } from "@zwave-js/cc";
import { MessagePriority, NodeStatus } from "@zwave-js/core";
import type { SendDataRequest } from "@zwave-js/serial/serialapi";
import { MOCK_FRAME_ACK_TIMEOUT, MockZWaveFrameType } from "@zwave-js/testing";
import { wait } from "alcalzone-shared/async";
import path from "node:path";
import { integrationTest } from "../integrationTestSuite.js";

// Repro from #1078

integrationTest(
	"when a node does not respond because it is asleep, the transaction does not get rejected",
	{
		// debug: true,
		provisioningDirectory: path.join(
			__dirname,
			"fixtures/nodeAsleepNoReject",
		),

		testBody: async (t, driver, node2, mockController, mockNode) => {
			node2.markAsAwake();
			mockNode.autoAckControllerFrames = false;

			t.expect(node2.status).toBe(NodeStatus.Awake);

			const command1 = new BasicCCSet({
				nodeId: 2,
				targetValue: 99,
			});
			const basicSetPromise1 = driver.sendCommand(command1, {
				maxSendAttempts: 1,
			});

			const command2 = new BasicCCGet({
				nodeId: 2,
			});
			driver.sendCommand(command2, {
				maxSendAttempts: 1,
			});

			// The node should have received the first command
			await wait(50);
			mockNode.assertReceivedControllerFrame(
				(frame) =>
					frame.type === MockZWaveFrameType.Request
					&& frame.payload instanceof BasicCCSet
					&& frame.payload.targetValue === 99,
				{
					errorMessage: "The first command was not received",
				},
			);

			// The command fails due to no ACK, ...
			t.expect(
				await Promise.race([
					basicSetPromise1,
					wait(MOCK_FRAME_ACK_TIMEOUT + 100).then(() => "timeout"),
				]),
			).toBe("timeout");

			// ...but both should still be in the queue
			const sendQueue = driver["queue"];
			driver.driverLog.sendQueue(sendQueue);
			t.expect(sendQueue.length).toBe(2);
			// with priority WakeUp
			t.expect(
				sendQueue.transactions.get(0)?.priority,
			).toBe(MessagePriority.WakeUp);
			t.expect(
				sendQueue.transactions.get(1)?.priority,
			).toBe(MessagePriority.WakeUp);
			t.expect(node2.status).toBe(NodeStatus.Asleep);

			// And the order should be correct
			t.expect(
				(
					(sendQueue.transactions.get(0)?.message as SendDataRequest)
						.command as BasicCCSet
				).targetValue,
			).toBe(99);
			t.expect(
				(sendQueue.transactions.get(1)?.message as SendDataRequest)
					.command instanceof BasicCCGet,
			).toBe(true);
		},
	},
);
