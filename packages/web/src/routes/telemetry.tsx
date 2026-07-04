import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { PendingModulePage } from "@/components/layout/PendingModulePage";

export const Route = createFileRoute("/telemetry")({
	component: TelemetryPage,
});

function TelemetryPage() {
	return <PendingModulePage icon={Activity} name="Telemetry" />;
}
