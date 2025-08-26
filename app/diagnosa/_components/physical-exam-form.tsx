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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

import {
  ChevronRight,
  ChevronLeft,
  Info,
  Stethoscope
} from "lucide-react";
import { PhysicalExamFormInput, PhysicalExamFormOutput, physicalExamSchema } from "@/lib/schemas/diagnosa";

interface IProps {
  disabledPrev?: boolean;
  onClickPrev?: () => void;
  onSuccess?: (data: PhysicalExamFormOutput) => void;
  data: PhysicalExamFormOutput | null;
}

function PhysicalExamForm({ disabledPrev, onClickPrev, onSuccess, data }: IProps) {
  const form = useForm<PhysicalExamFormInput>({
    resolver: zodResolver(physicalExamSchema),
    mode: "onChange",
    defaultValues: {
      pembesaran_kelenjar: "0",
      bullneck: "0",
      terdapat_membran_di: "Tidak Ada",
      berdarah_saat_di_swab: "0",
      luas_membran: 0
    },
  });

  const onSubmit = (values: PhysicalExamFormOutput) => {
    onSuccess?.(values);
  };

  React.useEffect(() => {
    if (data) {
      form.setValue('berdarah_saat_di_swab', data.berdarah_saat_di_swab);
      form.setValue('bullneck', data.bullneck);
      form.setValue('kelenjar_getah_bening', data.kelenjar_getah_bening);
      form.setValue('konjungtiva', data.konjungtiva);
      form.setValue('luas_membran', data.luas_membran);
      form.setValue('pembesaran_kelenjar', data.pembesaran_kelenjar);
      form.setValue('terdapat_membran_di', data.terdapat_membran_di);
      form.setValue('tonsil', data.tonsil);
    }
  }, [data]);

  const YesNoField = ({
    name,
    label,
  }: {
    name: "pembesaran_kelenjar" | "bullneck" | "berdarah_saat_di_swab";
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
      <form
        onSubmit={form.handleSubmit(onSubmit as (d: PhysicalExamFormInput) => void)}
        className="space-y-6"
      >
        {/* Baris 1: kelenjar & bullneck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <YesNoField name="pembesaran_kelenjar" label="Pembesaran Kelenjar" />
          <YesNoField name="bullneck" label="Bullneck" />
        </div>

        {/* Lokasi membran */}
        <FormField
          control={form.control}
          name="terdapat_membran_di"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Terdapat Membran di</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value === 'Tidak Ada') form.setValue('luas_membran', 0);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Pilih lokasi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tidak Ada">Tidak Ada</SelectItem>
                  <SelectItem value="Tonsil">Tonsil</SelectItem>
                  <SelectItem value="Faring">Faring</SelectItem>
                  <SelectItem value="Laring">Laring</SelectItem>
                  <SelectItem value="Nasal">Nasal</SelectItem>
                  <SelectItem value="Orofaring">Orofaring</SelectItem>
                  <SelectItem value="Nasofaring">Nasofaring</SelectItem>
                  <SelectItem value="Trakea">Trakea</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Luas membran */}
        <FormField
          control={form.control}
          name="luas_membran"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Luas Membran (skor/ukuran)</FormLabel>
              <FormControl>
                <div className="flex rounded-md">
                  <Input
                    {...field}
                    inputMode="numeric"
                    step="1"
                    min={0}
                    placeholder="mis. 4"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    value={field.value as string | number ?? ''}
                    disabled={form.watch('terdapat_membran_di') === 'Tidak Ada'}
                  />
                  <span className="border-input text-muted-foreground inline-flex items-center rounded-e-md border border-l-0 px-3 text-sm">
                    Unit
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Berdarah saat di-swab */}
        <YesNoField name="berdarah_saat_di_swab" label="Berdarah saat di-swab" />

        {/* Konjungtiva (0–2), KGB (0–3), Tonsil grade (0–4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-6">
          <FormField
            control={form.control}
            name="konjungtiva"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">
                  Konjungtiva (Skor 1-5)
                </FormLabel>
                <Select
                  value={field.value !== undefined ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Pilih nilai" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 — Normal</SelectItem>
                    <SelectItem value="2">2 — Sedikit pucat</SelectItem>
                    <SelectItem value="3">3 — Pucat sedang</SelectItem>
                    <SelectItem value="4">4 — Pucat berat</SelectItem>
                    <SelectItem value="5">5 — Hiperemis / parah</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="kelenjar_getah_bening"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Kelenjar Getah Bening (0-3)</FormLabel>
                <Select
                  value={field.value !== undefined ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Pilih nilai" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0 — Normal</SelectItem>
                    <SelectItem value="1">1 — Unilateral membesar</SelectItem>
                    <SelectItem value="2">2 — Bilateral</SelectItem>
                    <SelectItem value="3">3 — Fluktuasi/supuratif</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tonsil"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300">Tonsil Grade (0–4)</FormLabel>
                <Select
                  value={field.value !== undefined ? String(field.value) : ""}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Pilih grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0 — Normal / s/p</SelectItem>
                    <SelectItem value="1">1 — 25% (1+)</SelectItem>
                    <SelectItem value="2">2 — 50% (2+)</SelectItem>
                    <SelectItem value="3">3 — 75% (3+)</SelectItem>
                    <SelectItem value="4">4 — 100% (4+)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Alert className="bg-green-950/30 border-green-500/30">
          <Info className="h-4 w-4 text-green-300" />
          <AlertDescription className="text-green-100">
            <p>
              Jika memilih lokasi membran selain <b>Tidak Ada</b>, isi <b>luas_membran</b> &gt; 0.
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
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PhysicalExamForm;
