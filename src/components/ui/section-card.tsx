import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cardStyles } from "@/utils/common";
import { cn } from "@/utils/common";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const SectionCard = ({
  title,
  description,
  children,
  className,
  centered = false,
}: SectionCardProps) => {
  return (
    <Card className={cn(cardStyles, className)}>
      <CardHeader className={cn(centered && "text-center")}>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn(centered && "text-center")}>
        {children}
      </CardContent>
    </Card>
  );
}; 