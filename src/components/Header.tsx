
import { Badge } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-web3-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-web3-primary to-web3-secondary">
            <Badge className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
              Civic KYC Badge
            </h1>
            <p className="text-sm text-muted-foreground">Verify once. Own it forever.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
