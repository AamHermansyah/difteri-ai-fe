'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { cn, generateRandomCBId, normalizeData } from '@/lib/utils';
import Navbar from '../../_layouts/navbar';
import PatientForm from '../_components/patient-form';
import ClinicalSymptomsForm from '../_components/clinical-symptoms-form';
import PhysicalExamForm from '../_components/physical-exam-form';
import LaboratoryForm from '../_components/laboratory-form';
import VitalsForm from '../_components/vitals-form';
import AdditionalForm from '../_components/additional-form';
import { formSections } from '@/lib/constants';
import {
  AdditionalFormValues,
  ClinicalSymptomsFormOutput,
  LaboratoryFormOutput,
  PatientFormOutput,
  PhysicalExamFormOutput,
  VitalsFormOutput
} from '@/lib/schemas/diagnosa';
import { toast } from 'sonner';
import { useDiagnosisStore } from '@/stores/use-diagnosis-store';
import { useRouter } from 'next/navigation';

interface FormData {
  patient: PatientFormOutput | null;
  physicalExam: PhysicalExamFormOutput | null;
  vitals: VitalsFormOutput | null;
  laboratory: LaboratoryFormOutput | null;
  clinicalSymptoms: ClinicalSymptomsFormOutput | null;
  additional: AdditionalFormValues | null;
}

