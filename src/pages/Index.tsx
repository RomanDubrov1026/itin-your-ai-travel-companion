import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plane, Building2, MapPin, Wallet, Menu } from 'lucide-react';

const features = [
  { icon: Plane, label: 'Transport' },
  { icon: Building2, label: 'Hotel' },
  { icon: MapPin, label: 'Atrakcje' },
  { icon: Wallet, label: 'Budżet' },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground">Itin</h1>
        <button
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Podróż.
              <br />
              <span className="text-primary">Zaplanowana.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Osobisty plan podróży, bez planowania.
            </p>
          </div>

          {/* CTA */}
          <Link to="/plan/step-1">
            <Button className="btn-lime text-lg">
              Stwórz plan podróży
            </Button>
          </Link>

          {/* Features */}
          <div className="glass-card p-6 mt-8">
            <div className="grid grid-cols-4 gap-4">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credibility */}
          <p className="text-sm text-muted-foreground">
            Graph-RAG • AI • 40 języków
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
