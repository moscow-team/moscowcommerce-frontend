import { Checkbox } from "@/components/ui/checkbox";
import { useEcommerce } from "@/app/context/useEcommerce";

interface CategoryFilterProps {
  onCategoryChange: (selectedCategories: number[]) => void;
}

export function CheckboxReactHookFormMultiple({ onCategoryChange }: CategoryFilterProps) {
  const { categories } = useEcommerce();

  const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
    onCategoryChange(
      isChecked
        ? (prev) => [...prev, categoryId]
        : (prev) => prev.filter((id) => id !== categoryId)
    );
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category.id}`}
            onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
          />
          <label
            htmlFor={`category-${category.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}

