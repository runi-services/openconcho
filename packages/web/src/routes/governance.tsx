import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PendingModulePage } from "@/components/layout/PendingModulePage";

export const Route = createFileRoute("/governance")({
	component: GovernancePage,
});

function GovernancePage() {
	return <PendingModulePage icon={ShieldCheck} name="Governance" />;
}