function DiagnosaLayout() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    patient: null,
    physicalExam: null,
    vitals: null,
    laboratory: null,
    clinicalSymptoms: null,
    additional: null
  });
  const [currentStep, setCurrentStep] = useState(0);
  const stepProgress = ((currentStep + 1) / formSections.length) * 100;

  const { setDiagnosis } = useDiagnosisStore();
  const navigate = useRouter();
  let resetPhysicalFormCb: () => void;

  const handleReset = () => {
    toast.warning('Formulir berhasil direset!');
    resetPhysicalFormCb();
    setFormData({
      additional: null,
      clinicalSymptoms: null,
      laboratory: null,
      patient: null,
      physicalExam: null,
      vitals: null,
    });
    setCurrentStep(0);
  }

  const handleDiagnosa = async (data: AdditionalFormValues) => {
    setLoading(true);

    const url = process.env.NEXT_PUBLIC_API_URL || '';

    const defaultFeatures = ["id_casebase", "no_rm", "nama", "penyakit"];
    let features: string[] = [];
    try {
      const res = await fetch(`${url}/health`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        features = [...defaultFeatures, ...data.model_info.features];
      } else throw new Error('Gagal mendapatkan features');
    } catch (error) {
      throw Error((error as Error)?.message || 'Gagal mendapatkan features');
    }

    const payload = {
      data: normalizeData({
        ...formData.clinicalSymptoms,
        ...formData.laboratory,
        ...formData.patient,
        ...formData.physicalExam,
        ...formData.vitals,
        ...data
      }),
      topk: 3,
      similar_fields: features
    }

    if (!payload.data.id_casebase) {
      payload.data.id_casebase = generateRandomCBId();
    }

    setFormData((prev) => ({
      ...prev,
      additional: data
    }));

    try {
      const res = await fetch(`${url}/predict`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setDiagnosis(data);
        navigate.push('/diagnosa/hasil');
      } else {
        if (res.status === 422) {
          const data = await res.json();
          toast.error(data?.detail[0].msg || 'Gagal untuk mendiagnosa data');
        } else toast.error('Gagal untuk mendiagnosa data');
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-pink-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      </div>

      <Navbar className="xl:max-w-7xl px-4 sm:px-8 md:px-8" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Diagnosa Baru
              </h1>
              <p className="text-gray-400">Isi data pasien untuk melakukan identifikasi difteri</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleReset} className="border-white/20 text-white hover:bg-white/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Form
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress Pengisian</span>
              <span className="text-sm font-medium text-white">{Math.round(stepProgress)}%</span>
            </div>
            <Progress value={stepProgress} className="h-2 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${stepProgress}%` }}
              />
            </Progress>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8 gap-2">
            {formSections.map((section, index) => (
              <div key={section.id} className={cn(
                'relative flex items-center',
                formSections.length - 1 !== index && 'flex-auto'
              )}>
                <div className={`relative flex items-center justify-center size-7 sm:size-12 rounded-full transition-all duration-300 ${index === currentStep
                  ? 'bg-gradient-to-r ' + section.color + ' scale-110'
                  : index < currentStep
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-white/10 border-2 border-white/20'
                  }`}>
                  {index < currentStep ? (
                    <CheckCircle2 className="size-4 sm:size-6 text-green-400" />
                  ) : (
                    <section.icon className="size-4 sm:size-6 text-white" />
                  )}
                  {index === currentStep && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 animate-pulse" />
                  )}
                </div>
                {index < formSections.length - 1 && (
                  <div className={`flex-1 top-[50%] -translate-y-[50%] left-0 h-0.5 transition-all duration-300 ${index < currentStep ? 'bg-green-500' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${formSections[currentStep].color}`}>
                    {React.createElement(formSections[currentStep].icon, { className: 'w-6 h-6 text-white' })}
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      {formSections[currentStep].title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Langkah {currentStep + 1} dari {formSections.length}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Data Pasien Section */}
                {currentStep === 0 && (
                  <PatientForm
                    data={formData.patient}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    handleReset={(cb) => {
                      resetPhysicalFormCb = cb;
                    }}
                    onSuccess={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        patient: data
                      }))
                      setCurrentStep(Math.min(formSections.length - 1, currentStep + 1))
                    }}
                    disabledPrev={currentStep === 0}
                  />
                )}

                {currentStep === 1 && (
                  <ClinicalSymptomsForm
                    data={formData.clinicalSymptoms}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    onSuccess={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        clinicalSymptoms: data
                      }))
                      setCurrentStep(Math.min(formSections.length - 1, currentStep + 1))
                    }}
                  />
                )}

                {currentStep === 2 && (
                  <PhysicalExamForm
                    data={formData.physicalExam}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    onSuccess={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        physicalExam: data
                      }))
                      setCurrentStep(Math.min(formSections.length - 1, currentStep + 1))
                    }}
                  />
                )}

                {currentStep === 3 && (
                  <LaboratoryForm
                    data={formData.laboratory}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    onSuccess={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        laboratory: data
                      }))
                      setCurrentStep(Math.min(formSections.length - 1, currentStep + 1))
                    }}
                  />
                )}

                {currentStep === 4 && (
                  <VitalsForm
                    data={formData.vitals}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    onSuccess={(data) => {
                      setFormData((prev) => ({
                        ...prev,
                        vitals: data
                      }))
                      setCurrentStep(Math.min(formSections.length - 1, currentStep + 1))
                    }}
                  />
                )}

                {currentStep === 5 && (
                  <AdditionalForm
                    loading={loading}
                    data={formData.additional}
                    onClickPrev={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    onSuccess={handleDiagnosa}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Section Tips */}
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/10">
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Tip Pengisian</p>
                    <p className="text-xs text-gray-300">
                      Pastikan semua data diisi dengan lengkap untuk hasil diagnosa yang akurat.
                      Sistem akan melakukan validasi otomatis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Overview */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formSections.map((section, index) => (
                    <div
                      key={section.id}
                      className={
                        `w-full flex items-center justify-between p-3 rounded-lg transition-all 
                        ${index === currentStep
                          ? 'bg-gradient-to-r ' + section.color + ' bg-opacity-20'
                          : ''
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <section.icon
                          className={cn(
                            "w-4 h-4",
                            index < currentStep ? "text-green-400" : "text-white"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm",
                            index === currentStep ? "text-white font-medium" : "text-gray-400"
                          )}
                        >
                          {section.title}
                        </span>
                      </div>
                      {index < currentStep && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosaLayout;