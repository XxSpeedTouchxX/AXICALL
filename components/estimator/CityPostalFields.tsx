"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";

interface Commune {
  nom: string;
  codesPostaux: string[];
}

interface CityPostalFieldsProps {
  ville: string;
  codePostal: string;
  onChange: (patch: { ville?: string; codePostal?: string }) => void;
}

const GEO_API = "https://geo.api.gouv.fr/communes";

async function fetchCommunes(params: Record<string, string>): Promise<Commune[]> {
  try {
    const query = new URLSearchParams({ fields: "nom,codesPostaux", limit: "8", ...params });
    const res = await fetch(`${GEO_API}?${query.toString()}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function CityPostalFields({ ville, codePostal, onChange }: CityPostalFieldsProps) {
  const [villeSuggestions, setVilleSuggestions] = useState<Commune[]>([]);
  const [cpSuggestions, setCpSuggestions] = useState<Commune[]>([]);
  const [activeField, setActiveField] = useState<"ville" | "codePostal" | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  function handleVilleChange(next: string) {
    onChange({ ville: next });
    setActiveField("ville");
    clearTimeout(debounceRef.current);
    if (next.trim().length < 2) {
      setVilleSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await fetchCommunes({ nom: next, boost: "population" });
      setVilleSuggestions(results);
    }, 300);
  }

  function handleCodePostalChange(next: string) {
    onChange({ codePostal: next });
    setActiveField("codePostal");
    clearTimeout(debounceRef.current);
    if (!/^\d{5}$/.test(next)) {
      setCpSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await fetchCommunes({ codePostal: next });
      if (results.length === 1) {
        onChange({ ville: results[0].nom });
        setCpSuggestions([]);
      } else {
        setCpSuggestions(results);
      }
    }, 300);
  }

  function selectVilleSuggestion(commune: Commune) {
    onChange({ ville: commune.nom, codePostal: commune.codesPostaux[0] ?? codePostal });
    setVilleSuggestions([]);
    setActiveField(null);
  }

  function selectCpSuggestion(commune: Commune) {
    onChange({ ville: commune.nom });
    setCpSuggestions([]);
    setActiveField(null);
  }

  return (
    <>
      <div className="relative">
        <Input
          label="Ville"
          name="ville"
          value={ville}
          autoComplete="off"
          onChange={(e) => handleVilleChange(e.target.value)}
          onFocus={() => setActiveField("ville")}
          onBlur={() => setTimeout(() => setActiveField(null), 150)}
        />
        {activeField === "ville" && villeSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full border border-[var(--color-gray-200)] bg-white shadow-lg">
            {villeSuggestions.map((commune) => (
              <li key={`${commune.nom}-${commune.codesPostaux[0]}`}>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-[var(--color-navy)] hover:bg-[var(--color-gray-50)]"
                  onMouseDown={() => selectVilleSuggestion(commune)}
                >
                  {commune.nom} ({commune.codesPostaux[0]})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        <Input
          label="Code postal"
          name="codePostal"
          value={codePostal}
          autoComplete="off"
          onChange={(e) => handleCodePostalChange(e.target.value)}
          onFocus={() => setActiveField("codePostal")}
          onBlur={() => setTimeout(() => setActiveField(null), 150)}
        />
        {activeField === "codePostal" && cpSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full border border-[var(--color-gray-200)] bg-white shadow-lg">
            {cpSuggestions.map((commune) => (
              <li key={commune.nom}>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-[var(--color-navy)] hover:bg-[var(--color-gray-50)]"
                  onMouseDown={() => selectCpSuggestion(commune)}
                >
                  {commune.nom}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
