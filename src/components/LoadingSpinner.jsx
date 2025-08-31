import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LoadingSpinner({ 
  size = 'default', 
  className,
  text = 'Loading...',
  showText = true 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {showText && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Milan AI" 
            className="h-16 w-16 rounded-full animate-pulse"
          />
        </div>
        <LoadingSpinner size="lg" text="Loading Milan AI..." />
      </div>
    </div>
  );
}