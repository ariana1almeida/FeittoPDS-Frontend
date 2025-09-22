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
