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
  "OTHER",
];

export const PROFESSION_LABELS: Record<string, string> = {
  ELECTRICIAN: "Eletricista",
  PLUMBER: "Encanador",
  CARPENTER: "Carpinteiro", 
  PAINTER: "Pintor",
  MASON: "Pedreiro",
  OTHER: "Outros",
};

export const getProfessionOptions = () => 
  PROFESSIONS.map(profession => ({
    value: profession,
    label: PROFESSION_LABELS[profession] || profession
  }));
