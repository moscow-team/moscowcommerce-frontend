import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceRangeFilterProps {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

export function PriceRangeFilter({ onPriceChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = () => {
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);
    onPriceChange(min, max);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="min-price">Precio mínimo</Label>
      <Input
        id="min-price"
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        onBlur={handlePriceChange}
      />
      <Label htmlFor="max-price">Precio máximo</Label>
      <Input
        id="max-price"
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        onBlur={handlePriceChange}
      />
    </div>
  );
}

