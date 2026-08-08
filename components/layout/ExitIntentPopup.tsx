"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Z_INDEX } from "@/lib/zIndex";

const DISMISS_KEY = "exit-intent-dismissed";
const MOBILE_IDLE_MS = 30000;

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    function show() {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      setVisible(true);
    }

    function handleMouseOut(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }

    let idleTimer: ReturnType<typeof setTimeout>;
    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(show, MOBILE_IDLE_MS);
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);
    resetIdleTimer();

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("click", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      dialogRef.current?.focus();
    }
  }, [visible]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
    previouslyFocusedRef.current?.focus();
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 ${Z_INDEX.overlay} flex items-center justify-center bg-black/50 px-4`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div ref={dialogRef} tabIndex={-1} className="max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 id="exit-intent-title" className="mb-3 text-xl font-bold text-[var(--color-navy)]">Avant de partir...</h2>
        <p className="mb-6 text-[var(--color-gray-600)]">
          Estimez gratuitement votre véhicule en 2 minutes, sans engagement.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/estimation" onClick={dismiss}>
            <Button className="w-full">Estimer mon véhicule</Button>
          </Link>
          <button onClick={dismiss} className="text-sm text-[var(--color-gray-600)] underline">
            Non merci
          </button>
        </div>
      </div>
    </div>
  );
}
