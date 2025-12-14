import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Layers, Clock, Palette, Wrench } from "lucide-react";

interface QuotationFormProps {
  materialCost: number;
  setMaterialCost: (value: number) => void;
  grams: number;
  setGrams: (value: number) => void;
  machineRatePerMinute: number;
  setMachineRatePerMinute: (value: number) => void;
  minutes: number;
  setMinutes: (value: number) => void;
  modelingFee: number;
  setModelingFee: (value: number) => void;
  postProcess: number;
  setPostProcess: (value: number) => void;
}

interface InputGroupProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const InputGroup = ({ icon, label, children }: InputGroupProps) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      {icon}
      {label}
    </Label>
    {children}
  </div>
);

export function QuotationForm({
  materialCost,
  setMaterialCost,
  grams,
  setGrams,
  machineRatePerMinute,
  setMachineRatePerMinute,
  minutes,
  setMinutes,
  modelingFee,
  setModelingFee,
  postProcess,
  setPostProcess,
}: QuotationFormProps) {
  return (
    <div className="space-y-6">
      {/* Material Section */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Layers className="h-4 w-4 text-primary" />
          </div>
          Anyagköltség
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup icon={null} label="Egységár (Ft/g)">
            <Input
              type="number"
              step={5}
              value={materialCost}
              onChange={(e) => setMaterialCost(+e.target.value)}
              className="font-mono"
            />
          </InputGroup>
          <InputGroup icon={null} label="Felhasznált anyag (g)">
            <Input
              type="number"
              value={grams}
              onChange={(e) => setGrams(+e.target.value)}
              className="font-mono"
            />
          </InputGroup>
        </div>
        <div className="mt-3 text-right text-sm text-muted-foreground">
          Részösszeg:{" "}
          <span className="font-mono font-semibold text-foreground">
            {(grams * materialCost).toLocaleString("hu-HU")} Ft
          </span>
        </div>
      </div>

      {/* Machine Time Section */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/10">
            <Clock className="h-4 w-4 text-secondary" />
          </div>
          Gépidő
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup icon={null} label="Gépdíj (Ft/perc)">
            <Input
              type="number"
              step={5}
              value={machineRatePerMinute}
              onChange={(e) => setMachineRatePerMinute(+e.target.value)}
              className="font-mono"
            />
          </InputGroup>
          <InputGroup icon={null} label="Nyomtatási idő (perc)">
            <Input
              type="number"
              step={5}
              value={minutes}
              onChange={(e) => setMinutes(+e.target.value)}
              className="font-mono"
            />
          </InputGroup>
        </div>
        <div className="mt-3 text-right text-sm text-muted-foreground">
          Részösszeg:{" "}
          <span className="font-mono font-semibold text-foreground">
            {(minutes * machineRatePerMinute).toLocaleString("hu-HU")} Ft
          </span>
        </div>
      </div>

      {/* Additional Services */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
              <Palette className="h-4 w-4 text-primary" />
            </div>
            3D Modellezés
          </div>
          <Input
            type="number"
            step={500}
            value={modelingFee}
            onChange={(e) => setModelingFee(+e.target.value)}
            className="font-mono"
            placeholder="0"
          />
          <div className="mt-2 text-right text-xs text-muted-foreground">Ft</div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/10">
              <Wrench className="h-4 w-4 text-secondary" />
            </div>
            Utómunka
          </div>
          <Input
            type="number"
            step={500}
            value={postProcess}
            onChange={(e) => setPostProcess(+e.target.value)}
            className="font-mono"
            placeholder="0"
          />
          <div className="mt-2 text-right text-xs text-muted-foreground">Ft</div>
        </div>
      </div>
    </div>
  );
}
