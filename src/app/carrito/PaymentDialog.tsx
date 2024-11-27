import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PaymentProgress } from './PaymentProgress';
import { PaymentSuccess } from './PaymentSuccess';
import { PriceFormatter } from '@/utils/PriceFormatter';

interface PaymentDialogProps {
  onPaymentComplete?: () => void;
  amount: number;
}

export function PaymentDialog({ onPaymentComplete, amount }: PaymentDialogProps) {
  const [payed, setPayed] = useState(false);
  const [progress, setProgress] = useState(0);

  const pay = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPayed(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      onPaymentComplete?.();
    }, 6000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" 
          onClick={() => pay()}
        >
          Proceder al pago de {PriceFormatter(amount)}
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${
        payed ? 'bg-gradient-to-br from-emerald-400 to-teal-500 transform scale-105 transition-all duration-500 ease-out' : ''
      }`}>
        <div className="grid gap-4 py-4">
          {!payed ? (
            <PaymentProgress progress={progress} />
          ) : (
            <PaymentSuccess amount={amount} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}