'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SimilarCase } from '@/lib/types';
import { Details } from './details';

interface SimilarCasesProps {
  similarCases: SimilarCase[];
}

const SimilarCasesDetail: React.FC<SimilarCasesProps> = ({ similarCases }) => {
  const [expandedCases, setExpandedCases] = useState<number[]>([]);

  const toggleCase = (index: number) => {
    setExpandedCases(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getBloodPressureStatus = (sistol: number, diastol: number) => {
    if (sistol >= 140 || diastol >= 90) return { status: "Tinggi", color: "text-red-400" };
    if (sistol <= 90 || diastol <= 60) return { status: "Rendah", color: "text-blue-400" };
    return { status: "Normal", color: "text-green-400" };
  };

  const getTemperatureStatus = (suhu: number) => {
    if (suhu >= 38.0) return { status: "Demam", color: "text-red-400" };
    if (suhu >= 37.5) return { status: "Subfebris", color: "text-yellow-400" };
    return { status: "Normal", color: "text-green-400" };
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white mb-6">Detail Kasus Serupa</h3>

      {similarCases.map((caseData, index) => {
        const isExpanded = expandedCases.includes(index);
        const similarity = Math.round((1 - caseData.distance) * 100);
        const bpStatus = getBloodPressureStatus(caseData.record.sistol, caseData.record.diastol);
        const tempStatus = getTemperatureStatus(caseData.record.suhu);

        return (
          <Card key={index} className="py-0 bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Header Card */}
            <div className="p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold">
                    {caseData.index}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Kasus #{caseData.index}</h4>
                    <h6 className="flex items-center gap-2 text-sm text-gray-400">
                      {caseData.record.nama} • {caseData.record.usia} tahun
                    </h6>
                    <p className="text-sm text-gray-400">
                      Kesamaan: {similarity}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    {caseData.record.penyakit}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCase(index)}
                    className="text-gray-400 hover:text-white"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">{caseData.record.usia}</div>
                  <div className="text-xs text-gray-400">Usia (tahun)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">{caseData.record.lama_demam}</div>
                  <div className="text-xs text-gray-400">Lama Demam (hari)</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">{caseData.record.suhu}°C</div>
                  <div className={`text-xs ${tempStatus.color}`}>{tempStatus.status}</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">{similarity}%</div>
                  <div className="text-xs text-gray-400">Kesamaan</div>
                </div>
              </div>
            </div>

            {/* For print only */}
            <div className="hidden print:block">
              <Details
                bpStatus={bpStatus}
                caseData={caseData}
                tempStatus={tempStatus}
              />
            </div>

            {/* Detailed Information - Expandable */}
            {isExpanded && (
              <div className="print:hidden">
                <Details
                  bpStatus={bpStatus}
                  caseData={caseData}
                  tempStatus={tempStatus}
                />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default SimilarCasesDetail;