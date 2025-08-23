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
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

import {
  ChevronRight,
  ChevronLeft,
  Info,
  Stethoscope
} from "lucide-react";
import { ClinicalSymptomsFormInput, ClinicalSymptomsFormOutput, clinicalSymptomsSchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: ClinicalSymptomsFormOutput) => void;
  data: ClinicalSymptomsFormOutput | null;
}

function ClinicalSymptomsForm({ disabledPrev, onClickPrev, onSuccess, data }: IProps) {
  const form = useForm<ClinicalSymptomsFormInput>({
    resolver: zodResolver(clinicalSymptomsSchema),
    mode: "onChange",
    defaultValues: {
      mual: "0",
      muntah: "0",
      batuk: "0",
      pilek: "0",
      nyeri_menelan: "0",
      suara_mengorok: "0",
      sesak: "0",
      lama_demam: undefined as unknown as number
    }
  });

  const onSubmit = (values: ClinicalSymptomsFormOutput) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('batuk', data.batuk);
      form.setValue('lama_demam', data.lama_demam);
      form.setValue('mual', data.mual);
      form.setValue('muntah', data.muntah);
      form.setValue('nyeri_menelan', data.nyeri_menelan);
      form.setValue('pilek', data.pilek);
      form.setValue('sesak', data.sesak);
      form.setValue('suara_mengorok', data.suara_mengorok);
    }
  }, [data]);

  const YesNoField = ({
    name,
    label,
  }: {
    name:
    | "mual"
    | "muntah"
    | "batuk"
    | "pilek"
    | "nyeri_menelan"
    | "suara_mengorok"
    | "sesak";
    label: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-gray-300 flex items-center">
            <Stethoscope className="w-4 h-4 mr-2" />
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              className="flex gap-6"
              value={field.value}
              onValueChange={field.onChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id={`${name}-no`} />
                <label htmlFor={`${name}-no`} className="text-sm text-gray-200">
                  Tidak
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id={`${name}-yes`} />
                <label htmlFor={`${name}-yes`} className="text-sm text-gray-200">
                  Ya
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as (d: ClinicalSymptomsFormInput) => void)} className="space-y-6">
        {/* Gejala (Ya/Tidak) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <YesNoField name="mual" label="Mual" />
          <YesNoField name="muntah" label="Muntah" />
          <YesNoField name="batuk" label="Batuk" />
          <YesNoField name="pilek" label="Pilek" />
          <YesNoField name="nyeri_menelan" label="Nyeri Menelan" />
          <YesNoField name="suara_mengorok" label="Suara Mengorok / Stridor" />
          <YesNoField name="sesak" label="Sesak Napas" />
        </div>

        {/* Lama demam (hari) */}
        <FormField
          control={form.control}
          name="lama_demam"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Lama Demam (hari)</FormLabel>
              <FormControl>
                <div className="flex rounded-md">
                  <Input
                    inputMode="numeric"
                    step="1"
                    min={0}
                    placeholder="mis. 3"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    value={(field.value as unknown as number) ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                  <span className="border-input text-muted-foreground inline-flex items-center rounded-e-md border border-l-0 px-3 text-sm">
                    hari
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Alert className="bg-purple-950/30 border-purple-500/30">
          <Info className="h-4 w-4 text-purple-300" />
          <AlertDescription className="text-purple-100">
            <p>
              Isi gejala sesuai temuan klinis saat ini.
              Jika pasien tidak demam, isi <span className="font-semibold">0</span> pada lama demam.
            </p>
          </AlertDescription>
        </Alert>

        {/* Navigasi */}
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ClinicalSymptomsForm;
