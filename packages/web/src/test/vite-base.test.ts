import { describe, expect, it } from "vitest";

import { WEB_BASE_PATH } from "@/lib/basePath";

describe("web build base", () => {
	it("targets the Runi Ops route", () => {
		expect(WEB_BASE_PATH).toBe("/ops/");
	});
});
