import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { PendingModulePage } from "@/components/layout/PendingModulePage";

export const Route = createFileRoute("/agents")({
	component: AgentsPage,
});

function AgentsPage() {
	return <PendingModulePage icon={Bot} name="Agents" />;
}
