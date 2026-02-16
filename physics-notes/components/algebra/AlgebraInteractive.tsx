"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ========== Plotly Saddle Surface ==========
export function SaddleSurface() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Plotly from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-2.27.0.min.js";
    script.onload = () => {
      if (!containerRef.current) return;
      const P = (window as any).Plotly;
      if (!P) return;

      const size = 25;
      const x = Array.from({ length: size }, (_, i) => (i - size / 2) / 2);
      const y = Array.from({ length: size }, (_, i) => (i - size / 2) / 2);
      const z: number[][] = [];
      for (let j = 0; j < size; j++) {
        const row: number[] = [];
        for (let i = 0; i < size; i++) { row.push(x[i] ** 2 - y[j] ** 2); }
        z.push(row);
      }
      P.newPlot(containerRef.current, [{
        z, x, y, type: "surface", colorscale: "Teal", showscale: false,
        contours: { z: { show: true, usecolormap: true, highlightcolor: "#0d9488", project: { z: true } } },
        opacity: 0.9,
      }], {
        title: { text: "z = x² - y²", font: { family: "Lora", size: 14, color: "#44403c" } },
        autosize: true, margin: { l: 0, r: 0, b: 0, t: 30 },
        scene: { camera: { eye: { x: 1.4, y: 1.4, z: 0.8 } }, xaxis: { title: "a" }, yaxis: { title: "b" }, zaxis: { title: "Res" } },
        paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      }, { responsive: true, displayModeBar: false });
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-stone-100">
      <div className="chart-container" ref={containerRef} />
      <div className="mt-2 text-center text-xs text-stone-400">Interattivo: Ruota e zooma per vedere la &quot;sella&quot;</div>
    </div>
  );
}

// ========== Formula Cards ==========
export function FormulaCards() {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const highlight = (type: string) => {
    setHighlighted(null);
    setTimeout(() => setHighlighted(type), 10);
  };

  return (
    <div className="space-y-6">
      <div
        className={`glass-card p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group ${highlighted === "diff" ? "highlight-flash" : ""}`}
        onClick={() => highlight("diff")}
      >
        <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-teal-600 transition-colors">Differenza di Quadrati</h3>
        <div className="font-mono bg-stone-50 p-3 rounded text-center text-lg text-teal-800 mb-2">
          $$(a + b)(a - b) = a^2 - b^2$$
        </div>
        <p className="text-sm text-stone-500">
          Moltiplicare la somma di due termini per la loro differenza elimina il termine medio ($ab - ab = 0$), lasciando solo la differenza dei quadrati.
        </p>
      </div>

      <div
        className={`glass-card p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group ${highlighted === "quad" ? "highlight-flash" : ""}`}
        onClick={() => highlight("quad")}
      >
        <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-orange-500 transition-colors">Quadrato di Binomio</h3>
        <div className="font-mono bg-stone-50 p-3 rounded text-center text-lg text-orange-800 mb-2">
          $$(a \pm b)^2 = a^2 \pm 2ab + b^2$$
        </div>
        <p className="text-sm text-stone-500">
          Attenzione al termine centrale (il doppio prodotto). Dimenticarlo è l&apos;errore più comune!
          $(2x - 1)^2 \rightarrow 4x^2 - 4x + 1$.
        </p>
      </div>

      <div className="bg-stone-800 text-white p-6 rounded-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">Esponenti Negativi</h3>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-mono">$x^{"{-n}"}$</span>
          <span className="text-2xl">=</span>
          <span className="text-2xl font-mono">$\frac{"{1}"}{"{x^n}"}$</span>
        </div>
        <p className="text-xs text-stone-400 mt-4">
          Un esponente negativo &quot;ribalta&quot; la frazione. Esempio: $2^{"{-1}"} = 1/2$.
        </p>
      </div>
    </div>
  );
}

