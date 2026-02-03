import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Plane, Building2, Wallet, Clock, MapPin, Download, Edit, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTripStore } from '@/store/trip-store';

export default function Result() {
  const navigate = useNavigate();
  const { generatedPlan, toggleAttraction, reset } = useTripStore();

  if (!generatedPlan) {
    navigate('/');
    return null;
  }

  const { destination, startDate, endDate, travelers, transport, hotel, itinerary, totalBudget } = generatedPlan;
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pl-PL').format(value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate('/plan/step-1');
  };

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col pb-8">
      {/* Header */}
      <header className="p-4 md:p-6 text-center no-print">
        <h1 className="text-xl font-bold text-foreground mb-1">Itin</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 max-w-3xl mx-auto w-full space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            {destination} • {nights + 1} dni
          </h2>
          <p className="text-muted-foreground">
            {format(startDate, 'd MMMM', { locale: pl })} – {format(endDate, 'd MMMM yyyy', { locale: pl })} • {travelers} osób
          </p>
          <p className="text-primary font-medium">Plan dopasowany do Ciebie</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Transport */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Transport</h3>
                <p className="text-sm text-muted-foreground">{transport.carrier}</p>
                <p className="text-sm text-muted-foreground">{transport.departureTime} – {transport.arrivalTime}</p>
                <p className="text-primary font-semibold mt-1">
                  {formatCurrency(transport.price * travelers * 2)} zł
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Hotel */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Nocleg</h3>
                <p className="text-sm text-muted-foreground truncate">{hotel.name}</p>
                <p className="text-sm text-muted-foreground">{hotel.area} • {'★'.repeat(hotel.rating)}</p>
                <p className="text-primary font-semibold mt-1">
                  {formatCurrency(hotel.totalPrice)} zł
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Total Budget */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Razem</h3>
                <p className="text-sm text-muted-foreground">Transport + Nocleg + Atrakcje</p>
                <p className="text-2xl text-primary font-bold mt-1">
                  {formatCurrency(totalBudget.total)} zł
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Budget Breakdown */}
        <GlassCard className="no-print">
          <h3 className="font-semibold text-foreground mb-3">Podział budżetu</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Transport</p>
              <p className="text-foreground font-medium">{formatCurrency(totalBudget.transport)} zł</p>
            </div>
            <div>
              <p className="text-muted-foreground">Nocleg</p>
              <p className="text-foreground font-medium">{formatCurrency(totalBudget.accommodation)} zł</p>
            </div>
            <div>
              <p className="text-muted-foreground">Atrakcje</p>
              <p className="text-foreground font-medium">{formatCurrency(totalBudget.attractions)} zł</p>
            </div>
            <div>
              <p className="text-muted-foreground">Jedzenie (szacunek)</p>
              <p className="text-foreground font-medium">{formatCurrency(totalBudget.food)} zł</p>
            </div>
          </div>
        </GlassCard>

        {/* Itinerary */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Plan dnia po dniu</h3>
          <Accordion type="multiple" defaultValue={itinerary.map((_, i) => `day-${i}`)} className="space-y-3">
            {itinerary.map((day, dayIndex) => (
              <AccordionItem key={dayIndex} value={`day-${dayIndex}`} className="border-none">
                <GlassCard className="p-0 overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-lg font-semibold text-foreground">{day.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {day.attractions.map((attraction) => (
                        <label
                          key={attraction.id}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                            attraction.included
                              ? 'bg-white/5'
                              : 'bg-white/5 opacity-50'
                          }`}
                        >
                          <Checkbox
                            checked={attraction.included}
                            onCheckedChange={() => toggleAttraction(dayIndex, attraction.id)}
                            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-foreground">{attraction.name}</span>
                              {attraction.price > 0 && (
                                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                  {formatCurrency(attraction.price)} zł
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{attraction.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {attraction.duration}h
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {attraction.area}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                      {day.attractions.length === 0 && (
                        <p className="text-muted-foreground text-sm py-2">
                          Dzień wolny – czas na relaks lub własne odkrycia!
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </GlassCard>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Map Placeholder */}
        <GlassCard className="no-print">
          <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p>Mapa trasy (wkrótce)</p>
            </div>
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 no-print">
          <Button className="btn-lime flex-1" onClick={handlePrint}>
            <Download className="w-4 h-4 mr-2" />
            Pobierz PDF
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edytuj preferencje
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Zacznij od nowa
          </Button>
        </div>
      </main>
    </div>
  );
}
