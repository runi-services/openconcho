import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { PendingModulePage } from "@/components/layout/PendingModulePage";

export const Route = createFileRoute("/resources")({
	component: ResourcesPage,
});

function ResourcesPage() {
	return <PendingModulePage icon={Database} name="Resources" />;
}
