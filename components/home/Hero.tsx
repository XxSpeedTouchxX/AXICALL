"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "./HeroVideo";

const TRUST_CHIPS = ["Estimation gratuite", "Sans engagement", "Réponse sous 24h"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] px-4 pb-28 pt-20 text-[var(--bone)]">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[18%] h-[80%] w-[75%]"
        style={{
          background: "radial-gradient(circle, rgba(255,74,28,0.22) 0%, transparent 58%)",
        }}
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
        className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.p variants={item} className="eyebrow mb-4">
            — Estimation véhicule
          </motion.p>
          <motion.h1
            variants={item}
            className="mb-4 text-4xl font-bold leading-[0.98] tracking-tight md:text-5xl lg:text-6xl"
          >
            Obtenez une estimation <span className="text-[var(--accent)]">gratuite</span> de votre
            véhicule en quelques minutes
          </motion.h1>
          <motion.p variants={item} className="mb-8 max-w-md text-lg text-[var(--bone)]/70">
            Recevez une estimation personnalisée et découvrez combien vaut réellement votre
            voiture.
          </motion.p>
          <motion.div variants={item} className="mb-6 flex flex-wrap gap-4">
            <Link href="/estimation">
              <Button>Estimer mon véhicule</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline-inverse">Être rappelé</Button>
            </Link>
          </motion.div>
          <motion.ul variants={item} className="flex flex-wrap gap-x-5 gap-y-2">
            {TRUST_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5 text-sm text-[var(--bone)]/60">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div
          variants={item}
          className="relative aspect-video overflow-hidden bg-black shadow-2xl ring-1 ring-[var(--bone)]/10"
        >
          <HeroVideo />
        </motion.div>
      </motion.div>
    </section>
  );
}
