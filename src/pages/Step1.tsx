import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { ProgressStepper } from '@/components/ProgressStepper';
import { useTripStore } from '@/store/trip-store';
import { DESTINATIONS, ORIGINS } from '@/lib/types';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';

const step1Schema = z.object({
  destination: z.string().min(1, 'Wybierz miejsce docelowe'),
  origin: z.string().min(1, 'Wybierz miejsce wyjazdu'),
  startDate: z.string().min(1, 'Wybierz datę początkową'),
  endDate: z.string().min(1, 'Wybierz datę końcową'),
  flexibility: z.enum(['strict', 'flexible']),
  travelers: z.number().min(1).max(10),
});

type Step1FormData = z.infer<typeof step1Schema>;

export default function Step1() {
  const navigate = useNavigate();
  const { formData, setFormData } = useTripStore();
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      destination: formData.destination,
      origin: formData.origin,
      startDate: formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : '',
      endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : '',
      flexibility: formData.flexibility,
      travelers: formData.travelers,
    },
    mode: 'onChange',
  });

  const destination = watch('destination');
  const origin = watch('origin');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestSuggestions(false);
      }
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setShowOriginSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationChange = (value: string) => {
    setValue('destination', value, { shouldValidate: true });
    if (value.length > 0) {
      const filtered = DESTINATIONS.filter((d) =>
        d.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(filtered);
      setShowDestSuggestions(true);
    } else {
      setDestinationSuggestions([]);
      setShowDestSuggestions(false);
    }
  };

  const handleOriginChange = (value: string) => {
    setValue('origin', value, { shouldValidate: true });
    if (value.length > 0) {
      const filtered = ORIGINS.filter((o) =>
        o.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(filtered);
      setShowOriginSuggestions(true);
    } else {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
    }
  };

  const onSubmit = (data: Step1FormData) => {
    setFormData({
      destination: data.destination,
      origin: data.origin,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      flexibility: data.flexibility,
      travelers: data.travelers,
    });
    navigate('/plan/step-2');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link
          to="/"
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
        <ProgressStepper currentStep={1} totalSteps={3} />
      </div>

      {/* Form */}
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="max-w-md w-full">
          <GlassCard>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-6">
                Dokąd chcesz pojechać?
              </h2>

              {/* Destination */}
              <div className="space-y-2" ref={destRef}>
                <Label htmlFor="destination">Cel podróży</Label>
                <div className="relative">
                  <Input
                    id="destination"
                    placeholder="np. Barcelona"
                    className="input-dark"
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    onFocus={() => destination && setShowDestSuggestions(true)}
                    autoComplete="off"
                  />
                  {showDestSuggestions && destinationSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-secondary border border-border rounded-lg shadow-lg overflow-hidden">
                      {destinationSuggestions.map((s) => (
                        <li
                          key={s}
                          className="px-4 py-2 hover:bg-accent cursor-pointer text-foreground"
                          onClick={() => {
                            setValue('destination', s, { shouldValidate: true });
                            setShowDestSuggestions(false);
                          }}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.destination && (
                  <p className="text-sm text-destructive">{errors.destination.message}</p>
                )}
              </div>

              {/* Origin */}
              <div className="space-y-2" ref={originRef}>
                <Label htmlFor="origin">Skąd wyjeżdżasz</Label>
                <div className="relative">
                  <Input
                    id="origin"
                    placeholder="np. Kraków"
                    className="input-dark"
                    value={origin}
                    onChange={(e) => handleOriginChange(e.target.value)}
                    onFocus={() => origin && setShowOriginSuggestions(true)}
                    autoComplete="off"
                  />
                  {showOriginSuggestions && originSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-secondary border border-border rounded-lg shadow-lg overflow-hidden">
                      {originSuggestions.map((s) => (
                        <li
                          key={s}
                          className="px-4 py-2 hover:bg-accent cursor-pointer text-foreground"
                          onClick={() => {
                            setValue('origin', s, { shouldValidate: true });
                            setShowOriginSuggestions(false);
                          }}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.origin && (
                  <p className="text-sm text-destructive">{errors.origin.message}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Od</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      className="input-dark"
                      {...register('startDate')}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.startDate && (
                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Do</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      className="input-dark"
                      {...register('endDate')}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.endDate && (
                    <p className="text-sm text-destructive">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Flexibility */}
              <div className="space-y-2">
                <Label>Elastyczność dat</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(['strict', 'flexible'] as const).map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                        watch('flexibility') === opt
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-input hover:border-muted-foreground text-muted-foreground'
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt}
                        {...register('flexibility')}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">
                        {opt === 'strict' ? 'Sztywne' : 'Elastyczne'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Liczba podróżnych</Label>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <Input
                    id="travelers"
                    type="number"
                    min={1}
                    max={10}
                    className="input-dark w-20 text-center"
                    {...register('travelers', { valueAsNumber: true })}
                  />
                  <span className="text-muted-foreground text-sm">osób</span>
                </div>
                {errors.travelers && (
                  <p className="text-sm text-destructive">{errors.travelers.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="btn-lime w-full"
                disabled={!isValid}
              >
                Dalej
              </Button>
            </form>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
