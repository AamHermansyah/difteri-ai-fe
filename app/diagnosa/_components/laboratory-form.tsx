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
  ChevronRight,
  ChevronLeft,
  Info,
  FlaskConical
} from "lucide-react";
import { LaboratoryFormInput, LaboratoryFormOutput, laboratorySchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: LaboratoryFormOutput) => void;
  data: LaboratoryFormOutput | null;
}

type FieldName = keyof LaboratoryFormInput;

function LaboratoryForm({ disabledPrev, onClickPrev, onSuccess, data }: IProps) {
  const form = useForm<LaboratoryFormInput>({
    resolver: zodResolver(laboratorySchema),
    mode: "onChange",
  });

  const onSubmit = (values: LaboratoryFormOutput) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('3pco2', data['3pco2']);
      form.setValue('basofil', data.basofil);
      form.setValue('be', data.be);
      form.setValue('eosinofil', data.eosinofil);
      form.setValue('eritrosit', data.eritrosit);
      form.setValue('glukosa', data.glukosa);
      form.setValue('hematrokit', data.hematrokit);
      form.setValue('hemoglobin', data.hemoglobin);
      form.setValue('kalium', data.kalium);
      form.setValue('khlorida', data.khlorida);
      form.setValue('laju_endap_darah', data.laju_endap_darah);
      form.setValue('leukosit', data.leukosit);
      form.setValue('limposit', data.limposit);
      form.setValue('m_c_h', data.m_c_h);
      form.setValue('m_c_h_c', data.m_c_h_c);
      form.setValue('m_c_v', data.m_c_v);
      form.setValue('monosit', data.monosit);
      form.setValue('natrium', data.natrium);
      form.setValue('neutrofil', data.neutrofil);
      form.setValue('ph', data.ph);
      form.setValue('qtc', data.qtc);
      form.setValue('rate', data.rate);
      form.setValue('so2', data.so2);
      form.setValue('trombosit', data.trombosit);
    }
  }, [data]);

  const NumField = ({
    name,
    label,
    unit,
    step = "0.1",
    placeholder,
  }: {
    name: FieldName;
    label: string;
    unit?: string;
    step?: string;
    placeholder?: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300 flex items-center">
            <FlaskConical className="w-4 h-4" />
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex rounded-md">
              <Input
                {...field}
                inputMode="decimal"
                step={step}
                placeholder={placeholder ?? "0"}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                value={field.value as string | number ?? ""}
              />
              {unit ? (
                <span className="border-input text-muted-foreground inline-flex items-center rounded-e-md border border-l-0 px-3 text-sm whitespace-nowrap">
                  {unit}
                </span>
              ) : null}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as (d: LaboratoryFormInput) => void)}
        className="space-y-8"
      >
        {/* Hematologi */}
        <div>
          <h3 className="text-base font-semibold text-white/90 mb-4">Hematologi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <NumField name="hemoglobin" label="Hemoglobin" unit="g/dL" step="0.1" placeholder="13.2" />
            <NumField name="hematrokit" label="Hematrokit" unit="%" step="0.1" placeholder="38" />
            <NumField name="eritrosit" label="Eritrosit" unit="juta/µL" step="0.1" placeholder="5.1" />
            <NumField name="m_c_v" label="MCV" unit="fL" step="0.1" placeholder="76" />
            <NumField name="m_c_h" label="MCH" unit="pg" step="0.1" placeholder="26" />
            <NumField name="m_c_h_c" label="MCHC" unit="g/dL" step="0.1" placeholder="34" />
            <NumField name="leukosit" label="Leukosit" unit="×10³/µL" step="0.1" placeholder="17.3" />
            <NumField name="trombosit" label="Trombosit" unit="×10³/µL" step="1" placeholder="311" />
            <NumField name="laju_endap_darah" label="Laju Endap Darah" unit="mm/jam" step="1" placeholder="33" />
          </div>
        </div>

        {/* Diferensial Leukosit */}
        <div>
          <h3 className="text-base font-semibold text-white/90 mb-4">Diferensial Leukosit (%)</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <NumField name="basofil" label="Basofil" unit="%" step="1" placeholder="0" />
            <NumField name="eosinofil" label="Eosinofil" unit="%" step="1" placeholder="1" />
            <NumField name="neutrofil" label="Neutrofil" unit="%" step="1" placeholder="69" />
            <NumField name="limposit" label="Limposit" unit="%" step="1" placeholder="21" />
            <NumField name="monosit" label="Monosit" unit="%" step="1" placeholder="9" />
          </div>
        </div>

        {/* Kimia & Elektrolit */}
        <div>
          <h3 className="text-base font-semibold text-white/90 mb-4">Kimia & Elektrolit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <NumField name="glukosa" label="Glukosa" unit="mg/dL" step="1" placeholder="121" />
            <NumField name="natrium" label="Natrium" unit="mmol/L" step="0.1" placeholder="139" />
            <NumField name="kalium" label="Kalium" unit="mmol/L" step="0.1" placeholder="3.8" />
            <NumField name="khlorida" label="Klorida" unit="mmol/L" step="0.1" placeholder="99" />
          </div>
        </div>

        {/* Gas Darah */}
        <div>
          <h3 className="text-base font-semibold text-white/90 mb-4">Gas Darah</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <NumField name="ph" label="pH / pO₂" step="0.1" placeholder="7.5 atau 302.4" />
            <NumField name={"3pco2" as FieldName} label="pCO₂" unit="mmHg" step="0.1" placeholder="36.1" />
            <NumField name="be" label="Base Excess" unit="mmol/L" step="0.1" placeholder="2.8" />
            <NumField name="so2" label="sO₂" unit="%" step="0.1" placeholder="1" />
          </div>
        </div>

        {/* Penunjang (EKG) */}
        <div>
          <h3 className="text-base font-semibold text-white/90 mb-4">Penunjang (EKG)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <NumField name="rate" label="Heart Rate (EKG)" unit="bpm" step="1" placeholder="151" />
            <NumField name="qtc" label="QTc" unit="ms" step="1" placeholder="478" />
          </div>
        </div>

        <Alert className="bg-orange-950/30 border-orange-500/30">
          <Info className="h-4 w-4 text-orange-300" />
          <AlertDescription className="text-orange-100">
            <p>
              Satuan dicantumkan untuk konsistensi input.
              Batas validasi dibuat <i>longgar</i> agar sesuai variasi data;
              sesuaikan bila anda ingin batas klinis lebih ketat.
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
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </Button>

          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LaboratoryForm;
