import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDashboard } from "../../hooks/useDashboard";
import { Search } from "lucide-react";

export function FilterModal({
  open,
  onOpenChange,
  closeModal,
}: {
  open: boolean;
  onOpenChange: any;
  closeModal: any;
}) {
  const { saveProduct, categories, filterProducts, form, handleFormChange } = useDashboard();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        <div>
          <Label htmlFor="search">Buscar por nombre</Label>
          <div className="relative">
            <Input
              type="search"
              id="search"
              placeholder="Introduce el nombre del producto"
              className="pl-10"
              // value={form.nameInput}
              onChange={(e) => {
                handleFormChange('nameInput', e);
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="filterCategory">Buscar por categoría</Label>
          <Select name="filterCategory" defaultValue={form.categorySelect} onValueChange={(e) => {
            console.log(e);
            handleFormChange('categorySelect', e);
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="filterByPriceRange">Buscar por precio</Label>
          <div className="flex gap-4">
            <Input
              id="filterByPriceRange"
              type="number"
              placeholder="Precio mínimo"
              // value={form.minPriceInput}
              onChange={(e) => {
                handleFormChange('minPriceInput', e);
              }}
            />
            <Input
              id="filterByPriceRange"
              type="number"
              placeholder="Precio máximo"
              // value={form.maxPriceInput}
              onChange={(e) => {
                handleFormChange('maxPriceInput', e);
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={filterProducts}
            type="submit"
          >
            Aplicar
          </Button>
          <Button onClick={() => closeModal()} variant="outline">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
