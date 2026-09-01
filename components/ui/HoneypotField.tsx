interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Bot trap. Hidden from sight and from assistive technology, and skipped by
 * keyboard navigation, so no real user can fill it — but automated scripts
 * that populate every input will, and the API silently discards those.
 *
 * Kept off-screen rather than `display:none`, which some bots detect.
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="societeWeb">Site web de votre société</label>
      <input
        id="societeWeb"
        name="societeWeb"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
