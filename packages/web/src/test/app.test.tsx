import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoProvider } from "@/context/DemoContext";
import { MetadataProvider } from "@/context/MetadataContext";
import { useDemo } from "@/hooks/useDemo";
import { routeTree } from "@/routeTree.gen";

function renderAt(initialPath: string) {
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({ initialEntries: [initialPath] }),
	});
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<DemoProvider>
				<MetadataProvider>
					{/* biome-ignore lint/suspicious/noExplicitAny: test router type */}
					<RouterProvider router={router as any} />
				</MetadataProvider>
			</DemoProvider>
		</QueryClientProvider>,
	);
}

describe("first load with no config", () => {
	it("renders the settings form on first paint when no config exists", async () => {
		localStorage.clear();
		renderAt("/");
		// Should be visible immediately — bug 1: RootLayout returns null while
		// a useEffect-driven navigate fires, leaving a blank screen.
		expect(
			await screen.findByText(/Connect to Honcho Cloud or your self-hosted instance/i),
		).toBeInTheDocument();
	});

	it("presents the Runi Ops brand while retaining shell controls", async () => {
		localStorage.clear();
		renderAt("/settings");

		expect((await screen.findAllByText("Runi Ops")).length).toBeGreaterThanOrEqual(2);
		expect(screen.getByTitle("Enable demo mode")).toBeInTheDocument();
		expect(screen.getByTitle("Show raw metadata")).toBeInTheDocument();
		expect(screen.getByTitle(/Switch to (light|dark) mode/)).toBeInTheDocument();
	});
});

describe("Sidebar/useDemo availability across routes", () => {
	it("does not throw when a useDemo consumer mounts alongside the routed app", () => {
		function DemoConsumer() {
			const { demo } = useDemo();
			return <span data-testid="demo-flag">{String(demo)}</span>;
		}
		// After the fix, DemoProvider and MetadataProvider wrap the app at
		// the root (main.tsx) so consumers anywhere in the tree resolve.
		// This test renders a consumer as a sibling of the router under the
		// same providers the production wiring uses.
		localStorage.clear();
		expect(() => {
			const router = createRouter({
				routeTree,
				history: createMemoryHistory({ initialEntries: ["/settings"] }),
			});
			const qc = new QueryClient({
				defaultOptions: { queries: { retry: false } },
			});
			render(
				<QueryClientProvider client={qc}>
					<DemoProvider>
						<MetadataProvider>
							{/* biome-ignore lint/suspicious/noExplicitAny: test router type */}
							<RouterProvider router={router as any} />
							<DemoConsumer />
						</MetadataProvider>
					</DemoProvider>
				</QueryClientProvider>,
			);
		}).not.toThrow();
		expect(screen.getByTestId("demo-flag")).toBeInTheDocument();
	});
});

describe("Runi Ops top-level navigation", () => {
	it("exposes exactly the six approved product domains", async () => {
		localStorage.clear();
		renderAt("/settings");
		await screen.findByRole("heading", { name: "Runi Ops" });

		const navigation = screen.getByRole("navigation");
		for (const name of ["Overview", "Memory", "Agents", "Resources", "Telemetry", "Governance"]) {
			expect(navigation.querySelector(`a[title="${name}"]`)).toBeInTheDocument();
		}
		expect(navigation.querySelectorAll(":scope > a")).toHaveLength(6);
		expect(navigation).not.toHaveTextContent("Dashboard");
		expect(navigation).not.toHaveTextContent("Seed Kits");
		expect(navigation).not.toHaveTextContent("Settings");
	});
});
