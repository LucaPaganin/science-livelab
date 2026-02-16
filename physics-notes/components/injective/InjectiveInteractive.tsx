"use client";

interface FunctionCardProps {
  letter: string;
  title: string;
  italianDef: string;
  description: string;
  color: string;
  bgColor: string;
  hoverBorder: string;
  diagram: React.ReactNode;
  footer?: string;
}

function FunctionCard({ letter, title, italianDef, description, color, bgColor, hoverBorder, diagram, footer }: FunctionCardProps) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 ${hoverBorder} transition relative overflow-hidden group`}>
      <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center mb-4 ${color} font-bold`}>{letter}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-xs text-slate-500 mb-4 italic">&quot;{italianDef}&quot;</p>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="h-20 bg-stone-50 rounded border border-stone-100 flex items-center justify-center">
        {diagram}
      </div>
      {footer && <p className="mt-3 text-xs text-amber-600">{footer}</p>}
    </div>
  );
}

export function FunctionDefinitionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FunctionCard
        letter="I"
        title="Injective (1-to-1)"
        italianDef="Ogni elemento del codominio è immagine di al massimo un elemento del dominio."
        description="Fails if two different inputs produce the same output (like a full parabola)."
        color="text-orange-600"
        bgColor="bg-orange-100"
        hoverBorder="hover:border-orange-200"
        footer="Test Retta Orizzontale: interseca 1 sola volta."
        diagram={
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
            </div>
            <span className="text-stone-300 text-lg">→</span>
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="w-3 h-3 rounded-full border border-emerald-400" />
            </div>
          </div>
        }
      />
      <FunctionCard
        letter="S"
        title="Surjective (Onto)"
        italianDef="L'immagine della funzione coincide con il codominio."
        description="Every single point in the target set is 'hit' by the function."
        color="text-blue-600"
        bgColor="bg-blue-100"
        hoverBorder="hover:border-blue-200"
        footer="Condizione necessaria MA NON sufficiente per inversione."
        diagram={
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
            </div>
            <span className="text-stone-300 text-lg">→</span>
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
          </div>
        }
      />
      <FunctionCard
        letter="B"
        title="Bijective"
        italianDef="Invertibile."
        description="Both injective and surjective. Required for a unique inverse function to exist."
        color="text-emerald-600"
        bgColor="bg-emerald-100"
        hoverBorder="hover:border-emerald-200"
        footer="Condizione necessaria e sufficiente per l'inversione."
        diagram={
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
            </div>
            <span className="text-stone-300 text-lg">↔</span>
            <div className="flex flex-col gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
          </div>
        }
      />
    </div>
  );
}
