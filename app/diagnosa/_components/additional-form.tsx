"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

import {
  ChevronLeft,
  ClipboardList,
  LoaderCircle
} from "lucide-react";
import { AdditionalFormValues, additionalSchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: AdditionalFormValues) => void;
  data: AdditionalFormValues | null;
  loading: boolean;
}

function AdditionalForm({ disabledPrev, onClickPrev, onSuccess, data, loading }: IProps) {
  const form = useForm<AdditionalFormValues>({
    resolver: zodResolver(additionalSchema),
    mode: "onChange",
    defaultValues: {
      kontak_erat_difteri: "0",
      status_imunisasi: "0",
      antibiotik_sudah_diberi: "0",
    },
  });

  const onSubmit = (values: AdditionalFormValues) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('antibiotik_sudah_diberi', data.antibiotik_sudah_diberi);
      form.setValue('kontak_erat_difteri', data.kontak_erat_difteri);
      form.setValue('status_imunisasi', data.status_imunisasi);
    }
  }, [data]);

  const YesNoField = ({
    name,
    label,
  }: {
    name: "kontak_erat_difteri" | "antibiotik_sudah_diberi";
    label: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-gray-300 flex items-center">
            <ClipboardList className="w-4 h-4 mr-2" />
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Baris 1: kontak & antibiotik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <YesNoField name="kontak_erat_difteri" label="Kontak Erat Difteri" />
          <YesNoField name="antibiotik_sudah_diberi" label="Antibiotik Sudah Diberikan" />
        </div>

        {/* Status imunisasi */}
        <FormField
          control={form.control}
          name="status_imunisasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Status Imunisasi</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Pilih status imunisasi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">0 — Tidak lengkap</SelectItem>
                  <SelectItem value="1">1 — Lengkap</SelectItem>
                  <SelectItem value="2">2 — Tidak tahu</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 disabled:opacity-60"
            disabled={loading}
          >
            Mulai Diagnosa
            {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AdditionalForm;
