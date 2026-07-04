import type { LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface PendingModulePageProps {
	icon: LucideIcon;
	name: string;
}

export function PendingModulePage({ icon, name }: PendingModulePageProps) {
	return (
		<section className="min-h-full flex flex-col" aria-labelledby="pending-module-title">
			<header className="px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
				<p
					className="text-xs font-mono uppercase tracking-wider"
					style={{ color: "var(--text-4)" }}
				>
					Runi Ops
				</p>
				<h1
					id="pending-module-title"
					className="mt-1 text-xl font-semibold tracking-tight"
					style={{ color: "var(--text-1)" }}
				>
					{name}
				</h1>
			</header>
			<div className="flex-1 flex items-center justify-center px-6">
				<EmptyState
					icon={icon}
					title={`${name} is not connected yet`}
					description="No operational data is shown until this module's source contract and gateway are live."
				/>
			</div>
		</section>
	);
}
