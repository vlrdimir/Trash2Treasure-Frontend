import { cn } from "@/lib/utils";

// Custom Tip/Warning Box Component
export const TipBox = ({
  children,
  type = "tip",
}: {
  children: React.ReactNode;
  type?: "tip" | "warning" | "info" | "danger";
}) => {
  const styles = {
    tip: "border-emerald-500 bg-emerald-500/10 text-emerald-300",
    warning: "border-yellow-500 bg-yellow-500/10 text-yellow-300",
    info: "border-blue-500 bg-blue-500/10 text-blue-300",
    danger: "border-red-500 bg-red-500/10 text-red-300",
  };

  const icons = {
    tip: "💡",
    warning: "⚠️",
    info: "ℹ️",
    danger: "🚨",
  };

  return (
    <div className={cn("my-6 rounded-lg border-l-4 p-4", styles[type])}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
