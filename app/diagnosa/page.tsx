import React from 'react'
import DiagnosaLayout from './_layouts/diagnosa-layout'

async function DiagnosaPage() {
  const defaultFeatures = ["id_casebase", "no_rm", "nama", "penyakit"];
  let features: string[] = [];
  try {
    const res = await fetch('http://localhost:8000/health', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === "ok") {
        features = [...defaultFeatures, ...data.model_info.features];
      } else {
        throw new Error('Error when get features');
      }
    } else {
      throw new Error('Error when get features');
    }
  } catch (error) {
    throw Error((error as Error).message);
  }

  return (
    <DiagnosaLayout features={features} />
  )
}

export default DiagnosaPage