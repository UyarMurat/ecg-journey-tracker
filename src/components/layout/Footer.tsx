
import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <span className="font-medium">ECG Tracker</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Track your heart's journey with precision and elegance
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-2">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/readings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Readings
              </Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © {currentYear} ECG Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
