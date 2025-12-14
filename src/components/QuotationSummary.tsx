import { Calculator, Receipt } from "lucide-react";

interface QuotationSummaryProps {
  net: number;
  vat: number;
  gross: number;
}

export function QuotationSummary({ net, gross }: QuotationSummaryProps) {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Calculator className="h-5 w-5 text-primary" />
        Összesítés
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nettó összeg</span>
          <span className="font-mono font-semibold text-foreground">
            {net.toLocaleString("hu-HU")} Ft
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ÁFA</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <Receipt className="h-3 w-3" />
            Alanyi adómentes
          </span>
        </div>
        
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Fizetendő</span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-mono text-2xl font-bold text-transparent">
            {gross.toLocaleString("hu-HU")} Ft
          </span>
        </div>
      </div>
    </div>
  );
}
