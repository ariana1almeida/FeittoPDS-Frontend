export const initialServiceFormData = {
  foto: "",
  titulo: "",
  descricao: "",
  categoria: "",
};

export type ServiceFormData = typeof initialServiceFormData;

export function validateServiceForm(formData: ServiceFormData) {
  const errors: Record<string, boolean> = {};

  if (!formData.titulo.trim()) {
    errors.titulo = true;
  }

  if (!formData.descricao.trim()) {
    errors.descricao = true;
  }

  if (!formData.categoria) {
    errors.categoria = true;
  }

  if (!formData.foto.trim()) {
    errors.foto = true;
  }

  return errors;
}
