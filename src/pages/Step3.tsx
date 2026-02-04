import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/GlassCard";
import { ProgressStepper } from "@/components/ProgressStepper";
import { LoadingModal } from "@/components/LoadingModal";
import { useTripStore } from "@/store/trip-store";
import { generatePlan } from "@/lib/mock-data";

const step3Schema = z.object({
  budgetMin: z.number().min(500),
  budgetMax: z.number().max(50000),
  accommodationType: z.enum(["apartment", "hotel", "any"]),
  hotelQuality: z.enum(["3", "4", "5", "any"]),
  transportPreference: z.enum(["cheapest", "fastest", "best-value"]),
});

type Step3FormData = z.infer<typeof step3Schema>;

const accommodationOptions = [
  { value: "apartment", label: "Apartament" },
  { value: "hotel", label: "Hotel" },
  { value: "any", label: "Dowolny" },
] as const;

const qualityOptions = [
  { value: "3", label: "3★" },
  { value: "4", label: "4★" },
  { value: "5", label: "5★" },
  { value: "any", label: "Dowolny" },
] as const;

const transportOptions = [
  { value: "cheapest", label: "Najtańszy" },
  { value: "fastest", label: "Najszybszy" },
  { value: "best-value", label: "Najlepsza wartość" },
] as const;

export default function Step3() {
  const navigate = useNavigate();
  const { formData, setFormData, setGeneratedPlan } = useTripStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
    watch,
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      budgetMin: formData.budgetMin,
      budgetMax: formData.budgetMax,
      accommodationType: formData.accommodationType,
      hotelQuality: formData.hotelQuality,
      transportPreference: formData.transportPreference,
    },
    mode: "onChange",
  });

  const budgetMin = watch("budgetMin");
  const budgetMax = watch("budgetMax");
  const accommodationType = watch("accommodationType");
  const hotelQuality = watch("hotelQuality");
  const transportPreference = watch("transportPreference");

  const handleBudgetChange = (values: number[]) => {
    setValue("budgetMin", values[0], { shouldValidate: true });
    setValue("budgetMax", values[1], { shouldValidate: true });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pl-PL").format(value);
  };

  const onSubmit = (data: Step3FormData) => {
    setFormData({
      budgetMin: data.budgetMin,
      budgetMax: data.budgetMax,
      accommodationType: data.accommodationType,
      hotelQuality: data.hotelQuality,
      transportPreference: data.transportPreference,
    });
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    const plan = generatePlan({
      ...formData,
      budgetMin,
      budgetMax,
      accommodationType,
      hotelQuality,
      transportPreference,
    });
    setGeneratedPlan(plan);
    navigate("/result");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link
          to="/plan/step-2"
          className="rounded-lg p-2 transition-colors hover:bg-white/10"
          aria-label="Wróć"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Itin</h1>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="px-4 py-2">
        <ProgressStepper currentStep={3} totalSteps={3} />
      </div>

      {/* Form */}
      <main className="flex flex-1 flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <GlassCard>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
                Budżet i preferencje
              </h2>

              {/* Budget Slider */}
              <div className="space-y-4">
                <Label>Budżet całkowity</Label>
                <div className="text-center text-lg font-semibold text-primary">
                  {formatCurrency(budgetMin)} – {formatCurrency(budgetMax)} zł
                </div>
                <Slider
                  value={[budgetMin, budgetMax]}
                  min={500}
                  max={20000}
                  step={100}
                  onValueChange={handleBudgetChange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>500 zł</span>
                  <span>20 000 zł</span>
                </div>
              </div>

              {/* Accommodation Type */}
              <div className="space-y-3">
                <Label>Typ zakwaterowania</Label>
                <div className="grid grid-cols-3 gap-2">
                  {accommodationOptions.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-all ${
                        accommodationType === value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-input text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        checked={accommodationType === value}
                        onChange={() =>
                          setValue("accommodationType", value, { shouldValidate: true })
                        }
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Hotel Quality */}
              <div className="space-y-3">
                <Label>Standard hotelu</Label>
                <div className="grid grid-cols-4 gap-2">
                  {qualityOptions.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-all ${
                        hotelQuality === value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-input text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        checked={hotelQuality === value}
                        onChange={() => setValue("hotelQuality", value, { shouldValidate: true })}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Transport Preference */}
              <div className="space-y-3">
                <Label>Preferencje transportu</Label>
                <div className="grid grid-cols-3 gap-2">
                  {transportOptions.map(({ value, label }) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-all ${
                        transportPreference === value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-input text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        checked={transportPreference === value}
                        onChange={() =>
                          setValue("transportPreference", value, { shouldValidate: true })
                        }
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/plan/step-2")}
                >
                  Wstecz
                </Button>
                <Button type="submit" className="btn-lime flex-1" disabled={!isValid}>
                  Wygeneruj plan
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </main>

      <LoadingModal isOpen={isLoading} onComplete={handleLoadingComplete} />
    </div>
  );
}
