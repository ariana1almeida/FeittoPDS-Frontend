import Input from "../Input";
import RadioGroup from "../RadioGroup";
import type { StepFormProps } from "../../types/form";

const CITIES = [
  "CAPAO_DA_CANOA",
  "XANGRI_LA",
  "TRAMANDAI",
  "IMBE",
  "CURUMIM",
] as const;
const STATES = ["RS"] as const;
const PROFESSIONS = [
  "ELECTRICIAN",
  "PLUMBER",
  "CARPENTER",
  "PAINTER",
  "MASON",
  "OTHER",
] as const;

interface StepUserTypeProps extends StepFormProps {
  showValidation?: boolean;
}

export default function StepUserType({
  formData,
  setFormData,
  showValidation = false,
}: StepUserTypeProps) {
  const setUserType = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      userType: e.target.value as "CLIENT" | "PROVIDER",
    });

  const setClient = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFormData({
      ...formData,
      clientData: { ...formData.clientData, [e.target.name]: e.target.value },
    });

  const setProvider = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFormData({
      ...formData,
      providerData: {
        ...formData.providerData,
        [e.target.name]: e.target.value,
      },
    });

  return (
    <>
      <h2 className="mb-4 text-lg font-medium">Register as</h2>
      <RadioGroup
        name="userType"
        selected={formData.userType}
        onChange={setUserType}
        options={[
          { label: "Client", value: "CLIENT" },
          { label: "Provider", value: "PROVIDER" },
        ]}
      />

      {formData.userType === "CLIENT" && (
        <div className="mt-6">
          <Input
            name="street"
            label="Street*"
            value={formData.clientData.street}
            onChange={setClient}
            required
            error={showValidation && !formData.clientData.street.trim()}
          />
          <Input
            name="houseNumber"
            label="House number*"
            value={formData.clientData.houseNumber}
            onChange={setClient}
            required
            error={showValidation && !formData.clientData.houseNumber.trim()}
          />
          <Input
            name="reference"
            label="Reference"
            value={formData.clientData.reference}
            onChange={setClient}
          />
          <Input
            name="neighborhood"
            label="Neighborhood*"
            value={formData.clientData.neighborhood}
            onChange={setClient}
            required
            error={showValidation && !formData.clientData.neighborhood.trim()}
          />

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                City*
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="city"
                value={formData.clientData.city}
                onChange={setClient}
                className={`w-full rounded border p-2 ${
                  showValidation && !formData.clientData.city
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select a city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                State*
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="state"
                value={formData.clientData.state}
                onChange={setClient}
                className={`w-full rounded border p-2 ${
                  showValidation && !formData.clientData.state
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select a state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {formData.userType === "PROVIDER" && (
        <div className="mt-6">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Profession*
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="profession"
              value={formData.providerData.profession}
              onChange={setProvider}
              className={`w-full rounded border p-2 ${
                showValidation && !formData.providerData.profession
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
            >
              <option value="">Select a profession</option>
              {PROFESSIONS.map((p) => (
                <option key={p} value={p}>
                  {p
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <Input
            name="neighborhood"
            label="Neighborhood*"
            value={formData.providerData.neighborhood}
            onChange={setProvider}
            required
            error={showValidation && !formData.providerData.neighborhood.trim()}
          />

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                City*
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="city"
                value={formData.providerData.city}
                onChange={setProvider}
                className={`w-full rounded border p-2 ${
                  showValidation && !formData.providerData.city
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select a city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                State*
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="state"
                value={formData.providerData.state}
                onChange={setProvider}
                className={`w-full rounded border p-2 ${
                  showValidation && !formData.providerData.state
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select a state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
