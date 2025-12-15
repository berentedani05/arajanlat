import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package } from "lucide-react";

export interface MaterialType {
  id: string;
  name: string;
  pricePerGram: number;
}

export const MATERIAL_TYPES: MaterialType[] = [
  { id: "pla", name: "PLA", pricePerGram: 15 },
  { id: "petg", name: "PETG", pricePerGram: 18 },
  { id: "abs", name: "ABS", pricePerGram: 20 },
  { id: "tpu", name: "TPU (Flexibilis)", pricePerGram: 30 },
  { id: "asa", name: "ASA", pricePerGram: 120 },
  { id: "nylon", name: "Nylon", pricePerGram: 200 },
  { id: "carbon", name: "Carbon fiber PLA", pricePerGram: 250 },
  { id: "wood", name: "Wood PLA", pricePerGram: 130 },
  { id: "custom", name: "Egyéni", pricePerGram: 0 },
];

interface MaterialSelectorProps {
  selectedMaterial: string;
  setSelectedMaterial: (value: string) => void;
  onMaterialChange: (pricePerGram: number) => void;
}

export function MaterialSelector({
  selectedMaterial,
  setSelectedMaterial,
  onMaterialChange,
}: MaterialSelectorProps) {
  const handleMaterialChange = (materialId: string) => {
    setSelectedMaterial(materialId);
    const material = MATERIAL_TYPES.find((m) => m.id === materialId);
    if (material && material.id !== "custom") {
      onMaterialChange(material.pricePerGram);
    }
  };

  const selectedMaterialData = MATERIAL_TYPES.find(
    (m) => m.id === selectedMaterial
  );

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/10">
          <Package className="h-4 w-4 text-secondary" />
        </div>
        Anyagtípus
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Válassz anyagot
        </Label>
        <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Válassz anyagtípust" />
          </SelectTrigger>
          <SelectContent>
            {MATERIAL_TYPES.map((material) => (
              <SelectItem key={material.id} value={material.id}>
                <div className="flex items-center justify-between gap-4">
                  <span>{material.name}</span>
                  {material.id !== "custom" && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {material.pricePerGram} Ft/g
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedMaterialData && selectedMaterialData.id !== "custom" && (
          <p className="text-xs text-muted-foreground">
            Javasolt egységár:{" "}
            <span className="font-mono font-semibold text-foreground">
              {selectedMaterialData.pricePerGram} Ft/g
            </span>
          </p>
        )}
        {selectedMaterial === "custom" && (
          <p className="text-xs text-muted-foreground">
            Add meg az egyéni egységárat az Anyagköltség mezőben
          </p>
        )}
      </div>
    </div>
  );
}
