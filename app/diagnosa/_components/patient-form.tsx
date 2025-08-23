"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import {
  User,
  ChevronRight,
  ChevronLeft,
  FileText,
  Info,
  Heart
} from "lucide-react";
import { PatientFormInput, PatientFormOutput, patientSchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: PatientFormOutput) => void;
  data: PatientFormOutput | null;
}

function PatientForm({ disabledPrev, onSuccess, onClickPrev, data }: IProps) {
  const form = useForm<PatientFormInput>({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
    defaultValues: {
      id_casebase: "",
      no_rm: "",
      nama: "",
      usia: 0
    }
  });

  const onSubmit = (values: PatientFormOutput) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('id_casebase', data.id_casebase);
      form.setValue('nama', data.nama);
      form.setValue('no_rm', data.no_rm);
      form.setValue('usia', data.usia);
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as (data: PatientFormInput) => void)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="id_casebase"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 mb-2 flex items-center">
                  <FileText className="w-4 h-4" />
                  ID Casebase (opsional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="CB-0001 (opsional)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_rm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 mb-2 flex items-center">
                  <FileText className="w-4 h-4" />
                  Nomor Rekam Medis
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="RM-XXXX"
                    autoComplete="off"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 mb-2 flex items-center">
                <User className="w-4 h-4" />
                Nama Pasien
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama lengkap"
                  autoComplete="name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Usia dalam tahun (single field) */}
        <FormField
          control={form.control}
          name="usia"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 mb-2 flex items-center">
                <Heart className="w-4 h-4" />
                Usia
              </FormLabel>
              <FormControl>
                <div className="flex rounded-md shadow-xs">
                  <Input
                    inputMode="decimal"
                    step="0.1"
                    placeholder="mis. 5 atau 2.5"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    {...field}
                    value={field.value as string | number}
                  />
                  <span className="border-input text-muted-foreground -z-10 inline-flex items-center rounded-e-md border border-l-0 px-3 text-sm">
                    Tahun
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Alert className="bg-blue-950/30 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <p>
              Pastikan nomor rekam medis sesuai dengan data rumah sakit. Usia dicatat
              langsung dalam <span className="font-semibold">tahun</span>.
            </p>
          </AlertDescription>
        </Alert>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClickPrev}
            disabled={disabledPrev}
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>

          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PatientForm;
