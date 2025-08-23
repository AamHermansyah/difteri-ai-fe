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
  Heart
} from "lucide-react";
import { VitalsFormInput, VitalsFormOutput, vitalsSchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: VitalsFormOutput) => void;
  data: VitalsFormOutput | null;
}

type FieldName = keyof VitalsFormInput;

function VitalsForm({ disabledPrev, onClickPrev, onSuccess, data }: IProps) {
  const form = useForm<VitalsFormInput>({
    resolver: zodResolver(vitalsSchema),
    mode: "onChange",
  });

  const onSubmit = (values: VitalsFormOutput) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('bb', data.bb);
      form.setValue('diastol', data.diastol);
      form.setValue('nadi', data.nadi);
      form.setValue('pernafasan', data.pernafasan);
      form.setValue('sistol', data.sistol);
      form.setValue('suhu', data.suhu);
    }
  }, [data]);

  const NumField = ({
    name,
    label,
    unit,
    step = "1",
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
            <Heart className="w-4 h-4 mr-2" />
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
        onSubmit={form.handleSubmit(onSubmit as (d: VitalsFormInput) => void)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <NumField name="bb" label="Berat Badan" unit="kg" step="0.1" placeholder="10" />
          <NumField name="sistol" label="Tekanan Sistolik" unit="mmHg" step="1" placeholder="100" />
          <NumField name="diastol" label="Tekanan Diastolik" unit="mmHg" step="1" placeholder="79" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <NumField name="nadi" label="Nadi" unit="bpm" step="1" placeholder="134" />
          <NumField name="pernafasan" label="Frekuensi Napas" unit="x/menit" step="1" placeholder="34" />
          <NumField name="suhu" label="Suhu" unit="°C" step="0.1" placeholder="36" />
        </div>

        <Alert className="bg-rose-950/30 border-rose-500/30">
          <Info className="h-4 w-4 text-rose-300" />
          <AlertDescription className="text-rose-100">
            <p>
              Pastikan diastol lebih kecil dari sistol.
            </p>
          </AlertDescription>
        </Alert>

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
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white border-0 disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default VitalsForm;
