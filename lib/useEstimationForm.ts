"use client";

import { useEffect, useState } from "react";
import type {
  VehicleInfo,
  VehicleCondition,
  SellerSituation,
  ContactInfo,
} from "@/types/vehicle";

const STORAGE_KEY = "estimation-form";

interface PartialEstimationData {
  vehicle: Partial<VehicleInfo>;
  condition: Partial<VehicleCondition>;
  situation: Partial<SellerSituation>;
  contact: Partial<ContactInfo>;
}

const emptyData: PartialEstimationData = {
  vehicle: {},
  condition: {},
  situation: {},
  contact: {},
};

function loadFromStorage(): PartialEstimationData {
  if (typeof window === "undefined") return emptyData;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyData;
  try {
    return JSON.parse(raw) as PartialEstimationData;
  } catch {
    return emptyData;
  }
}

export function useEstimationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PartialEstimationData>(emptyData);

  useEffect(() => {
    setData(loadFromStorage());
  }, []);

  function persist(next: PartialEstimationData) {
    setData(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function updateVehicle(patch: Partial<VehicleInfo>) {
    persist({ ...data, vehicle: { ...data.vehicle, ...patch } });
  }

  function updateCondition(patch: Partial<VehicleCondition>) {
    persist({ ...data, condition: { ...data.condition, ...patch } });
  }

  function updateSituation(patch: Partial<SellerSituation>) {
    persist({ ...data, situation: { ...data.situation, ...patch } });
  }

  function updateContact(patch: Partial<ContactInfo>) {
    persist({ ...data, contact: { ...data.contact, ...patch } });
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    setData(emptyData);
    setStep(1);
  }

  return {
    step,
    data,
    updateVehicle,
    updateCondition,
    updateSituation,
    updateContact,
    goNext,
    goBack,
    reset,
  };
}
