"use client";

import { useEffect, useState } from "react";

import SectionHeading from "./SectionHeading";

/**
 * Fechas de inicio de cada sede (hora de Bolivia, UTC-4, sin horario de verano).
 * Si cambia la hora de inicio, ajusta solo el `target`.
 */
const EVENTS = [
  {
    city: "La Paz",
    day: "28",
    hotel: "Hotel Casa Grande",
    target: "2026-07-28T09:00:00-04:00",
  },
  {
    city: "Santa Cruz",
    day: "30",
    hotel: "Hotel Marriott",
    target: "2026-07-30T09:00:00-04:00",
  },
];

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function computeTimeLeft(target: number, now: number): TimeLeft {
  const diff = target - now;
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Una casilla de tiempo (número grande + etiqueta). */
function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-extrabold tabular-nums text-white drop-shadow-[0_0_18px_rgba(61,240,122,0.25)] sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
    </div>
  );
}

/** Tarjeta de cuenta regresiva para una sede. */
function CountdownCard({
  city,
  day,
  hotel,
  timeLeft,
  ready,
}: {
  city: string;
  day: string;
  hotel: string;
  timeLeft: TimeLeft;
  ready: boolean;
}) {
  return (
    <div className="panel flex flex-col items-center gap-5 rounded-[24px] px-6 py-7 text-center shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]">
      {/* Encabezado: ciudad + fecha */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
          {city}
        </span>
        <p className="font-mono text-xs uppercase tracking-wider text-white/50">
          {day} julio · {hotel}
        </p>
      </div>

      {/* Contador */}
      {ready && timeLeft.done ? (
        <p className="py-3 font-display text-xl font-bold text-brand-green">
          ¡El evento ha comenzado!
        </p>
      ) : (
        <div className="flex items-start gap-3 sm:gap-4">
          <Unit value={ready ? String(timeLeft.days) : "--"} label="Días" />
          <span className="pt-1 text-2xl font-light text-white/20">:</span>
          <Unit
            value={ready ? pad(timeLeft.hours) : "--"}
            label="Horas"
          />
          <span className="pt-1 text-2xl font-light text-white/20">:</span>
          <Unit
            value={ready ? pad(timeLeft.minutes) : "--"}
            label="Min"
          />
          <span className="pt-1 text-2xl font-light text-white/20">:</span>
          <Unit
            value={ready ? pad(timeLeft.seconds) : "--"}
            label="Seg"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Cuenta regresiva doble hacia las dos sedes del summit (La Paz y Santa Cruz).
 * Se calcula en el cliente; antes de montar muestra "--" para evitar
 * desajustes de hidratación en el export estático.
 */
export default function CountdownSection() {
  const [now, setNow] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setNow(Date.now());
    setReady(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-black px-4 py-16">
      <SectionHeading
        kicker="Cuenta regresiva"
        subtitle="Dos ciudades, una sola experiencia. Prepárate para el summit."
        className="mx-auto mb-12 max-w-2xl px-5"
      >
        Falta cada vez menos
      </SectionHeading>

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {EVENTS.map((ev) => (
          <CountdownCard
            key={ev.city}
            city={ev.city}
            day={ev.day}
            hotel={ev.hotel}
            ready={ready}
            timeLeft={computeTimeLeft(new Date(ev.target).getTime(), now)}
          />
        ))}
      </div>
    </section>
  );
}
