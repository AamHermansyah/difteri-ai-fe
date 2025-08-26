// store/useDiagnosisStore.ts
import { CaseRecord } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TopScore = [string, number];
type SimilarCase = [number, number];

interface SimilarCaseDetailed {
  index: number;
  distance: number;
  record: CaseRecord;
}

interface DiagnosisData {
  diagnosis: string;
  confidence: number;
  top_scores: TopScore[];
  similar_cases: SimilarCase[];
  similar_cases_detailed: SimilarCaseDetailed[];
}

interface DiagnosisState extends DiagnosisData {
  setDiagnosis: (data: DiagnosisData) => void;
  reset: () => void;
}

export const useDiagnosisStore = create<DiagnosisState>()(
  persist(
    (set) => ({
      diagnosis: "",
      confidence: 0,
      top_scores: [],
      similar_cases: [],
      similar_cases_detailed: [],
      setDiagnosis: (data) => set(() => ({ ...data })),
      reset: () =>
        set({
          diagnosis: "",
          confidence: 0,
          top_scores: [],
          similar_cases: [],
          similar_cases_detailed: [],
        }),
    }),
    {
      name: "diagnosis-storage",
    }
  )
);
