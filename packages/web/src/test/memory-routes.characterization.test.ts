import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
	routeTree,
	history: createMemoryHistory(),
});

const existingMemoryRoutes = [
	["workspaces", "/workspaces"],
	["workspace", "/workspaces/$workspaceId"],
	["peers", "/workspaces/$workspaceId/peers"],
	["peer", "/workspaces/$workspaceId/peers/$peerId"],
	["peer chat", "/workspaces/$workspaceId/peers/$peerId/chat"],
	["peer playground", "/workspaces/$workspaceId/peers/$peerId/playground"],
	["sessions", "/workspaces/$workspaceId/sessions"],
	["session", "/workspaces/$workspaceId/sessions/$sessionId"],
	["conclusions", "/workspaces/$workspaceId/conclusions"],
	["dreams", "/workspaces/$workspaceId/dreams"],
	["queue", "/workspaces/$workspaceId/queue"],
	["webhooks", "/workspaces/$workspaceId/webhooks"],
	["settings", "/settings"],
] as const;

describe("Memory route baseline before the Runi Ops shell migration", () => {
	for (const [label, path] of existingMemoryRoutes) {
		it(`registers the existing ${label} route`, () => {
			expect(router.routesByPath[path]).toBeDefined();
		});
	}

	it("records that the referenced Memory Pulse route is absent from this source revision", () => {
		expect("/workspaces/$workspaceId/memory" in router.routesByPath).toBe(false);
	});
});

describe("Runi Ops domain route baseline", () => {
	for (const path of ["/agents", "/resources", "/telemetry", "/governance"] as const) {
		it(`registers the ${path} shell route`, () => {
			expect(router.routesByPath[path]).toBeDefined();
		});
	}
});
