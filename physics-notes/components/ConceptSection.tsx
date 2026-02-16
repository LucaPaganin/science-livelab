interface ConceptSectionProps {
  id: string;
  number?: string;
  title: string;
  description?: string;
  accentColor?: string;
  children: React.ReactNode;
}

export default function ConceptSection({
  id,
  number,
  title,
  description,
  accentColor = "text-teal-600",
  children,
}: ConceptSectionProps) {
  return (
    <section id={id} className="mb-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-3 flex items-center gap-2">
          {number && (
            <span className={`${accentColor} text-xl`}>{number}</span>
          )}
          {title}
        </h2>
        {description && (
          <p className="text-stone-600 max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
