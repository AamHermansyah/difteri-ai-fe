import z from "zod";

export const patientSchema = z.object({
  id_casebase: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  no_rm: z
    .string()
    .trim()
    .min(1, "Nomor rekam medis wajib diisi")
    .max(50, "Terlalu panjang"),
  nama: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  usia: z.coerce
    .number({ error: "Usia harus berupa angka" })
    .positive("Usia harus > 0")
    .max(150, "Usia tidak wajar"),
});

// sebelum diparse (input dari user, bisa string/unknown)
export type PatientFormInput = z.input<typeof patientSchema>;
// setelah diparse (hasil resolver, sudah pasti number di usia)
export type PatientFormOutput = z.output<typeof patientSchema>;

export const clinicalSymptomsSchema = z.object({
  // 0 = tidak, 1 = ya (string dari RadioGroup untuk konsistensi CSV)
  mual: z.enum(["0", "1"]),
  muntah: z.enum(["0", "1"]),
  batuk: z.enum(["0", "1"]),
  pilek: z.enum(["0", "1"]),
  nyeri_menelan: z.enum(["0", "1"]),
  suara_mengorok: z.enum(["0", "1"]),
  sesak: z.enum(["0", "1"]),
  // angka hari (boleh 0 jika tidak demam)
  lama_demam: z.coerce
    .number({ error: "Lama demam harus berupa angka" })
    .min(0, "Minimal 0 hari")
    .max(60, "Terlalu lama, periksa kembali")
});

// sebelum diparse (input user; lama_demam masih string dst.)
export type ClinicalSymptomsFormInput = z.input<typeof clinicalSymptomsSchema>;
// setelah diparse (output resolver; lama_demam sudah number)
export type ClinicalSymptomsFormOutput = z.output<typeof clinicalSymptomsSchema>;

export const physicalExamSchema = z
  .object({
    pembesaran_kelenjar: z.enum(["0", "1"]),
    bullneck: z.enum(["0", "1"]),
    terdapat_membran_di: z.enum([
      "Tidak Ada",
      "Tonsil",
      "Faring",
      "Laring",
      "Nasal",
      "Orofaring",
      "Nasofaring",
      "Trakea",
      "Lainnya",
    ]),
    // angka area/derajat membran; contoh CSV: 4
    luas_membran: z.coerce
      .number({ error: "Luas membran harus berupa angka" })
      .min(0, "Minimal 0"),
    berdarah_saat_di_swab: z.enum(["0", "1"]),

    // Skala ordinal numerik (samakan dengan kode dataset Anda):
    // contoh asumsi: 0=Normal, 1=Pucat, 2=Hiperemis
    konjungtiva: z.coerce
      .number({ error: "Nilai konjungtiva harus angka" })
      .int()
      .min(1)
      .max(5),
    // contoh asumsi: 0=Normal, 1=Unilateral membesar, 2=Bilateral, 3=Fluktuasi/supuratif
    kelenjar_getah_bening: z.coerce
      .number({ error: "Nilai KGB harus angka" })
      .int()
      .min(0)
      .max(3),
    // contoh asumsi: Grade Brodsky 0–4
    tonsil: z.coerce
      .number({ error: "Nilai tonsil harus angka" })
      .int()
      .min(0)
      .max(4),
  })
  .superRefine((val, ctx) => {
    if (val.terdapat_membran_di !== "Tidak Ada" && !(val.luas_membran > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["luas_membran"],
        message: "Wajib > 0 jika terdapat membran.",
      });
    }
  });

// Types untuk input/output (karena ada z.coerce.number)
export type PhysicalExamFormInput = z.input<typeof physicalExamSchema>;
export type PhysicalExamFormOutput = z.output<typeof physicalExamSchema>;

export const laboratorySchema = z.object({
  // Hematologi
  hemoglobin: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  hematrokit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  eritrosit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  m_c_v: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  m_c_h: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  m_c_h_c: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  leukosit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  trombosit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  laju_endap_darah: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),

  // Diferensial leukosit (umumnya persen)
  basofil: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),
  eosinofil: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),
  neutrofil: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),
  limposit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),
  monosit: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),

  // Kimia & Elektrolit
  glukosa: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  natrium: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  kalium: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  khlorida: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),

  // Gas Darah (rentang longgar supaya kompatibel dataset)
  ph: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  ["3pco2"]: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  be: z.coerce.number({ error: "Input harus angka" }), // bisa negatif/positif
  so2: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0").max(100),

  // Penunjang EKG
  rate: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
  qtc: z.coerce.number({ error: "Input harus angka" }).min(0, "Nilai harus ≥ 0"),
});

// sebelum parse (bisa string/unknown dari input)
export type LaboratoryFormInput = z.input<typeof laboratorySchema>;
// setelah parse (sudah number)
export type LaboratoryFormOutput = z.output<typeof laboratorySchema>;

export const vitalsSchema = z
  .object({
    bb: z.coerce
      .number({ error: "Berat badan harus angka" })
      .positive("Berat badan harus > 0")
      .max(300, "Nilai tidak wajar"),
    sistol: z.coerce
      .number({ error: "Sistol harus angka" })
      .min(40, "Terlalu rendah")
      .max(300, "Terlalu tinggi"),
    diastol: z.coerce
      .number({ error: "Diastol harus angka" })
      .min(20, "Terlalu rendah")
      .max(200, "Terlalu tinggi"),
    nadi: z.coerce
      .number({ error: "Nadi harus angka" })
      .min(0)
      .max(300, "Nilai tidak wajar"),
    pernafasan: z.coerce
      .number({ error: "Frekuensi napas harus angka" })
      .min(0)
      .max(100, "Nilai tidak wajar"),
    suhu: z.coerce
      .number({ error: "Suhu harus angka" })
      .min(25, "Tidak wajar")
      .max(45, "Tidak wajar"),
  })
  .superRefine((v, ctx) => {
    if (v.diastol >= v.sistol) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["diastol"],
        message: "Diastol harus lebih kecil dari sistol",
      });
    }
  });

// sebelum parse (string/unknown dari input)
export type VitalsFormInput = z.input<typeof vitalsSchema>;
// setelah parse (number valid)
export type VitalsFormOutput = z.output<typeof vitalsSchema>;

export const additionalSchema = z.object({
  kontak_erat_difteri: z.enum(["0", "1"]),
  status_imunisasi: z.enum(["0", "1", "2"]),
  antibiotik_sudah_diberi: z.enum(["0", "1"]),
});

// Types (opsional; tetap konsisten dengan step lain)
export type AdditionalFormValues = z.infer<typeof additionalSchema>;