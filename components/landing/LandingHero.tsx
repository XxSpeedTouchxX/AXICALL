"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { PhoneMockupDemo } from "@/components/home/PhoneMockupDemo";

const STATS = [
  { value: "24h", label: "Délai de rappel" },
  { value: "0€", label: "RDV facturé" },
  { value: "100%", label: "Conforme démarchage 2026" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] px-4 pb-28 pt-20 text-[var(--bone)]">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[18%] h-[80%] w-[75%]"
        style={{ background: "radial-gradient(circle, rgba(255,74,28,0.22) 0%, transparent 58%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,241,234,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.05fr_0.95fr]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.h1
            variants={item}
            className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[56px]"
          >
            Vendez votre voiture au <span className="italic font-normal text-[var(--accent)]">juste prix.</span>
            <br />
            Sans rien gérer.
          </motion.h1>
          <motion.p variants={item} className="mb-8 max-w-md text-lg text-[var(--bone)]/75">
            <strong className="font-bold text-[var(--accent)]">Estimation en 30 secondes, rappel sous 24h</strong> — une
            agence évalue votre véhicule au prix réel du marché et gère acheteurs, appels et négociation à
            votre place.
          </motion.p>
          <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-4">
            <Link href="/estimation">
              <Button>Estimer ma voiture →</Button>
            </Link>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--bone)]/45">
              30 secondes · Sans engagement
            </span>
          </motion.div>
          <motion.div variants={item} className="mb-6 flex flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <b className="block text-2xl font-bold tracking-tight text-[var(--accent)]">{s.value}</b>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone)]/50">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div variants={item}>
            <Link href="/mentions-legales" className="font-mono text-[10.5px] text-[var(--bone)]/45 underline">
              Voir nos mentions légales et conditions →
            </Link>
          </motion.div>
        </div>
        <motion.div variants={item}>
          <PhoneMockupDemo />
        </motion.div>
      </motion.div>
    </section>
  );
}
