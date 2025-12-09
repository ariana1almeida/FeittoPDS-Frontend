import { LightningIcon, PaintBrushHouseholdIcon, DropIcon, HammerIcon, WallIcon, BroomIcon, LeafIcon, ScrewdriverIcon, WrenchIcon, DotsThreeIcon } from "@phosphor-icons/react";

export const PROFESSION_ICONS = {
    ELECTRICIAN: LightningIcon,
    PLUMBER: DropIcon,
    CARPENTER: HammerIcon,
    PAINTER: PaintBrushHouseholdIcon,
    MASON: WallIcon,
    CLEANER: BroomIcon,
    GARDENER: LeafIcon,
    FURNITURE_ASSEMBLER: ScrewdriverIcon,
    APPLIANCE_REPAIR: WrenchIcon,
    OTHERS: DotsThreeIcon,
} as const;

export const CITIES: string[] = [
    "ARROIO_DO_SAL",
    "BALNEARIO_PINHAL",
    "CAPAO_DA_CANOA",
    "CAPIVARI_DO_SUL",
    "CARAA",
    "CIDREIRA",
    "DOM_PEDRO_DE_ALCANTARA",
    "IMBE",
    "ITATI",
    "MAMPITUBA",
    "MAQUINE",
    "MORRINHOS_DO_SUL",
    "MOSTARDAS",
    "OSORIO",
    "PALMARES_DO_SUL",
    "SANTO_ANTONIO_DA_PATRULHA",
    "TAVARES",
    "TERRA_DE_AREIA",
    "TORRES",
    "TRAMANDAI",
    "TRES_CACHOEIRAS",
    "TRES_FORQUILHAS",
    "XANGRI_LA",
];

export const STATES: string[] = ["RS"];

export const PROFESSIONS: string[] = [
    "ELECTRICIAN",
    "PLUMBER",
    "CARPENTER",
    "PAINTER",
    "MASON",
    "CLEANER",
    "GARDENER",
    "FURNITURE_ASSEMBLER",
    "APPLIANCE_REPAIR",
    "OTHERS",
];

export const PROFESSION_LABELS: Record<string, string> = {
    ELECTRICIAN: "Eletricista",
    PLUMBER: "Encanador",
    CARPENTER: "Carpinteiro",
    PAINTER: "Pintor",
    MASON: "Pedreiro",
    CLEANER: "Faxineira/Diarista",
    GARDENER: "Jardineiro",
    FURNITURE_ASSEMBLER: "Montador de Móveis",
    APPLIANCE_REPAIR: "Técnico de Eletrodomésticos",
    OTHERS: "Outros",
};

export const PROFESSION_CLASSES: Record<string, string> = {
    ELECTRICIAN: "bg-yellow-100 text-yellow-800",
    PLUMBER: "bg-blue-100 text-blue-800",
    CARPENTER: "bg-amber-100 text-amber-800",
    PAINTER: "bg-pink-100 text-pink-800",
    MASON: "bg-slate-100 text-slate-800",
    CLEANER: "bg-emerald-100 text-emerald-800",
    GARDENER: "bg-green-100 text-green-800",
    FURNITURE_ASSEMBLER: "bg-red-100 text-red-800",
    APPLIANCE_REPAIR: "bg-indigo-100 text-indigo-800",
    OTHERS: "bg-gray-100 text-gray-700",
};

export const CLIENT_TYPES: Record<string, string> = {
    PROVIDER: 'Prestador',
    CLIENT: 'Cliente',
}

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