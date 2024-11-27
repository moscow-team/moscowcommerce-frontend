import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface PaymentProgressProps {
  progress: number;
}

export function PaymentProgress({ progress }: PaymentProgressProps) {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-center mb-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
      <p className="text-center text-xl font-semibold text-gray-700 dark:text-gray-200">
        Procesando tu pago...
      </p>
      <Progress 
        value={progress} 
        className="w-full h-2 bg-gray-200 dark:bg-gray-700"
        indicatorClassName="bg-indigo-600"
      />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Por favor, no cierres esta ventana
      </p>
    </div>
  );
}