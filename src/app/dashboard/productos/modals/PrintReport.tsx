import { useCategory } from "@/app/context/useCategory";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function PrintReport({ title, print, open, onOpenChange }: { title: string, print: any, open: boolean, onOpenChange: any }) {
    const { categories } = useCategory();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedItems((prevSelectedItems) =>
            checked
                ? [...prevSelectedItems, id]
                : prevSelectedItems.filter((itemId) => itemId !== id)
        );
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        print(selectedItems);
    };

    const handleSelectAll = () => {
        const allCategoryIds = categories.map((category: { id: string }) => category.id);
        setSelectedItems(allCategoryIds);
    };

    const close = () => {
        setSelectedItems([]);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                        {categories.map((item: { id: string, name: string }) => (
                            <div key={item.id} className="flex flex-row items-start gap-3">
                                <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked)}
                                />
                                <label className="text-sm font-normal">{item.name}</label>
                            </div>
                        ))}
                        <Button onClick={handleSelectAll} type="button" >Todos</Button>
                </form>
                <DialogFooter>
                <Button onClick={onSubmit}>Imprimir</Button>
            </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
