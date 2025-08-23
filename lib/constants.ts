import {
  User,
  Stethoscope,
  Activity,
  FlaskConical,
  Heart,
  ClipboardList
} from 'lucide-react';

export const formSections = [
  {
    id: 'patient',
    title: 'Data Pasien',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'symptoms',
    title: 'Gejala Klinis',
    icon: Stethoscope,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'physical',
    title: 'Pemeriksaan Fisik',
    icon: Activity,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'laboratory',
    title: 'Hasil Laboratorium',
    icon: FlaskConical,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'vitals',
    title: 'Tanda Vital',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'additional',
    title: 'Data Tambahan',
    icon: ClipboardList,
    color: 'from-indigo-500 to-purple-500',
  }
];