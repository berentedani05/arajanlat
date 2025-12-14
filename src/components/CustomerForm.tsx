import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface CustomerFormProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerEmail: string;
  setCustomerEmail: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  customerAddress: string;
  setCustomerAddress: (value: string) => void;
}

export function CustomerForm({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
}: CustomerFormProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        Ügyfél adatok
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            Név
          </Label>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ügyfél neve"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            Email
          </Label>
          <Input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            Telefon
          </Label>
          <Input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="+36 xx xxx xxxx"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Cím
          </Label>
          <Textarea
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="Számlázási cím"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
