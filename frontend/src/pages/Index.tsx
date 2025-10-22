import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Shield, Sprout } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen mesh-background flex items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        <div className="inline-flex items-center gap-3 mb-6">
          <Sprout className="w-16 h-16 text-accent animate-pulse-glow" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            KrishiSetu
          </h1>
        </div>
        
        <p className="text-2xl text-muted-foreground mb-12">
          Connecting Farmers & Consumers Directly
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link to="/admin/login" className="group">
            <div className="p-8 rounded-2xl border-2 border-primary bg-card hover:bg-primary/5 transition-all hover:scale-105 cursor-pointer">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4 group-hover:animate-pulse-glow" />
              <h2 className="text-2xl font-bold mb-2">Admin Portal</h2>
              <p className="text-muted-foreground">Manage the entire KrishiSetu ecosystem</p>
            </div>
          </Link>

          <div className="p-8 rounded-2xl border-2 border-border bg-card opacity-70 cursor-not-allowed">
            <Sprout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-muted-foreground">User Portal</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>

        <div className="mt-16 text-sm text-muted-foreground">
          <p>© 2025 KrishiSetu. Empowering farmers, serving communities.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
