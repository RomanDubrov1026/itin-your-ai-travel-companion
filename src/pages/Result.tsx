import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Plane, Building2, Wallet, Clock, MapPin, Download, Edit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTripStore } from "@/store/trip-store";

export default function Result() {
  const navigate = useNavigate();
  const { generatedPlan, toggleAttraction, reset } = useTripStore();

  if (!generatedPlan) {
    navigate("/");
    return null;
  }

  const { destination, startDate, endDate, travelers, transport, hotel, itinerary, totalBudget } =
    generatedPlan;
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pl-PL").format(value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate("/plan/step-1");
  };

  const handleReset = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col pb-8">
      {/* Header */}
      <header className="no-print p-4 text-center md:p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">Itin</h1>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4">
        {/* Title */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            {destination} • {nights + 1} dni
          </h2>
          <p className="text-muted-foreground">
            {format(startDate, "d MMMM", { locale: pl })} –{" "}
            {format(endDate, "d MMMM yyyy", { locale: pl })} • {travelers} osób
          </p>
          <p className="font-medium text-primary">Plan dopasowany do Ciebie</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Transport */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Transport</h3>
                <p className="text-sm text-muted-foreground">{transport.carrier}</p>
                <p className="text-sm text-muted-foreground">
                  {transport.departureTime} – {transport.arrivalTime}
                </p>
                <p className="mt-1 font-semibold text-primary">
                  {formatCurrency(transport.price * travelers * 2)} zł
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Hotel */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Nocleg</h3>
                <p className="truncate text-sm text-muted-foreground">{hotel.name}</p>
                <p className="text-sm text-muted-foreground">
                  {hotel.area} • {"★".repeat(hotel.rating)}
                </p>
                <p className="mt-1 font-semibold text-primary">
                  {formatCurrency(hotel.totalPrice)} zł
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Total Budget */}
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Razem</h3>
                <p className="text-sm text-muted-foreground">Transport + Nocleg + Atrakcje</p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {formatCurrency(totalBudget.total)} zł
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Budget Breakdown */}
        <GlassCard className="no-print">
          <h3 className="mb-3 font-semibold text-foreground">Podział budżetu</h3>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Transport</p>
              <p className="font-medium text-foreground">
                {formatCurrency(totalBudget.transport)} zł
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Nocleg</p>
              <p className="font-medium text-foreground">
                {formatCurrency(totalBudget.accommodation)} zł
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Atrakcje</p>
              <p className="font-medium text-foreground">
                {formatCurrency(totalBudget.attractions)} zł
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Jedzenie (szacunek)</p>
              <p className="font-medium text-foreground">{formatCurrency(totalBudget.food)} zł</p>
            </div>
          </div>
        </GlassCard>

        {/* Itinerary */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Plan dnia po dniu</h3>
          <Accordion
            type="multiple"
            defaultValue={itinerary.map((_, i) => `day-${i}`)}
            className="space-y-3"
          >
            {itinerary.map((day, dayIndex) => (
              <AccordionItem key={dayIndex} value={`day-${dayIndex}`} className="border-none">
                <GlassCard className="overflow-hidden p-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-lg font-semibold text-foreground">{day.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {day.attractions.map((attraction) => (
                        <label
                          key={attraction.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all ${
                            attraction.included ? "bg-white/5" : "bg-white/5 opacity-50"
                          }`}
                        >
                          <Checkbox
                            checked={attraction.included}
                            onCheckedChange={() => toggleAttraction(dayIndex, attraction.id)}
                            className="mt-0.5 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-foreground">{attraction.name}</span>
                              {attraction.price > 0 && (
                                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                                  {formatCurrency(attraction.price)} zł
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {attraction.description}
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {attraction.duration}h
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {attraction.area}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                      {day.attractions.length === 0 && (
                        <p className="py-2 text-sm text-muted-foreground">
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
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted/30">
            <div className="text-center text-muted-foreground">
              <MapPin className="mx-auto mb-2 h-8 w-8" />
              <p>Mapa trasy (wkrótce)</p>
            </div>
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="no-print flex flex-col gap-3 sm:flex-row">
          <Button className="btn-lime flex-1" onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Pobierz PDF
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edytuj preferencje
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Zacznij od nowa
          </Button>
        </div>
      </main>
    </div>
  );
}
