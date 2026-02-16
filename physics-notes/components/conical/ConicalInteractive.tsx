"use client";

import { useEffect, useRef, useState } from "react";

// ========== Circle Visualizer with k parameter ==========
export function ParametricCircle() {
  const [k, setK] = useState(-5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rSquared = -(k + 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const scale = size / 12; // -6 to 6

    ctx.clearRect(0, 0, size, size);

    // Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let i = -6; i <= 6; i++) {
      const pos = center + i * scale;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(size, pos);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(size, center);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, size);
    ctx.stroke();

    // Circle
    if (rSquared > 0) {
      const r = Math.sqrt(rSquared);
      ctx.beginPath();
      ctx.ellipse(center + 1 * scale, center - (-1) * scale, r * scale, r * scale, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(79, 70, 229, 0.1)";
      ctx.fill();
      ctx.stroke();
    }

    // Center point
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(center + 1 * scale, center + 1 * scale, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "11px Outfit";
    ctx.fillText("C(1, -1)", center + 1 * scale + 8, center + 1 * scale - 8);
  }, [k, rSquared]);

  const statusText = rSquared < 0
    ? { text: "Nessuna Circonferenza Reale", className: "bg-red-100 text-red-700" }
    : rSquared === 0
      ? { text: "Circonferenza Degenere (Punto)", className: "bg-amber-100 text-amber-700" }
      : { text: "Circonferenza Reale", className: "bg-emerald-100 text-emerald-700" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">Laboratorio Grafico</h3>
        <div className="bg-stone-50 p-4 rounded-xl mb-6 border border-stone-200">
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-stone-700">
              Valore di k: <span className="font-mono text-indigo-600 text-lg">{k.toFixed(1)}</span>
            </label>
            <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${statusText.className}`}>
              {statusText.text}
            </span>
          </div>
          <input type="range" min={-10} max={2} step={0.1} value={k}
            onChange={(e) => setK(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          <div className="flex justify-between text-xs text-stone-400 mt-2 font-mono">
            <span>-10</span>
            <span className="text-amber-600 font-bold">-1 (Limite)</span>
            <span>2</span>
          </div>
          <div className="mt-4 text-sm border-t border-stone-200 pt-3">
            <p>Raggio² = <span className="font-mono font-bold">{rSquared.toFixed(2)}</span></p>
            <p className="text-stone-500 text-xs mt-1">Esiste solo se -(k+1) ≥ 0, quindi k ≤ -1.</p>
          </div>
        </div>
        <canvas ref={canvasRef} width={400} height={400} className="w-full rounded-lg border border-stone-200" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
        <AlgebraicSteps />
      </div>
    </div>
  );
}

// ========== Completing the Square Steps ==========
function AlgebraicSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Riordino i termini", content: "(x² - 2x) + (y² + 2y) = -k - 3" },
    { label: "Completamento Quadrato (x)", content: "x² - 2x → agg/tolgo 1 → (x - 1)² - 1" },
    { label: "Completamento Quadrato (y)", content: "y² + 2y → agg/tolgo 1 → (y + 1)² - 1" },
    { label: "Sostituzione", content: "(x - 1)² - 1 + (y + 1)² - 1 = -k - 3" },
    { label: "Forma Finale Standard", content: "(x - 1)² + (y + 1)² = -(k + 1)\nCentro C(1, -1) | Raggio² = -(k+1)" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-indigo-700">Analisi Algebrica</h3>
        <button
          onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length))}
          disabled={currentStep >= steps.length}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${currentStep >= steps.length ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {currentStep >= steps.length ? "Analisi Completa" : "Mostra Passaggio Successivo"}
        </button>
      </div>
      <div className="space-y-4 font-mono text-sm bg-stone-50 p-6 rounded-xl border border-stone-100 overflow-y-auto max-h-[400px]">
        <div className="step-visible p-2 border-l-4 border-indigo-500 bg-white shadow-sm">
          <p className="text-stone-500 text-xs uppercase font-bold mb-1">Equazione Iniziale</p>
          <p>x² + y² - 2x + 2y + k + 3 = 0</p>
        </div>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`p-2 border-l-4 ${i === steps.length - 1 ? "border-amber-500 bg-amber-50" : "border-stone-300"} ${i < currentStep ? "step-visible" : "step-transition hidden"}`}
            style={i < currentStep ? { display: "block" } : undefined}
          >
            <p className={`text-xs uppercase font-bold mb-1 ${i === steps.length - 1 ? "text-amber-700" : "text-stone-500"}`}>
              {step.label}
            </p>
            {step.content.split("\n").map((line, j) => (
              <p key={j} className={i === steps.length - 1 ? "font-bold text-stone-900" : ""}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

// ========== Parabola Inversion Workbench ==========
export function ParabolaInversion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [restricted, setRestricted] = useState(false);
  const [showInverse, setShowInverse] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const scale = size / 12;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let i = -6; i <= 6; i++) {
      const pos = center + i * scale;
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(size, pos); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, center); ctx.lineTo(size, center); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(center, 0); ctx.lineTo(center, size); ctx.stroke();

    // Symmetry line y=x (dashed)
    if (showInverse) {
      ctx.strokeStyle = "#d6d3d1";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(center - 4 * scale, center + 4 * scale);
      ctx.lineTo(center + 6 * scale, center - 6 * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // y = x² parabola
    ctx.strokeStyle = restricted ? "#d97706" : "#dc2626";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const startX = restricted ? 0 : -3;
    let first = true;
    for (let x = startX; x <= 3; x += 0.05) {
      const px = center + x * scale;
      const py = center - x * x * scale;
      if (first) { ctx.moveTo(px, py); first = false; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // y = sqrt(x)
    if (showInverse) {
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      let f2 = true;
      for (let x = 0; x <= 9; x += 0.05) {
        const px = center + x * scale;
        const py = center - Math.sqrt(x) * scale;
        if (f2) { ctx.moveTo(px, py); f2 = false; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Legend
    ctx.font = "12px Outfit";
    ctx.fillStyle = restricted ? "#d97706" : "#dc2626";
    ctx.fillText(restricted ? "y = x² (x ≥ 0)" : "y = x²", 10, 20);
    if (showInverse) {
      ctx.fillStyle = "#10b981";
      ctx.fillText("y = √x", 10, 38);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("y = x (simmetria)", 10, 56);
    }
  }, [restricted, showInverse]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-stone-800">Banco di Lavoro: Invertire la Parabola</h3>
          <p className="text-sm text-stone-500">Visualizza y = x² e la sua inversa.</p>
        </div>
        <div className="flex gap-2 bg-stone-100 p-1 rounded-lg">
          <button
            onClick={() => { setRestricted(!restricted); if (!restricted === false) setShowInverse(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${restricted ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "text-stone-600 hover:bg-white hover:shadow-sm"}`}
          >
            {restricted ? "Ripristina Dominio" : "1. Restringi Dominio (x≥0)"}
          </button>
          <button
            onClick={() => setShowInverse(!showInverse)}
            disabled={!restricted}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!restricted ? "opacity-50 cursor-not-allowed text-stone-600" : showInverse ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-stone-600 hover:bg-white hover:shadow-sm"}`}
          >
            {showInverse ? "Nascondi Inversa" : "2. Mostra Inversa (√x)"}
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <canvas ref={canvasRef} width={400} height={400} className="w-full max-w-[400px] rounded-lg border border-stone-200" />
        <div className="w-full lg:w-1/3 bg-stone-50 p-6 rounded-xl border border-stone-200 text-sm space-y-4">
          {!restricted && (
            <div>
              <h4 className="font-bold text-red-600 mb-2">Problema: Non Iniettiva</h4>
              <p className="text-stone-600">La parabola completa non passa il test della retta orizzontale. Ad esempio, per y=4, abbiamo x=2 e x=-2.</p>
            </div>
          )}
          {restricted && !showInverse && (
            <div>
              <h4 className="font-bold text-amber-600 mb-2">Soluzione: Restrizione</h4>
              <p className="text-stone-600">Consideriamo solo il ramo destro (x ≥ 0). Ora la funzione è biettiva!</p>
            </div>
          )}
          {showInverse && (
            <div>
              <h4 className="font-bold text-emerald-600 mb-2">Risultato: Simmetria</h4>
              <p className="text-stone-600">L&apos;inversa è y = √x. Graficamente, è la riflessione rispetto alla bisettrice y=x.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
