"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import type { TopicFrontmatter } from "@/lib/mdx";

// Topic-specific interactive components
import {
  SaddleSurface,
  FormulaCards,
  DecimalsConverter,
  EquationSimulator,
  ResolutionProcess,
} from "@/components/algebra/AlgebraInteractive";
import {
  ParametricCircle,
  ParabolaInversion,
} from "@/components/conical/ConicalInteractive";
import { FunctionDefinitionCards } from "@/components/injective/InjectiveInteractive";
import {
  EllipseVisualizer,
  KeplerCalculator,
  PyramidsCalculator,
  AreasAnimation,
} from "@/components/orbital/OrbitalInteractive";
import {
  TemperatureSimulator,
  WaterHeatingCalc,
  IronFusionCalc,
  IceToWaterCalc,
} from "@/components/thermodynamics/ThermodynamicsInteractive";

// Color themes per topic
const themes: Record<string, {
  accent: string;
  bg: string;
  border: string;
  hover: string;
  active: string;
}> = {
  "algebra-explorer": { accent: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", hover: "hover:bg-teal-100", active: "bg-teal-600" },
  "conical-inverse-functions": { accent: "text-indigo-700", bg: "bg-stone-100", border: "border-stone-200", hover: "hover:bg-stone-200", active: "bg-indigo-600" },
  "injective-functions": { accent: "text-indigo-700", bg: "bg-stone-100", border: "border-stone-200", hover: "hover:bg-stone-200", active: "bg-indigo-600" },
  "orbital-mechanics": { accent: "text-blue-700", bg: "bg-slate-100", border: "border-slate-200", hover: "hover:bg-slate-200", active: "bg-blue-600" },
  "thermodynamics": { accent: "text-red-700", bg: "bg-red-100", border: "border-red-200", hover: "hover:bg-red-200", active: "bg-red-600" },
};

// Component map for MDX replacement tokens
const componentMap: Record<string, Record<string, React.ComponentType>> = {
  "algebra-explorer": {
    SaddleSurface,
    FormulaCards,
    DecimalsConverter,
    EquationSimulator,
    ResolutionProcess,
  },
  "conical-inverse-functions": {
    ParametricCircle,
    ParabolaInversion,
  },
  "injective-functions": {
    FunctionDefinitionCards,
    ParabolaInversion,
  },
  "orbital-mechanics": {
    EllipseVisualizer,
    KeplerCalculator,
    PyramidsCalculator,
    AreasAnimation,
  },
  "thermodynamics": {
    TemperatureSimulator,
    WaterHeatingCalc,
    IronFusionCalc,
    IceToWaterCalc,
  },
};

interface TopicPageClientProps {
  slug: string;
  frontmatter: TopicFrontmatter;
  content: string;
}

export default function TopicPageClient({
  slug,
  frontmatter,
  content,
}: TopicPageClientProps) {
  const theme = themes[slug] || themes["algebra-explorer"];
  const components = componentMap[slug] || {};

  // Re-run MathJax when content loads
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      setTimeout(() => {
        (window as any).MathJax.typesetPromise?.();
      }, 100);
    }
  }, [slug]);

  // Parse content blocks: split by <<<ComponentName>>> markers
  const renderContent = () => {
    const parts = content.split(/<<<(\w+)>>>/);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // This is a component name
        const Component = components[part];
        if (Component) {
          return <Component key={i} />;
        }
        return <div key={i} className="text-red-500 text-sm p-4 bg-red-50 rounded">Component not found: {part}</div>;
      }
      // Regular content - render as HTML-like sections
      if (!part.trim()) return null;
      return (
        <div key={i} className="mdx-content mb-8" dangerouslySetInnerHTML={{ __html: parseMarkdown(part) }} />
      );
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation
        title={frontmatter.title.includes(".") ? frontmatter.title : `${frontmatter.title.split(" ")[0]}.Lab`}
        subtitle={`Lezione interattiva`}
        sections={frontmatter.navSections || []}
        accentColor={theme.accent}
        bgColor={theme.bg}
        borderColor={theme.border}
        hoverColor={theme.hover}
        activeColor={theme.active}
      />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto scroll-smooth">
        {renderContent()}
      </main>
    </div>
  );
}

// Simple markdown-to-HTML parser for static text content
function parseMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-stone-800 mb-3 serif">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-stone-800 mb-4 serif">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-stone-600">• $1</li>')
    .replace(/^(?!<[hlu])((?!<).+)$/gm, '<p class="text-stone-600 leading-relaxed mb-4">$1</p>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="mb-4">$&</ul>');
}
