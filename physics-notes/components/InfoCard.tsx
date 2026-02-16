interface InfoCardProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
  color?: "blue" | "green" | "amber" | "purple" | "red" | "yellow" | "indigo" | "orange";
}

const colorMap = {
  blue: "bg-blue-50 border-blue-400 text-blue-900",
  green: "bg-green-50 border-green-400 text-green-900",
  amber: "bg-amber-50 border-amber-400 text-amber-900",
  purple: "bg-purple-50 border-purple-400 text-purple-900",
  red: "bg-red-50 border-red-400 text-red-900",
  yellow: "bg-yellow-50 border-yellow-400 text-yellow-900",
  indigo: "bg-indigo-50 border-indigo-400 text-indigo-900",
  orange: "bg-orange-50 border-orange-400 text-orange-900",
};

export default function InfoCard({
  icon,
  title,
  children,
  color = "blue",
}: InfoCardProps) {
  return (
    <div className={`p-4 rounded-lg border-l-4 ${colorMap[color]}`}>
      <div className="text-sm font-semibold mb-2 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
