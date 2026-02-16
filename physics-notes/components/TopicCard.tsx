import Link from "next/link";

interface TopicCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  category: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  math: { bg: "bg-teal-50", text: "text-teal-700" },
  physics: { bg: "bg-blue-50", text: "text-blue-700" },
};

export default function TopicCard({
  slug,
  title,
  description,
  icon,
  tags,
  category,
}: TopicCardProps) {
  const colors = categoryColors[category] || categoryColors.math;
  return (
    <Link
      href={`/topics/${slug}`}
      className="block p-6 bg-white rounded-2xl shadow-sm border border-stone-200 hover:border-teal-500 hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-2xl mb-2 block">{icon}</span>
          <h3 className="text-lg font-bold text-stone-800 group-hover:text-teal-600 mb-2">
            {title}
          </h3>
          <p className="text-stone-500 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full text-xs`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-teal-500 text-2xl">→</span>
      </div>
    </Link>
  );
}
