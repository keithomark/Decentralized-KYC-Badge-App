
import { Badge, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-web3-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge className="h-4 w-4" />
            <span>Powered by Civic Auth</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-web3-primary transition-colors"
            >
              <Github className="h-3 w-3" />
              View Source
            </a>
            <span>•</span>
            <span>Built for Web3 Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
