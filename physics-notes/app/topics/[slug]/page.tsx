import { notFound } from "next/navigation";
import { getTopicSlugs, getTopicBySlug } from "@/lib/mdx";
import TopicPageClient from "./TopicPageClient";

export function generateStaticParams() {
  return getTopicSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const slugs = getTopicSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const { frontmatter, content } = getTopicBySlug(slug);

  return (
    <TopicPageClient
      slug={slug}
      frontmatter={frontmatter}
      content={content}
    />
  );
}
