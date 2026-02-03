import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { ProgressStepper } from '@/components/ProgressStepper';
import { useTripStore } from '@/store/trip-store';
import { INTERESTS } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const step2Schema = z.object({
  interests: z.array(z.string()).min(1, 'Wybierz przynajmniej jedno zainteresowanie'),
  pace: z.enum(['chill', 'balanced', 'intensive']),
});

type Step2FormData = z.infer<typeof step2Schema>;

const paceOptions = [
  { value: 'chill', label: 'Chill', emoji: '🧘' },
  { value: 'balanced', label: 'Balanced', emoji: '⚖️' },
  { value: 'intensive', label: 'Intensive', emoji: '🚀' },
] as const;

export default function Step2() {
  const navigate = useNavigate();
  const { formData, setFormData } = useTripStore();

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      interests: formData.interests,
      pace: formData.pace,
    },
    mode: 'onChange',
  });

  const selectedInterests = watch('interests');
  const selectedPace = watch('pace');

  const toggleInterest = (id: string) => {
    const current = selectedInterests || [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    setValue('interests', updated, { shouldValidate: true });
  };

  const onSubmit = (data: Step2FormData) => {
    setFormData({
      interests: data.interests,
      pace: data.pace,
    });
    navigate('/plan/step-3');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link
          to="/plan/step-1"
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Wróć"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Itin</h1>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="px-4 py-2">
        <ProgressStepper currentStep={2} totalSteps={3} />
      </div>

      {/* Form */}
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="max-w-md w-full">
          <GlassCard>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-6">
                Co jest dla Ciebie ważne?
              </h2>

              {/* Interests */}
              <div className="space-y-3">
                <Label>Zainteresowania</Label>
                <div className="grid grid-cols-2 gap-3">
                  {INTERESTS.map(({ id, label, icon }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedInterests?.includes(id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-input hover:border-muted-foreground'
                      }`}
                    >
                      <Checkbox
                        checked={selectedInterests?.includes(id)}
                        onCheckedChange={() => toggleInterest(id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm font-medium text-foreground">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-sm text-destructive">{errors.interests.message}</p>
                )}
              </div>

              {/* Pace */}
              <div className="space-y-3">
                <Label>Tempo podróży</Label>
                <div className="grid grid-cols-3 gap-3">
                  {paceOptions.map(({ value, label, emoji }) => (
                    <label
                      key={value}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPace === value
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-input hover:border-muted-foreground'
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        checked={selectedPace === value}
                        onChange={() => setValue('pace', value, { shouldValidate: true })}
                        className="sr-only"
                      />
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-sm font-medium text-foreground">{label}</span>
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
                  onClick={() => navigate('/plan/step-1')}
                >
                  Wstecz
                </Button>
                <Button
                  type="submit"
                  className="btn-lime flex-1"
                  disabled={!isValid}
                >
                  Dalej
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
