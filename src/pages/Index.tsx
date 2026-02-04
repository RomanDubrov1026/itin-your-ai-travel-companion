import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, Building2, MapPin, Wallet, Menu } from "lucide-react";

const features = [
  { icon: Plane, label: "Transport" },
  { icon: Building2, label: "Hotel" },
  { icon: MapPin, label: "Atrakcje" },
  { icon: Wallet, label: "Budżet" },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground">Itin</h1>
        <button className="rounded-lg p-2 transition-colors hover:bg-white/10" aria-label="Menu">
          <Menu className="h-6 w-6 text-foreground" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12">
        <div className="w-full max-w-lg space-y-8 text-center">
          {/* Hero */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Podróż.
              <br />
              <span className="text-primary">Zaplanowana.</span>
            </h2>
            <p className="text-lg text-muted-foreground">Osobisty plan podróży, bez planowania.</p>
          </div>

          {/* CTA */}
          <Link to="/plan/step-1">
            <Button className="btn-lime text-lg">Stwórz plan podróży</Button>
          </Link>

          {/* Features */}
          <div className="glass-card mt-8 p-6">
            <div className="grid grid-cols-4 gap-4">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credibility */}
          <p className="text-sm text-muted-foreground">Graph-RAG • AI • 40 języków</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 p-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-6">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
