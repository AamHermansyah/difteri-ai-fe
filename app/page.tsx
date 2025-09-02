'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Activity,
  Brain,
  Shield,
  Zap,
  ChevronRight,
  BarChart3,
  FileSearch,
  Microscope,
  HeartPulse
} from 'lucide-react';
import BgEffect from '@/components/shared/bg-effect';
import { cn } from '@/lib/utils';
import Footer from './_layouts/footer';
import Navbar from './_layouts/navbar';
import Link from 'next/link';

export default function DifteriLandingPage() {
  const stats = [
    { label: 'Kasus Terdeteksi', value: '8,289', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { label: 'Akurasi Model', value: '94.7%', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { label: 'Waktu Diagnosa', value: '<3 detik', icon: Zap, color: 'from-green-500 to-emerald-500' },
    { label: 'Keberhasilan Rata-rata', value: '80%', icon: Shield, color: 'from-orange-500 to-red-500' }
  ];

  const features = [
    {
      icon: Microscope,
      title: 'Case-Based Reasoning',
      description: 'Menggunakan algoritma WHVDM untuk mencari kasus serupa dari database historis',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: Brain,
      title: 'Machine Learning Adaptif',
      description: 'Multi-Output SVM untuk adaptasi kasus dengan akurasi tinggi',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'Prediksi Instan',
      description: 'Hasil diagnosa dapat diprediksi hanya dalam hitungan detik',
      gradient: 'from-pink-600 to-red-600'
    },
    {
      icon: FileSearch,
      title: 'Database Komprehensif',
      description: '50+ parameter klinis dan laboratorium untuk diagnosa akurat',
      gradient: 'from-red-600 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-clip">
      <BgEffect />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-10 xl:container mx-auto pt-20 pb-32">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30 backdrop-blur-sm">
            <Zap className="w-3 h-3 mr-1" />
            Powered by Informatika Unsil
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Identifikasi Difteri
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-300">
              dengan AI Terdepan
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sistem diagnosa berbasis Case-Based Reasoning dan Machine Learning
            dengan akurasi tinggi untuk deteksi dini penyakit difteri
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/diagnosa">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg px-8 py-6 group"
              >
                Mulai Diagnosa
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Alert */}
          <Alert className="max-w-2xl mx-auto bg-gradient-to-r from-red-950/50 to-orange-950/50 border-red-500/30 backdrop-blur-sm">
            <HeartPulse className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200 text-left">
              <strong>Perhatian:</strong> Sistem ini merupakan alat bantu diagnosa.
              Konsultasikan dengan dokter untuk penanganan medis.
            </AlertDescription>
          </Alert>
        </div>

        {/* Floating cards animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-40 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-64 h-40 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl blur-2xl animate-pulse animation-delay-2000" />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 px-4 md:px-10 xl:container mx-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card
              key={`stat-${i}`}
              className="bg-white/5 border-white/10 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={cn(
                'inline-flex w-max p-3 rounded-lg bg-gradient-to-r mb-4 group-hover:scale-110 transition-transform',
                stat.color
              )}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-white leading-0">{stat.value}</p>
              <p className="text-xl text-gray-400">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-4 md:px-10 xl:container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Teknologi Terdepan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Kombinasi CBR dan ML untuk diagnosa yang cepat dan akurat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div key={`feature-${i}`} id={`feature-${i}`}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 hover:bg-white/10 transition-all duration-300 group h-full">
                <div className={`inline-flex w-max p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 px-4 md:px-10 xl:container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cara Kerja Sistem
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Proses diagnosa yang sistematis dan tervalidasi
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              { step: '01', title: 'Input Data Pasien', desc: 'Masukkan 50+ parameter klinis dan laboratorium' },
              { step: '02', title: 'Proses CBR', desc: 'Sistem mencari kasus serupa menggunakan WHVDM' },
              { step: '03', title: 'Adaptasi ML', desc: 'Multi-Output SVM mengadaptasi solusi dari kasus serupa' },
              { step: '04', title: 'Hasil Diagnosa', desc: 'Tampilkan hasil dengan confidence score dan rekomendasi' }
            ].map((item, i) => (
              <div key={i} className="relative flex gap-6 items-start group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="absolute left-8 mt-16 w-0.5 h-8 bg-gradient-to-b from-blue-600 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 md:px-10 xl:container mx-auto py-20">
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/10 backdrop-blur-xl px-6 sm:px-12 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Siap untuk Meningkatkan Diagnosa Difteri?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Mulai gunakan sistem prediksi kami sekarang, tanpa perlu login atau registrasi
          </p>
          <div className="flex justify-center">
            <Link href="/diagnosa">
              <Button
                size="lg"
                className="w-max bg-white text-black hover:bg-gray-200 text-lg px-8 py-6"
              >
                Mulai Prediksi
              </Button>
            </Link>
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  );
}