// ========== Decimals Chart ==========
export function DecimalsConverter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<{ label: string; fraction: string; rule: string; color: string } | null>(null);

  const chartData = [
    { label: "0,5", fraction: "1/2", rule: "Finito: 5/10", color: "#0d9488" },
    { label: "0,25", fraction: "1/4", rule: "Finito: 25/100", color: "#14b8a6" },
    { label: "0,33...", fraction: "1/3", rule: "Periodico: 3/9", color: "#f97316" },
    { label: "1,5", fraction: "3/2", rule: "Finito: 15/10", color: "#5eead4" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => {
      if (!canvasRef.current) return;
      const Chart = (window as any).Chart;
      if (!Chart) return;

      new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: chartData.map((d) => d.label),
          datasets: [{ data: [25, 25, 25, 25], backgroundColor: chartData.map((d) => d.color), borderWidth: 0, hoverOffset: 15 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          onClick: (_e: any, activeElements: any[]) => {
            if (activeElements.length > 0) {
              setSelected(chartData[activeElements[0].index]);
            }
          },
        },
      });
    };
    if ((window as any).Chart) {
      script.onload(new Event("load"));
    } else {
      document.head.appendChild(script);
    }
    return () => { script.remove(); };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 col-span-1">
        <div className="chart-container relative flex justify-center items-center">
          <canvas ref={canvasRef} style={{ cursor: "pointer" }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-stone-400 text-xs font-mono bg-white/80 p-1 rounded">Clicca<br />i segmenti</span>
          </div>
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-xl shadow-sm border-l-4 border-orange-400 min-h-[300px] flex flex-col justify-center"
        style={selected ? { borderColor: selected.color } : undefined}>
        {!selected ? (
          <>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Seleziona un valore</h3>
            <p className="text-stone-500">Clicca sul grafico a sinistra per esplorare le regole di conversione da decimale a frazione.</p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Conversione: {selected.label}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-stone-50 p-4 rounded text-center">
                <span className="block text-xs text-stone-400 uppercase">Decimale</span>
                <span className="text-2xl font-mono font-bold text-stone-700">{selected.label}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded text-center">
                <span className="block text-xs text-stone-400 uppercase">Frazione</span>
                <span className="text-2xl font-mono font-bold text-teal-600">{selected.fraction}</span>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded border border-orange-100 text-sm text-orange-800">
              <strong>Regola:</strong> {selected.rule}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ========== Equation Simulator ==========
export function EquationSimulator() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(4);

  const getResult = useCallback(() => {
    if (a !== 0) {
      return {
        title: "Determinata",
        desc: "L’equazione ha una soluzione unica.",
        result: `x = ${b} / ${a} = ${(b / a).toFixed(2).replace(/[.,]00$/, "")}`,
        icon: "✓",
        titleClass: "text-2xl font-bold text-teal-800 mb-2",
        bgClass: "bg-teal-50",
      };
    } else if (a === 0 && b !== 0) {
      return {
        title: "Impossibile",
        desc: "Nessun numero moltiplicato per 0 può dare un risultato diverso da 0.",
        result: "∄ x",
        icon: "⚠",
        titleClass: "text-2xl font-bold text-orange-600 mb-2",
        bgClass: "bg-orange-50",
      };
    } else {
      return {
        title: "Indeterminata",
        desc: "L’equazione è vera per qualsiasi valore di x (Identità).",
        result: "∀ x ∈ R",
        icon: "∞",
        titleClass: "text-2xl font-bold text-stone-600 mb-2",
        bgClass: "bg-stone-100",
      };
    }
  }, [a, b]);

  const res = getResult();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 bg-stone-50 border-r border-stone-200">
          <h3 className="font-bold text-stone-700 mb-6">Simulatore ax = b</h3>
          <div className="flex items-center gap-4 mb-8 text-3xl font-mono justify-center">
            <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-20 p-2 text-center border-b-2 border-teal-500 bg-transparent focus:outline-none" />
            <span>x</span>
            <span>=</span>
            <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-20 p-2 text-center border-b-2 border-orange-500 bg-transparent focus:outline-none" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500">Coefficiente (a)</span>
              <span className="font-mono">{a}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-500">Termine Noto (b)</span>
              <span className="font-mono">{b}</span>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className={`absolute inset-0 ${res.bgClass} transition-colors duration-500`} />
          <div className="relative z-10">
            <div className="text-4xl mb-4">{res.icon}</div>
            <h3 className={res.titleClass}>{res.title}</h3>
            <p className="text-stone-600 max-w-xs mx-auto">{res.desc}</p>
            <div className="mt-4 inline-block bg-white px-4 py-2 rounded shadow-sm font-mono text-teal-600 font-bold">
              {res.result}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-stone-800 text-stone-300 p-6 text-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <strong className="text-white block mb-1">1° Principio (Trasporto)</strong>
          Puoi spostare un termine da una parte all&apos;altra dell&apos;uguale cambiandone il segno.
          $x + 3 = 0 
ightarrow x = -3$
        </div>
        <div>
          <strong className="text-white block mb-1">2° Principio (Divisione/Moltiplicazione)</strong>
          Puoi moltiplicare o dividere entrambi i membri per lo stesso numero diverso da zero.
          Fondamentale per eliminare i denominatori (m.c.m.).
        </div>
      </div>
    </div>
  );
}

// ========== Resolution Process ==========
export function ResolutionProcess() {
  const steps = [
    { num: 1, title: "Preparazione", desc: "Svolgi le potenze (..)² e trasforma i numeri decimali in frazioni. Non toccare ancora la x.", color: "bg-teal-600" },
    { num: 2, title: "Espansione (Parentesi)", desc: "Applica la proprietà distributiva o i prodotti notevoli per eliminare le parentesi tonde.", color: "bg-stone-600" },
    { num: 3, title: "Linearizzazione (m.c.m.)", desc: "Calcola il m.c.m. di tutti i denominatori (sx e dx) ed eliminali (2° Principio). Ora l’equazione è intera.", color: "bg-orange-500" },
    { num: 4, title: "Isolamento & Somma", desc: "Porta le x a sinistra, i numeri a destra (cambia segno!). Somma i termini simili.", color: "bg-stone-600" },
    { num: 5, title: "Soluzione Finale", desc: "Dividi per il coefficiente della x. Verifica se il risultato è accettabile.", color: "bg-teal-600" },
  ];

  return (
    <section className="mb-24 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-stone-800 mb-3 serif">Il Protocollo di Risoluzione</h2>
        <p className="text-stone-600">Segui sempre questo ordine per evitare errori di calcolo.</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-stone-200" />
        {steps.map((step) => (
          <div key={step.num} className={`relative z-10 ${step.num < 5 ? "mb-12" : ""} flex flex-col items-center`}>
            <div className={`${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg mb-4 ring-4 ring-stone-50`}>
              {step.num}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 max-w-md w-full text-center hover:shadow-md transition-shadow">
              <h4 className="font-bold text-stone-800 mb-2">{step.title}</h4>
              <p className="text-sm text-stone-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
