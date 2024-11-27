import { CheckCircle2, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { PriceFormatter } from '@/utils/PriceFormatter';
import { useEffect } from 'react';

interface PaymentSuccessProps {
  amount: number;
}

export function PaymentSuccess({ amount }: PaymentSuccessProps) {
  useEffect(() => {
    playSuccessSound();
  }, []);
  
  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
  
      oscillator.type = 'triangle'; // Cambia el tipo de onda a 'triangle' o 'square' para un sonido más llamativo
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + startTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration);
  
      oscillator.start(audioContext.currentTime + startTime);
      oscillator.stop(audioContext.currentTime + startTime + duration);
    };
  
    // Un pequeño arpegio: tres notas
    playNote(440.00, 0, 0.2); // A4
    playNote(523.25, 0.2, 0.2); // C5
    playNote(659.25, 0.4, 0.3); // E5
  };
  
  return (
    <div className="text-white p-6 space-y-6">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex justify-center"
      >
        <CheckCircle2 className="h-16 w-16" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-bold text-center">
          ¡Pago exitoso!
        </h2>
        
        <div className="text-center space-y-2">
          <p className="text-xl">
            {PriceFormatter(amount)} pagado correctamente
          </p>
          <p className="text-lg opacity-90">
            ¡Muchas gracias por tu compra!
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <PartyPopper className="h-8 w-8 animate-bounce" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-center opacity-90 pt-4"
      >
        Recibirás un correo con los detalles de tu compra
      </motion.div>
    </div>
  );
}

