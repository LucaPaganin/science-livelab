import Link from "next/link";
import { getAllTopics } from "@/lib/mdx";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  math: { bg: "bg-teal-50", text: "text-teal-700", border: "hover:border-teal-500" },
  physics: { bg: "bg-blue-50", text: "text-blue-700", border: "hover:border-blue-500" },
};

const categoryLabels: Record<string, string> = {
  math: "Matematica",
  physics: "Fisica",
};

export default function Home() {
  const topics = getAllTopics();

  const categories = Array.from(new Set(topics.map((t) => t.frontmatter.category)));

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-stone-800 mb-2 serif">
            Science Live Lab
          </h1>
          <p className="text-stone-500">
            Raccolta di pagine interattive che esplorano concetti di matematica,
            fisica e scienza
          </p>
        </header>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-bold text-stone-700 mb-4 serif">
              {categoryLabels[category] || category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {topics
                .filter((t) => t.frontmatter.category === category)
                .map((topic) => {
                  const colors = categoryColors[category] || categoryColors.math;
                  return (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className={`block p-6 bg-white rounded-2xl shadow-sm border border-stone-200 ${colors.border} hover:shadow-md transition-all group`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-2xl mb-2 block">
                            {topic.frontmatter.icon}
                          </span>
                          <h3 className="text-lg font-bold text-stone-800 group-hover:text-teal-600 mb-2">
                            {topic.frontmatter.title}
                          </h3>
                          <p className="text-stone-500 text-sm mb-3">
                            {topic.frontmatter.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {topic.frontmatter.topics?.slice(0, 3).map((tag: string) => (
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
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
