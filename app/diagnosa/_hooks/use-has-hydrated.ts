// hooks/useHasHydrated.ts
import { useDiagnosisStore } from "@/stores/use-diagnosis-store";
import { useState, useEffect } from "react";

export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsub = useDiagnosisStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // langsung true kalau sudah hydrated
    if (useDiagnosisStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  return hasHydrated;
}
