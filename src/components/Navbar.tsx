import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Recycle, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ReVibe</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/signup">Signup</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border border-border rounded-lg mt-2 p-4 shadow-soft animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-foreground hover:text-primary transition-colors">
                Browse
              </Link>
              <a href="/#how-it-works" className="text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;