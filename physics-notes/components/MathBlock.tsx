"use client";

import { useEffect, useRef } from "react";

interface MathBlockProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export default function MathBlock({
  formula,
  display = false,
  className = "",
}: MathBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise([ref.current]);
    }
  }, [formula]);

  if (display) {
    return (
      <div ref={ref} className={`font-mono text-center ${className}`}>
        {`$$${formula}$$`}
      </div>
    );
  }

  return (
    <span ref={ref} className={className}>
      {`$${formula}$`}
    </span>
  );
}
