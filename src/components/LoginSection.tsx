
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginSectionProps {
  onLogin: () => void;
}

const LoginSection = ({ onLogin }: LoginSectionProps) => {
  return (
    <Card className="w-full max-w-md mx-auto border-web3-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Get Started</CardTitle>
        <CardDescription>
          We'll generate your secure wallet and verify your identity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Log in with Civic
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginSection;
