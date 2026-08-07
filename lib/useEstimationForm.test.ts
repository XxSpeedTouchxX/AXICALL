import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEstimationForm } from "./useEstimationForm";

beforeEach(() => {
  sessionStorage.clear();
});

describe("useEstimationForm", () => {
  it("starts at step 1 with empty data", () => {
    const { result } = renderHook(() => useEstimationForm());
    expect(result.current.step).toBe(1);
  });

  it("updates vehicle data and advances to step 2", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
    });
    expect(result.current.step).toBe(2);
    expect(result.current.data.vehicle.marque).toBe("Renault");
  });

  it("goBack moves to the previous step without clearing data", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
      result.current.goBack();
    });
    expect(result.current.step).toBe(1);
    expect(result.current.data.vehicle.marque).toBe("Renault");
  });

  it("persists data to sessionStorage on update", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Peugeot" } as never);
    });
    const stored = JSON.parse(sessionStorage.getItem("estimation-form")!);
    expect(stored.vehicle.marque).toBe("Peugeot");
  });

  it("restores state from sessionStorage on mount", () => {
    sessionStorage.setItem(
      "estimation-form",
      JSON.stringify({ vehicle: { marque: "Citroën" }, condition: {}, situation: {}, contact: {} })
    );
    const { result } = renderHook(() => useEstimationForm());
    expect(result.current.data.vehicle.marque).toBe("Citroën");
  });

  it("reset clears sessionStorage and returns to step 1", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
      result.current.reset();
    });
    expect(result.current.step).toBe(1);
    expect(sessionStorage.getItem("estimation-form")).toBeNull();
  });
});
