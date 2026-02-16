import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "topics");

export interface TopicFrontmatter {
  title: string;
  description: string;
  category: string;
  topics: string[];
  difficulty: string;
  lastUpdated: string;
  color: string;
  icon: string;
  navSections: { id: string; label: string }[];
}

export interface TopicMeta {
  slug: string;
  frontmatter: TopicFrontmatter;
}

export function getTopicSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getTopicBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data as TopicFrontmatter,
    content,
  };
}

export function getAllTopics(): TopicMeta[] {
  const slugs = getTopicSlugs();
  return slugs.map((slug) => {
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      slug,
      frontmatter: data as TopicFrontmatter,
    };
  });
}
