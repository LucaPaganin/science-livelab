"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ========== Ellipse Visualizer ==========
export function EllipseVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [semiMajor, setSemiMajor] = useState(150);
  const [semiMinor, setSemiMinor] = useState(100);

  const c = Math.sqrt(Math.abs(semiMajor * semiMajor - semiMinor * semiMinor));
  const e = c / semiMajor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const a = semiMajor;
    const b = semiMinor;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const fc = Math.sqrt(Math.abs(a * a - b * b));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ellipse
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, a, b, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Axes (dashed)
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - a - 10, centerY);
    ctx.lineTo(centerX + a + 10, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - b - 10);
    ctx.lineTo(centerX, centerY + b + 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Foci
    if (a > b) {
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(centerX - fc, centerY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(centerX + fc, centerY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.font = "12px Outfit";
      ctx.fillText("Sole", centerX - fc - 10, centerY - 10);
    } else {
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(centerX, centerY - fc, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(centerX, centerY + fc, 6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [semiMajor, semiMinor]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-bold text-stone-800 mb-4">Visualizzatore di Ellisse</h3>
      <div className="mb-4">
        <canvas ref={canvasRef} width={500} height={300} className="w-full border border-stone-200 rounded-lg bg-slate-900" />
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-stone-600 mb-1 block">Semiasse Maggiore (a)</label>
          <input type="range" min={50} max={200} step={0.1} value={semiMajor}
            onChange={(e) => setSemiMajor(parseFloat(e.target.value))} className="w-full" />
          <div className="text-xs text-stone-500 text-right">{semiMajor.toFixed(1)}</div>
        </div>
        <div>
          <label className="text-sm text-stone-600 mb-1 block">Semiasse Minore (b)</label>
          <input type="range" min={30} max={200} step={0.1} value={semiMinor}
            onChange={(e) => setSemiMinor(parseFloat(e.target.value))} className="w-full" />
          <div className="text-xs text-stone-500 text-right">{semiMinor.toFixed(1)}</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-stone-600 text-sm">Distanza Fuochi (c):</span>
          <span className="font-mono font-bold">{c.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-stone-600 text-sm">Eccentricità (e):</span>
          <span className="font-mono font-bold">{e.toFixed(3)}</span>
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-xs text-stone-600 mb-1">Equazione dell&apos;Ellisse:</div>
        <div className="font-mono text-center text-sm">$$\frac{"{x^2}"}{"{a^2}"} + \frac{"{y^2}"}{"{b^2}"} = 1$$</div>
      </div>
    </div>
  );
}

// ========== Kepler 3rd Law Calculator ==========
export function KeplerCalculator() {
  const [a, setA] = useState(1);
  const T = Math.pow(a, 1.5);
  const days = T * 365.25;

  const planets = [
    { name: "☿ Mercurio", a: 0.39, T: 0.24 },
    { name: "♀ Venere", a: 0.72, T: 0.62 },
    { name: "🌍 Terra", a: 1.0, T: 1.0 },
    { name: "♂ Marte", a: 1.52, T: 1.88 },
    { name: "♃ Giove", a: 5.2, T: 11.86 },
    { name: "♄ Saturno", a: 9.54, T: 29.46 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-stone-800 mb-4">Calcolatore della Terza Legge</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Semiasse Maggiore (in UA*)</label>
            <input type="number" value={a} step={0.1} onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
            <div className="text-xs text-stone-400 mt-1">* 1 UA = 149.6 milioni di km (distanza Terra-Sole)</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <div className="text-sm text-stone-600 mb-2">Formula:</div>
          <div className="font-mono text-center text-sm mb-3">$$T^2 = k \cdot a^3$$</div>
          <div className="text-xs text-stone-500 text-center">Per a in UA e T in anni terrestri: k = 1</div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-stone-600 mb-2">Risultato:</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-stone-700">Periodo orbitale:</span>
              <span className="font-mono font-bold text-xl text-blue-600">{T.toFixed(2)} anni</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-600">In giorni:</span>
              <span className="font-mono">{days.toFixed(0)} giorni</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Dati Planetari del Sistema Solare</h3>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-2 p-2 bg-stone-100 rounded font-semibold">
              <span>Pianeta</span>
              <span className="text-right">a (UA)</span>
              <span className="text-right">T (anni)</span>
            </div>
            {planets.map((p) => (
              <div key={p.name} className={`grid grid-cols-3 gap-2 p-2 hover:bg-stone-50 rounded ${p.name.includes("Terra") ? "bg-blue-50" : ""}`}>
                <span>{p.name}</span>
                <span className="text-right font-mono">{p.a.toFixed(2).replace(".", ",")}</span>
                <span className="text-right font-mono">{p.T.toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <div className="text-sm font-semibold text-indigo-900 mb-2">📊 Verifica</div>
          <div className="text-sm text-indigo-800">
            Prova con Marte: a = 1,52 UA → T² = 1,52³ = 3,51 → T = √3,51 ≈ 1,87 anni.
            Vicinissimo al valore reale di 1,88 anni!
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== Pyramids Calculator ==========
export function PyramidsCalculator() {
  const [mass1, setMass1] = useState(5750000000);
  const [mass2, setMass2] = useState(4880000000);
  const [distance, setDistance] = useState(512);

  const G = 6.67e-11;
  const F = G * mass1 * mass2 / (distance * distance);
  const equivalentMass = F / 9.81;

  const toScientific = (v: number) => {
    if (!v || isNaN(v)) return "";
    const exp = Math.floor(Math.log10(Math.abs(v)));
    const mantissa = v / Math.pow(10, exp);
    return `≈ ${mantissa.toFixed(2)} × 10^${exp} kg`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-stone-800 mb-4">Calcolatore Interattivo</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Massa Piramide di Cheope (kg)</label>
            <input type="number" value={mass1} onChange={(e) => setMass1(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
            <div className="text-xs text-stone-400 mt-1">{toScientific(mass1)}</div>
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Massa Piramide di Chefren (kg)</label>
            <input type="number" value={mass2} onChange={(e) => setMass2(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
            <div className="text-xs text-stone-400 mt-1">{toScientific(mass2)}</div>
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Distanza (m)</label>
            <input type="number" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
            <div className="text-xs text-stone-400 mt-1">Distanza tra i centri delle piramidi</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-stone-600 mb-2">Formula:</div>
          <div className="font-mono text-center text-sm">{`$$F = 6{,}67 \\times 10^{-11} \\frac{m_1 \\cdot m_2}{r^2}$$`}</div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Risultato</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-center">
              <div className="text-sm opacity-90 mb-1">Forza Gravitazionale</div>
              <div className="text-3xl font-bold">{F.toFixed(3)} N</div>
            </div>
            <div className="h-px bg-stone-200" />
            <div className="flex justify-between items-center">
              <span className="text-stone-600 text-xs">Equivale al peso di circa:</span>
              <span className="font-mono font-bold text-lg">{equivalentMass.toFixed(0)} kg</span>
            </div>
            <div className="text-xs text-stone-500">sulla Terra.</div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <div className="text-sm font-semibold text-yellow-900 mb-2">💡 Osservazione</div>
          <div className="text-sm text-yellow-800">
            Nonostante le enormi masse in gioco (miliardi di kg!), la forza gravitazionale
            è estremamente debole. Questo dimostra quanto sia debole la gravità rispetto alle altre forze fondamentali.
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <div className="text-sm font-semibold text-purple-900 mb-2">🏛️ Curiosità</div>
          <div className="text-sm text-purple-800">
            Le piramidi di Giza sono tra le strutture più massicce costruite dall&apos;uomo.
            La Piramide di Cheope, alta 146 metri, è stata la struttura più alta del mondo per 3.800 anni!
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== Areas Animation ==========
export function AreasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aVal, setAVal] = useState(320);
  const [bVal, setBVal] = useState(280);
  const [isAnimating, setIsAnimating] = useState(false);
  const animRef = useRef<number>(0);
  const angleRef = useRef(0);

  const c = Math.sqrt(Math.abs(aVal * aVal - bVal * bVal));
  const ecc = c / aVal;

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const fc = Math.sqrt(Math.abs(aVal * aVal - bVal * bVal));
    const focusX = centerX - fc;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ellipse
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, aVal, bVal, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sun
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(focusX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#f59e0b";
    ctx.fill();
    ctx.shadowBlur = 0;

    // Sector 1 near perihelion
    ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
    ctx.beginPath();
    ctx.moveTo(focusX, centerY);
    for (let i = 0; i <= 30; i++) {
      const t = 0.4 * (i / 30);
      ctx.lineTo(centerX + aVal * Math.cos(t), centerY + bVal * Math.sin(t));
    }
    ctx.closePath();
    ctx.fill();

    // Sector 2 near aphelion
    ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
    ctx.beginPath();
    ctx.moveTo(focusX, centerY);
    for (let i = 0; i <= 30; i++) {
      const t = Math.PI - 0.8 + 0.8 * (i / 30);
      ctx.lineTo(centerX + aVal * Math.cos(t), centerY + bVal * Math.sin(t));
    }
    ctx.closePath();
    ctx.fill();

    // Labels
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 14px Outfit";
    ctx.fillText("Perielio", centerX + 110, centerY - 50);
    ctx.font = "12px Outfit";
    ctx.fillText("(veloce, area piccola)", centerX + 110, centerY - 35);
    ctx.font = "bold 14px Outfit";
    ctx.fillText("Afelio", centerX - 180, centerY - 50);
    ctx.font = "12px Outfit";
    ctx.fillText("(lento, area grande)", centerX - 180, centerY - 35);
  }, [aVal, bVal]);

  useEffect(() => {
    if (!isAnimating) {
      drawStatic();
    }
  }, [aVal, bVal, isAnimating, drawStatic]);

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fc = Math.sqrt(Math.abs(aVal * aVal - bVal * bVal));
      const focusX = centerX - fc;

      const planetX = centerX + aVal * Math.cos(angleRef.current);
      const planetY = centerY + bVal * Math.sin(angleRef.current);
      const r = Math.sqrt((planetX - focusX) ** 2 + (planetY - centerY) ** 2);
      const avgRadius = (aVal + bVal) / 2;
      const speed = 0.008 * (avgRadius / r);

      angleRef.current += speed;
      if (angleRef.current >= 2 * Math.PI) angleRef.current = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ellipse
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, aVal, bVal, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sun
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(focusX, centerY, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#f59e0b";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Swept area
      ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
      ctx.beginPath();
      ctx.moveTo(focusX, centerY);
      for (let i = 0; i <= 50; i++) {
        const t = angleRef.current * (i / 50);
        ctx.lineTo(centerX + aVal * Math.cos(t), centerY + bVal * Math.sin(t));
      }
      ctx.closePath();
      ctx.fill();

      // Radius vector
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(focusX, centerY);
      ctx.lineTo(planetX, planetY);
      ctx.stroke();

      // Planet
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(planetX, planetY, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Velocity vector
      const dx = -aVal * Math.sin(angleRef.current);
      const dy = bVal * Math.cos(angleRef.current);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(planetX, planetY);
      ctx.lineTo(planetX + dx * 0.3, planetY + dy * 0.3);
      ctx.stroke();

      animRef.current = requestAnimationFrame(animate);
    };

    angleRef.current = 0;
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, [isAnimating, aVal, bVal]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="font-bold text-stone-800 mb-4">Visualizzazione delle Aree</h3>
      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} width={800} height={500} className="border border-stone-200 rounded-lg bg-slate-900" style={{ maxWidth: "100%" }} />
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Semiasse Maggiore (a)</label>
            <input type="range" min={100} max={350} step={0.1} value={aVal} onChange={(e) => setAVal(parseFloat(e.target.value))} className="w-full" />
            <div className="text-xs text-stone-500 text-right">{aVal.toFixed(1)}</div>
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Semiasse Minore (b)</label>
            <input type="range" min={80} max={350} step={0.1} value={bVal} onChange={(e) => setBVal(parseFloat(e.target.value))} className="w-full" />
            <div className="text-xs text-stone-500 text-right">{bVal.toFixed(1)}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-8 py-3 text-white rounded-lg transition-colors font-semibold ${isAnimating ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isAnimating ? "Ferma Animazione" : "Avvia Animazione"}
          </button>
          <div className="text-sm text-stone-600">
            Eccentricità: <span className="font-mono font-bold text-blue-600">{ecc.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
