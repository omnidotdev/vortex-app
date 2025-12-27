import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, string> = {
  developer:
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  communication:
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  ai: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  payments:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  email: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  sms: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  productivity: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  database: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  storage:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const categoryLabels: Record<string, string> = {
  developer: "Developer",
  communication: "Communication",
  ai: "AI",
  payments: "Payments",
  email: "Email",
  sms: "SMS",
  productivity: "Productivity",
  database: "Database",
  storage: "Storage",
  other: "Other",
};

interface IntegrationCategoryBadgeProps {
  category: string;
}

export function IntegrationCategoryBadge({
  category,
}: IntegrationCategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors.other;
  const label = categoryLabels[category] || category;

  return (
    <Badge variant="outline" className={`${colorClass} border-0`}>
      {label}
    </Badge>
  );
}
