import { SimilarCase } from "@/lib/types";
import { Activity, AlertCircle, CheckCircle, Heart, Minus, TestTube, User, XCircle } from "lucide-react";

interface DetailProps {
  caseData: SimilarCase;
  bpStatus: { status: string; color: string };
  tempStatus: { status: string; color: string };
}

export const Details: React.FC<DetailProps> = ({ caseData, bpStatus, tempStatus }) => {
  const getBooleanIcon = (value: number) => {
    if (value === 1) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (value === 0) return <XCircle className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getBooleanText = (value: number) => {
    if (value === 1) return "Ya";
    if (value === 0) return "Tidak";
    return "-";
  };

  return (
    <div className="border-t border-white/10 p-6 space-y-6">
      {/* Patient Info */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-blue-400" />
          <h5 className="text-lg font-semibold text-white">Informasi Pasien</h5>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400">No. RM</div>
            <div className="font-semibold text-white">{caseData.record.no_rm}</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400">Nama</div>
            <div className="font-semibold text-white">{caseData.record.nama}</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400">Berat Badan</div>
            <div className="font-semibold text-white">{caseData.record.bb} kg</div>
          </div>
        </div>
      </div>

      {/* Clinical Symptoms */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <h5 className="text-lg font-semibold text-white">Gejala Klinis</h5>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Mual", value: caseData.record.mual },
            { label: "Muntah", value: caseData.record.muntah },
            { label: "Batuk", value: caseData.record.batuk },
            { label: "Pilek", value: caseData.record.pilek },
            { label: "Nyeri Menelan", value: caseData.record.nyeri_menelan },
            { label: "Suara Mengorok", value: caseData.record.suara_mengorok },
            { label: "Sesak", value: caseData.record.sesak },
            { label: "Pembesaran Kelenjar", value: caseData.record.pembesaran_kelenjar }
          ].map((symptom, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span className="text-gray-300 text-sm">{symptom.label}</span>
              <div className="flex items-center gap-2">
                {getBooleanIcon(symptom.value)}
                <span className="text-white text-sm font-medium">
                  {getBooleanText(symptom.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Examination */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-400" />
          <h5 className="text-lg font-semibold text-white">Pemeriksaan Fisik</h5>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400 mb-2">Membran</div>
            <div className="font-semibold text-white mb-1">
              {caseData.record.terdapat_membran_di}
            </div>
            <div className="text-sm text-gray-300">
              Luas: {caseData.record.luas_membran}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {getBooleanIcon(caseData.record.berdarah_saat_di_swab)}
              <span className="text-sm">
                Berdarah saat swab: {getBooleanText(caseData.record.berdarah_saat_di_swab)}
              </span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400 mb-2">Tanda Vital</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Suhu:</span>
                <span className={`font-semibold ${tempStatus.color}`}>
                  {caseData.record.suhu}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Nadi:</span>
                <span className="text-white font-semibold">{caseData.record.nadi} bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Napas:</span>
                <span className="text-white font-semibold">{caseData.record.pernafasan}/min</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-sm text-gray-400 mb-2">Tekanan Darah</div>
            <div className="text-2xl font-bold text-white mb-1">
              {caseData.record.sistol}/{caseData.record.diastol}
            </div>
            <div className={`text-sm font-medium ${bpStatus.color}`}>
              {bpStatus.status}
            </div>
          </div>
        </div>
      </div>

      {/* Lab Results */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TestTube className="w-5 h-5 text-purple-400" />
          <h5 className="text-lg font-semibold text-white">Hasil Laboratorium</h5>
        </div>

        {/* Hematologi */}
        <div className="mb-4">
          <h6 className="text-md font-medium text-gray-300 mb-3">Hematologi</h6>
          <div className="grid md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.hemoglobin}</div>
              <div className="text-xs text-gray-400">Hemoglobin (g/dL)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.hematrokit}</div>
              <div className="text-xs text-gray-400">Hematokrit (%)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.leukosit}</div>
              <div className="text-xs text-gray-400">Leukosit (×10³/μL)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.trombosit}</div>
              <div className="text-xs text-gray-400">Trombosit (×10³/μL)</div>
            </div>
          </div>
        </div>

        {/* Differential Count */}
        <div className="mb-4">
          <h6 className="text-md font-medium text-gray-300 mb-3">Hitung Jenis</h6>
          <div className="grid md:grid-cols-5 gap-3">
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.basofil}</div>
              <div className="text-xs text-gray-400">Basofil (%)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.eosinofil}</div>
              <div className="text-xs text-gray-400">Eosinofil (%)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.neutrofil}</div>
              <div className="text-xs text-gray-400">Neutrofil (%)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.limposit}</div>
              <div className="text-xs text-gray-400">Limfosit (%)</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 text-center">
              <div className="text-lg font-bold text-white">{caseData.record.monosit}</div>
              <div className="text-xs text-gray-400">Monosit (%)</div>
            </div>
          </div>
        </div>

        {/* Chemistry & Blood Gas */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h6 className="text-md font-medium text-gray-300 mb-3">Kimia Darah & Elektrolit</h6>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.glukosa}</div>
                <div className="text-xs text-gray-400">Glukosa (mg/dL)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.natrium}</div>
                <div className="text-xs text-gray-400">Natrium (mEq/L)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.kalium}</div>
                <div className="text-xs text-gray-400">Kalium (mEq/L)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.khlorida}</div>
                <div className="text-xs text-gray-400">Klorida (mEq/L)</div>
              </div>
            </div>
          </div>

          <div>
            <h6 className="text-md font-medium text-gray-300 mb-3">Analisis Gas Darah & EKG</h6>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.ph}</div>
                <div className="text-xs text-gray-400">pH</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record["3pco2"]}</div>
                <div className="text-xs text-gray-400">PCO₂ (mmHg)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.rate}</div>
                <div className="text-xs text-gray-400">Heart Rate</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 text-center">
                <div className="text-lg font-bold text-white">{caseData.record.qtc}</div>
                <div className="text-xs text-gray-400">QTc (ms)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-400" />
          <h5 className="text-lg font-semibold text-white">Riwayat & Status</h5>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              {getBooleanIcon(caseData.record.kontak_erat_difteri)}
              <span className="text-gray-300">Kontak Erat Difteri</span>
            </div>
            <div className="text-sm font-medium text-white">
              {getBooleanText(caseData.record.kontak_erat_difteri)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              {getBooleanIcon(caseData.record.status_imunisasi)}
              <span className="text-gray-300">Status Imunisasi</span>
            </div>
            <div className="text-sm font-medium text-white">
              {getBooleanText(caseData.record.status_imunisasi)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              {getBooleanIcon(caseData.record.antibiotik_sudah_diberi)}
              <span className="text-gray-300">Antibiotik Sudah Diberi</span>
            </div>
            <div className="text-sm font-medium text-white">
              {getBooleanText(caseData.record.antibiotik_sudah_diberi)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}