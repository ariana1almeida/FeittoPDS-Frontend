import { LightningIcon, PaintBrushHouseholdIcon, DropIcon, HammerIcon, WallIcon } from "@phosphor-icons/react";

export const PROFESSION_ICONS = {
    ELECTRICIAN: LightningIcon,
    PAINTER: PaintBrushHouseholdIcon,
    PLUMBER: DropIcon,
    CARPENTER: HammerIcon,
    MASON: WallIcon
    //TODO Tem de adicionar as profissões e os ícones para os restantes
} as const;

export const CITIES: string[] = [
  "CAPAO_DA_CANOA",
  "XANGRI_LA", 
  "TRAMANDAI",
  "IMBE",
  "CURUMIM",
];

export const STATES: string[] = ["RS"];

export const PROFESSIONS: string[] = [
  "ELECTRICIAN",
  "PLUMBER",
  "CARPENTER",
  "PAINTER",
  "MASON",
  "OTHERS",
];

export const PROFESSION_LABELS: Record<string, string> = {
  ELECTRICIAN: "Eletricista",
  PLUMBER: "Encanador",
  CARPENTER: "Carpinteiro", 
  PAINTER: "Pintor",
  MASON: "Pedreiro",
  OTHERS: "Outros",
};

export const PROFESSION_CLASSES: Record<string, string> = {
    ELECTRICIAN: "bg-yellow-100 text-yellow-800",
    PLUMBER: "bg-blue-100 text-blue-800",
    CARPENTER: "bg-amber-100 text-amber-800",
    PAINTER: "bg-pink-100 text-pink-800",
    MASON: "bg-slate-100 text-slate-800",
    OTHERS: "bg-gray-100 text-gray-700",
};

export const getProfessionOptions = () => 
  PROFESSIONS.map(profession => ({
    value: profession,
    label: PROFESSION_LABELS[profession] || profession
  }));

export const getServiceCategoryOptions = () => 
  Object.entries(PROFESSION_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

export const getProfessionBadgeClass = (profession?: string) =>
    (profession && PROFESSION_CLASSES[profession]) || "bg-gray-100 text-gray-700";