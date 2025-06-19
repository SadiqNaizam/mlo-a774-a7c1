import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn function

interface AuthFormCardProps {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string; // For additional styling on the Card component itself
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  logo,
  children,
  className,
  cardClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
}) => {
  console.log('AuthFormCard loaded');

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Card className={cn("shadow-lg", cardClassName)}>
        {(logo || title || description) && (
          <CardHeader className={cn("text-center", headerClassName)}>
            {logo && <div className="mb-4 flex justify-center">{logo}</div>}
            {title && (
              <CardTitle className={cn("text-2xl font-bold tracking-tight", titleClassName)}>
                {title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className={cn("text-sm text-muted-foreground mt-2", descriptionClassName)}>
                {description}
              </CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent className={cn(contentClassName)}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFormCard;