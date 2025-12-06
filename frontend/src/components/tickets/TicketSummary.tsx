import { Sparkles } from "lucide-react";
import { TicketPriority, priorityLabels, priorityStyles } from "../../types/ticket";

interface TicketSummaryProps {
    title: string;
    description: string;
    priority: TicketPriority;
}

export default function TicketSummary({ title, description, priority }: TicketSummaryProps) {
    return (
        <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-4">
                <Sparkles className="w-4 h-4" />
                <span>AI Generated</span>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wide">
                        Title
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-dark-text-main mt-1">
                        {title}
                    </p>
                </div>

                <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wide">
                        Description
                    </label>
                    <p className="text-gray-700 dark:text-dark-text-main mt-1">
                        {description}
                    </p>
                </div>

                <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-dark-text-muted uppercase tracking-wide">
                        Priority
                    </label>
                    <div className="mt-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priorityStyles[priority]}`}>
                            {priorityLabels[priority]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
