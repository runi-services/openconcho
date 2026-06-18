import { describe, expect, it } from "vitest";

import { WEB_BASE_PATH } from "@/lib/basePath";
import mainSource from "@/main.tsx?raw";

describe("web build base", () => {
	it("targets the Runi Ops route", () => {
		expect(WEB_BASE_PATH).toBe("/ops/");
	});

	it("configures the application router with the Ops base", () => {
		expect(mainSource).toContain("basepath: WEB_BASE_PATH");
	});
});
