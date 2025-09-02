'use client'

import { useRef } from "react";
import { useReactToPrint } from "react-to-print"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  Brain,
  ChevronRight,
  BarChart3,
  Microscope,
  HeartPulse,
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  ArrowLeft,
  Download,
  AlertCircle,
} from 'lucide-react';
import BgEffect from '@/components/shared/bg-effect';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Navbar from '@/app/_layouts/navbar';
import Footer from '@/app/_layouts/footer';
import SimilarCasesDetail from '../_components/similiar-case-detail';
import RecommendationsSection from '../_components/recommendations-section';
import { useDiagnosisStore } from '@/stores/use-diagnosis-store';
import { useRouter } from 'next/navigation';
import { useHasHydrated } from "../_hooks/use-has-hydrated";

export default function DiagnosisResultPage() {
  const { confidence, diagnosis, similar_cases, similar_cases_detailed, top_scores } = useDiagnosisStore();
  const hydrated = useHasHydrated();
  const result = {
    confidence,
    diagnosis,
    similar_cases,
    similar_cases_detailed,
    top_scores
  };

  const confidencePercentage = Math.round(result.confidence * 100);
  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Laporan-Difteri-${new Date().toLocaleDateString("id-ID")}`,
    // Tweak page & print styles for nicer output
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-break-avoid { break-inside: avoid; page-break-inside: avoid; }
        .print-page-break { page-break-after: always; }
        /* ensure buttons/controls hidden */
        .no-print { display: none !important; }
      }
    `,
  })
  // Get diagnosis severity level
  const getSeverityLevel = (diagnosis: string, confidence: number) => {
    if (diagnosis.toLowerCase().includes('suspect') && confidence < 0.7) {
      return { level: 'medium', color: 'from-yellow-500 to-orange-500', icon: AlertTriangle };
    } else if (confidence > 0.8) {
      return { level: 'high', color: 'from-red-500 to-red-600', icon: AlertTriangle };
    } else {
      return { level: 'low', color: 'from-blue-500 to-blue-600', icon: CheckCircle };
    }
  };

  const severity = getSeverityLevel(result.diagnosis, result.confidence);

  // Prepare chart data
  const chartData = result.top_scores.map(([name, score], index) => ({
    name: `Top ${index + 1}`,
    value: Math.round(score * 100),
    fullName: name
  }));

  const COLORS = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B'];

  useEffect(() => {
    if (!hydrated) return;

    const isEmpty = !diagnosis;

    if (isEmpty) {
      navigate.replace("/diagnosa");
    }
  }, [hydrated, diagnosis]);

  return (
    <div ref={printRef} className="min-h-screen bg-black text-white overflow-x-clip">
      <BgEffect />
      <Navbar />

      {/* Header Section */}
      <section className="relative z-10 px-4 sm:px-8 xl:container mx-auto pt-20 pb-10 print:pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 print:hidden">
            <Link href="/diagnosa">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={handlePrint}
              >
                <Download className="w-4 h-4" />
                Cetak Hasil
              </Button>
            </div>
          </div>

          <div className="text-center mb-12">
            <Badge className={`mb-4 bg-gradient-to-r ${severity.color}/20 text-white border-white/30 backdrop-blur-sm`}>
              <severity.icon className="w-3 h-3 mr-1" />
              Hasil Diagnosa
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight capitalize">
              <span className={`bg-gradient-to-r ${severity.color} bg-clip-text text-transparent`}>
                {result.diagnosis}
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Confidence Level: {confidencePercentage}% • Berdasarkan analisis {result.similar_cases.length} kasus serupa
            </p>

            {/* Main Confidence Progress */}
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Tingkat Kepercayaan</span>
                <span className="text-sm font-bold text-white">{confidencePercentage}%</span>
              </div>
              <Progress
                value={confidencePercentage}
                className="h-4 bg-white/10"
              />
            </div>
          </div>

          {diagnosis.toLowerCase().includes("suspect") && (
            <Alert className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-950/50 to-amber-950/50 border-yellow-500/30 backdrop-blur-sm mb-4">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200 text-left">
                <p>
                  <strong>Status Suspect:</strong> Hasil ini masih berupa <span className="font-semibold">dugaan (suspect)</span>.
                  Artinya kondisi ini <span className="font-semibold">belum pasti</span> dan memerlukan pemeriksaan lebih lanjut
                  oleh tenaga medis untuk konfirmasi diagnosis.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Critical Alert */}
          <Alert className="max-w-4xl mx-auto bg-gradient-to-r from-red-950/50 to-orange-950/50 border-red-500/30 backdrop-blur-sm mb-12">
            <HeartPulse className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-left">
              <strong>Penting:</strong> Hasil ini merupakan prediksi sistem AI.
              Segera konsultasikan dengan dokter spesialis untuk konfirmasi diagnosis dan penanganan medis yang tepat.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Main Results Section */}
      <section className="relative z-10 px-4 sm:px-8 xl:container mx-auto pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12 print-break-avoid">
            {/* Diagnosis Breakdown Chart */}
            <Card className="w-full bg-white/5 border-white/10 backdrop-blur-xl p-6 sm:p-8 print-page-break print:mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Analisis Probabilitas</h3>
              </div>

              <ResponsiveContainer width="100%" height={350} className="mx-auto">
                <PieChart className="mx-auto">
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Probabilitas']} />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    content={({ payload }) => (
                      <ul className="flex flex-wrap justify-center gap-2 mt-6">
                        {payload?.map((entry, index) => (
                          <li key={`item-${index}`} className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 inline-block rounded-sm"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-white text-sm">
                              {chartData[index].fullName} ({chartData[index].value}%)
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 sm:p-8 print-page-break print:mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Metrik Utama</h3>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Diagnosis Utama', value: result.diagnosis, icon: Brain },
                  { label: 'Confidence Score', value: `${confidencePercentage}%`, icon: TrendingUp },
                  { label: 'Kasus Serupa', value: `Top ${result.similar_cases.length} kasus`, icon: Users },
                  { label: 'Metode Analisis', value: 'CBR + ML', icon: Microscope }
                ].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <metric.icon className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{metric.label}</span>
                    </div>
                    <span className="font-semibold text-white capitalize">{metric.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="print:mt-10">
            <SimilarCasesDetail similarCases={result.similar_cases_detailed} />
          </div>
          <RecommendationsSection />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12 print:hidden">
            <Link href="/diagnosa">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg px-8 py-6 group"
              >
                Diagnosa Lain
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}