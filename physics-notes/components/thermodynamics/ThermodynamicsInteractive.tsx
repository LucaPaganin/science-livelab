"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ========== Temperature Simulator ==========
export function TemperatureSimulator() {
  const [temp, setTemp] = useState(20);

  const getState = useCallback(() => {
    if (temp < 0) return { className: "temp-gradient-cold", state: "Sotto lo zero - Acqua ghiacciata", props: ["Acqua: Solida (ghiaccio)", "Aria: Molto fredda", "Rischio di congelamento"] };
    if (temp < 20) return { className: "bg-blue-100", state: "Temperatura fresca", props: ["Acqua: Liquida", "Aria: Fresca", "Abbigliamento consigliato: Leggero"] };
    if (temp < 40) return { className: "bg-green-100", state: "Temperatura ambiente/gradevole", props: ["Acqua: Liquida", "Stato confortevole per l'uomo", "Temperatura ideale per attività"] };
    if (temp < 80) return { className: "temp-gradient-warm", state: "Temperatura calda", props: ["Acqua: Liquida", "Aria: Calda", "Attenzione all'idratazione"] };
    if (temp < 100) return { className: "temp-gradient-hot", state: "Temperatura molto calda", props: ["Acqua: Liquida (vicina all'ebollizione)", "Temperatura pericolosa per l'uomo", "Rischio di ustioni"] };
    return { className: "bg-red-200", state: "Ebollizione!", props: ["Acqua: Vapore", "Cambio di stato in corso", "Temperatura estremamente pericolosa"] };
  }, [temp]);

  const s = getState();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-stone-800 mb-4">Simulatore di Temperatura</h3>
      <div className="mb-6">
        <input type="range" min={-50} max={150} value={temp} onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full" style={{ background: "linear-gradient(to right, #dbeafe, #fca5a5)" }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-xl text-center transition-all duration-300 ${s.className}`}>
          <div className="text-4xl font-bold mb-2">{temp}°C</div>
          <div className="text-sm text-stone-600">{s.state}</div>
        </div>
        <div className="md:col-span-2 bg-stone-50 p-4 rounded-xl">
          <div className="text-sm text-stone-700 mb-2 font-semibold">Proprietà:</div>
          <ul className="text-sm text-stone-600 space-y-1">
            {s.props.map((p, i) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ========== Exercise 1: Water Heating ==========
export function WaterHeatingCalc() {
  const [mass, setMass] = useState(200);
  const [tempStart, setTempStart] = useState(20);
  const [tempEnd, setTempEnd] = useState(100);

  const deltaT = tempEnd - tempStart;
  const C_water = 4.186;
  const Q_cal = mass * 1 * deltaT;
  const Q_kcal = Q_cal / 1000;
  const Q_J = mass * C_water * deltaT;
  const Q_kJ = Q_J / 1000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-stone-800 mb-4">Calcolatore Interattivo</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Massa (g)</label>
            <input type="number" value={mass} onChange={(e) => setMass(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Temperatura iniziale (°C)</label>
            <input type="number" value={tempStart} onChange={(e) => setTempStart(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Temperatura finale (°C)</label>
            <input type="number" value={tempEnd} onChange={(e) => setTempEnd(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
        </div>
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <div className="text-sm text-stone-600 mb-2">Formula:</div>
          <div className="font-mono text-center text-sm mb-3">$$Q = C \times m \times \Delta T$$</div>
          <div className="text-xs text-stone-500">Dove C<sub>acqua</sub> = 4,186 J/(g·°C) = 1 cal/(g·°C)</div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Risultato</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-stone-600">ΔT:</span>
              <span className="font-mono font-bold text-lg">{deltaT.toFixed(0)}°C</span>
            </div>
            <div className="h-px bg-stone-200" />
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Q (calorie):</span>
              <span className="font-mono font-bold text-xl text-red-600">{Q_cal.toLocaleString("it-IT")} cal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Q (kcal):</span>
              <span className="font-mono font-bold text-lg">{Q_kcal.toFixed(0)} kcal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Q (Joule):</span>
              <span className="font-mono font-bold text-lg">{Q_J.toLocaleString("it-IT", { maximumFractionDigits: 0 })} J</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Q (kJ):</span>
              <span className="font-mono font-bold text-lg">{Q_kJ.toFixed(2)} kJ</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <div className="text-sm font-semibold text-blue-900 mb-2">💡 Nota</div>
          <div className="text-sm text-blue-800">
            L&apos;acqua ha un calore specifico molto alto, il che significa che può assorbire molta energia termica
            prima di aumentare significativamente la temperatura.
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== Exercise 2: Iron Fusion ==========
export function IronFusionCalc() {
  const [mass, setMass] = useState(4);
  const [tempStart, setTempStart] = useState(377);
  const [energyAvailable, setEnergyAvailable] = useState(4000);

  const tempFusion = 1535;
  const C_iron = 450;
  const latentHeat = 33;
  const deltaT = tempFusion - tempStart;
  const Q_heating = (C_iron * mass * deltaT) / 1000;
  const Q_fusion = latentHeat * mass;
  const Q_total = Q_heating + Q_fusion;
  const sufficient = energyAvailable >= Q_total;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-stone-800 mb-4">Calcolatore Interattivo</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Massa (kg)</label>
            <input type="number" value={mass} onChange={(e) => setMass(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Temperatura iniziale (°C)</label>
            <input type="number" value={tempStart} onChange={(e) => setTempStart(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-stone-600 mb-1 block">Energia disponibile (kJ)</label>
            <input type="number" value={energyAvailable} onChange={(e) => setEnergyAvailable(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg" />
          </div>
        </div>
        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <div className="text-sm text-stone-600 mb-2">Dati:</div>
          <ul className="text-xs text-stone-600 space-y-1">
            <li>• C<sub>ferro</sub> = 450 J/(kg·°C)</li>
            <li>• T<sub>fusione</sub> = 1535°C</li>
            <li>• Calore latente = 33 kJ/kg</li>
          </ul>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Fase 1: Riscaldamento</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-stone-600 text-sm">ΔT:</span>
              <span className="font-mono">{deltaT}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600 text-sm">Q<sub>riscaldamento</sub>:</span>
              <span className="font-mono font-bold text-orange-600">{Q_heating.toFixed(0)} kJ</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Fase 2: Fusione</h3>
          <div className="flex justify-between items-center">
            <span className="text-stone-600 text-sm">Q<sub>fusione</sub>:</span>
            <span className="font-mono font-bold text-red-600">{Q_fusion.toFixed(0)} kJ</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-stone-800 mb-4">Totale</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Q<sub>totale</sub>:</span>
              <span className="font-mono font-bold text-xl text-red-600">{Q_total.toFixed(0)} kJ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600">Energia disponibile:</span>
              <span className="font-mono font-bold text-lg">{energyAvailable.toLocaleString("it-IT")} kJ</span>
            </div>
            <div className="h-px bg-stone-200" />
            <div className={`p-3 rounded-lg text-center font-semibold ${sufficient ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {sufficient
                ? `✓ SUFFICIENTE - Energia in eccesso: ${(energyAvailable - Q_total).toFixed(0)} kJ`
                : `✗ INSUFFICIENTE - Mancano ${(Q_total - energyAvailable).toFixed(0)} kJ`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== Exercise 3: Ice to Water ==========
export function IceToWaterCalc() {
  const mass = 0.55;
  const C_ice = 2090;
  const deltaT1 = 20;
  const Q1 = (C_ice * mass * deltaT1) / 1000;
  const latentHeatFusion = 334;
  const Q2 = latentHeatFusion * mass;
  const C_water = 4186;
  const deltaT3 = 20;
  const Q3 = (C_water * mass * deltaT3) / 1000;
  const Q_total = Q1 + Q2 + Q3;

  const phases = [
    { icon: "🧊", title: "Fase 1", subtitle: "Riscaldamento Ghiaccio", range: "-20°C → 0°C", borderColor: "border-blue-400", bgColor: "bg-blue-50",
      details: [{ label: "C(ghiaccio)", value: "2.090 J/(kg·°C)" }, { label: "ΔT", value: "20°C" }],
      result: { label: "Q₁", value: `${Q1.toFixed(2)} kJ`, color: "text-blue-600" } },
    { icon: "💎", title: "Fase 2", subtitle: "Fusione", range: "0°C (solido → liquido)", borderColor: "border-purple-400", bgColor: "bg-purple-50",
      details: [{ label: "Calore latente", value: "334 kJ/kg" }, { label: "Massa", value: "0,55 kg" }],
      result: { label: "Q₂", value: `${Q2.toFixed(2)} kJ`, color: "text-purple-600" } },
    { icon: "💧", title: "Fase 3", subtitle: "Riscaldamento Acqua", range: "0°C → 20°C", borderColor: "border-red-400", bgColor: "bg-red-50",
      details: [{ label: "C(acqua)", value: "4.186 J/(kg·°C)" }, { label: "ΔT", value: "20°C" }],
      result: { label: "Q₃", value: `${Q3.toFixed(2)} kJ`, color: "text-red-600" } },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {phases.map((phase) => (
          <div key={phase.title} className={`bg-white rounded-xl shadow-sm p-6 border-t-4 ${phase.borderColor}`}>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{phase.icon}</div>
              <h3 className="font-bold text-stone-800">{phase.title}</h3>
              <div className="text-sm text-stone-600">{phase.subtitle}</div>
            </div>
            <div className={`${phase.bgColor} p-3 rounded-lg mb-3`}>
              <div className="text-center font-mono text-sm">{phase.range}</div>
            </div>
            <div className="space-y-2 text-sm">
              {phase.details.map((d) => (
                <div key={d.label} className="flex justify-between">
                  <span className="text-stone-600">{d.label}:</span>
                  <span className="font-mono">{d.value}</span>
                </div>
              ))}
              <div className="h-px bg-stone-200" />
              <div className="flex justify-between font-semibold">
                <span className={phase.result.color}>{phase.result.label}:</span>
                <span className={`font-mono ${phase.result.color}`}>{phase.result.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-red-500 rounded-xl shadow-lg p-8 text-white text-center">
        <div className="text-sm font-semibold mb-2 opacity-90">ENERGIA TOTALE RICHIESTA</div>
        <div className="text-5xl font-bold mb-2">{Q_total.toFixed(2)} kJ</div>
        <div className="text-sm opacity-90">Q<sub>tot</sub> = Q₁ + Q₂ + Q₃</div>
      </div>
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <div className="text-sm font-semibold text-yellow-900 mb-2">⚡ Osservazione Importante</div>
        <div className="text-sm text-yellow-800">
          Nota come la <strong>Fase 2 (fusione)</strong> richiede più energia ({Q2.toFixed(1)} kJ) rispetto alla somma
          delle altre due fasi ({(Q1 + Q3).toFixed(0)} kJ totali). Questo dimostra che i cambiamenti di stato richiedono molta più
          energia rispetto alle variazioni di temperatura!
        </div>
      </div>
    </>
  );
}
