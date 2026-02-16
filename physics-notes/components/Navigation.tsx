"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavSection {
  id: string;
  label: string;
}

interface NavigationProps {
  title: string;
  subtitle: string;
  sections: NavSection[];
  accentColor?: string;
  bgColor?: string;
  borderColor?: string;
  hoverColor?: string;
  activeColor?: string;
}

export default function Navigation({
  title,
  subtitle,
  sections,
  accentColor = "text-teal-700",
  bgColor = "bg-stone-100",
  borderColor = "border-stone-200",
  hoverColor = "hover:bg-stone-200",
  activeColor = "bg-teal-600",
}: NavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const sectionEls = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionEls.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const [titleMain, titleAccent] = title.includes(".")
    ? [title.split(".")[0], "." + title.split(".")[1]]
    : [title, ""];

  return (
    <nav
      className={`w-full md:w-64 ${bgColor} border-r ${borderColor} md:h-screen md:sticky md:top-0 z-50 flex flex-col flex-shrink-0`}
    >
      <div className={`p-6 border-b ${borderColor}`}>
        <Link href="/" className="block">
          <h1 className={`text-2xl font-bold ${accentColor} serif`}>
            {titleMain}
            {titleAccent && (
              <span className="text-orange-500">{titleAccent}</span>
            )}
          </h1>
        </Link>
        <p className="text-xs text-stone-500 mt-2">{subtitle}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left px-4 py-3 rounded-lg ${hoverColor} transition-colors text-sm ${
              activeSection === section.id
                ? `${activeColor} nav-active`
                : ""
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className={`p-4 border-t ${borderColor}`}>
        <Link
          href="/"
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Torna alla Home
        </Link>
      </div>
    </nav>
  );
}
