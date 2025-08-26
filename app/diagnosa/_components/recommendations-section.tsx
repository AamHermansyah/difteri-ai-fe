import { Card } from '@/components/ui/card'
import { CheckCircle, Shield } from 'lucide-react'
import React from 'react'

function RecommendationsSection() {
  return (
    <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-white/10 backdrop-blur-xl p-8 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-white">Rekomendasi Tindak Lanjut</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-1">Konsultasi Medis Segera</h4>
            <p className="text-gray-300 text-sm">
              Segera hubungi dokter spesialis anak atau dokter umum untuk konfirmasi diagnosis
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-1">Pemeriksaan Lanjutan</h4>
            <p className="text-gray-300 text-sm">
              Lakukan kultur swab tenggorok dan tes sensitivitas antibiotik jika diperlukan
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-1">Isolasi dan Monitoring</h4>
            <p className="text-gray-300 text-sm">
              Lakukan isolasi untuk mencegah penularan dan monitor kondisi pasien secara ketat
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default RecommendationsSection