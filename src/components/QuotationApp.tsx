import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuotationForm } from "./QuotationForm";
import { QuotationSummary } from "./QuotationSummary";
import { CustomerForm } from "./CustomerForm";
import { MaterialSelector, MATERIAL_TYPES } from "./MaterialSelector";
import { FileDown, Printer } from "lucide-react";
import jsPDF from "jspdf";
import { hungarianText } from "@/lib/fontLoader";

export default function QuotationApp() {
  // Customer data
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  // Material
  const [selectedMaterial, setSelectedMaterial] = useState("pla");
  const [materialCost, setMaterialCost] = useState(80);
  const [machineRatePerMinute, setMachineRatePerMinute] = useState(60);
  const [grams, setGrams] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [modelingFee, setModelingFee] = useState(0);
  const [postProcess, setPostProcess] = useState(0);

  const selectedMaterialData = MATERIAL_TYPES.find(
    (m) => m.id === selectedMaterial
  );

  const net =
    grams * materialCost +
    minutes * machineRatePerMinute +
    modelingFee +
    postProcess;
  const vat = 0;
  const gross = net;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Helper for Hungarian text (ő→ö, ű→ü)
    const h = hungarianText;

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(h("3D Nyomtatási Árajánlat"), 20, 23);

    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString("hu-HU");
    doc.text(`Dátum: ${today}`, 160, 23);

    // Reset text color
    doc.setTextColor(30, 41, 59);

    // Customer info
    let yPos = 50;
    
    if (customerName || customerEmail || customerPhone || customerAddress) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(h("Ügyfél adatok"), 20, yPos);
      yPos += 8;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      
      if (customerName) {
        doc.text(`Név: ${h(customerName)}`, 20, yPos);
        yPos += 6;
      }
      if (customerEmail) {
        doc.text(`Email: ${customerEmail}`, 20, yPos);
        yPos += 6;
      }
      if (customerPhone) {
        doc.text(`Telefon: ${customerPhone}`, 20, yPos);
        yPos += 6;
      }
      if (customerAddress) {
        doc.text(`Cím: ${h(customerAddress)}`, 20, yPos);
        yPos += 6;
      }
      yPos += 10;
    }

    // Item info
    if (itemName) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Megrendelt tárgy", 20, yPos);
      yPos += 8;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Tárgy: ${h(itemName)}`, 20, yPos);
      yPos += 6;
      doc.text(`Darabszám: ${itemQuantity} db`, 20, yPos);
      yPos += 16;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(h("Költségbontás"), 20, yPos);
    yPos += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Material type and cost
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(20, yPos - 5, 170, 12, 2, 2, "F");
    doc.text(`Anyag (${h(selectedMaterialData?.name || "Egyéni")}):`, 25, yPos + 3);
    doc.text(`${grams} g × ${materialCost} Ft = ${(grams * materialCost).toLocaleString("hu-HU")} Ft`, 90, yPos + 3);
    yPos += 18;

    // Machine time
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(20, yPos - 5, 170, 12, 2, 2, "F");
    doc.text(h("Gépidő:"), 25, yPos + 3);
    doc.text(`${minutes} perc × ${machineRatePerMinute} Ft = ${(minutes * machineRatePerMinute).toLocaleString("hu-HU")} Ft`, 80, yPos + 3);
    yPos += 18;

    // Modeling
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(20, yPos - 5, 170, 12, 2, 2, "F");
    doc.text("3D modellezés:", 25, yPos + 3);
    doc.text(`${modelingFee.toLocaleString("hu-HU")} Ft`, 80, yPos + 3);
    yPos += 18;

    // Post-processing
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(20, yPos - 5, 170, 12, 2, 2, "F");
    doc.text("Utómunka:", 25, yPos + 3);
    doc.text(`${postProcess.toLocaleString("hu-HU")} Ft`, 80, yPos + 3);
    yPos += 25;

    // Separator line
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 15;

    // Summary
    doc.setFontSize(12);
    doc.text(h("Nettó végösszeg:"), 20, yPos);
    doc.setFont("helvetica", "bold");
    doc.text(`${net.toLocaleString("hu-HU")} Ft`, 140, yPos, { align: "right" });
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.text("ÁFA (Alanyi adómentes):", 20, yPos);
    doc.text("0 Ft", 140, yPos, { align: "right" });
    yPos += 15;

    // Total box
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(20, yPos - 5, 170, 18, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(h("Fizetendő összesen:"), 25, yPos + 7);
    doc.text(`${gross.toLocaleString("hu-HU")} Ft`, 185, yPos + 7, { align: "right" });

    yPos += 35;

    // Footer note
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Az árak alanyi adómentesek, az ÁFA-t nem tartalmazzák az Áfa tv. 187. § alapján.",
      20,
      yPos,
      { maxWidth: 170 }
    );

    doc.save("3d_nyomtatas_arajanlat.pdf");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Printer className="h-4 w-4" />
            3D Nyomtatás
          </div>
          <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            Árajánlat Készítő
          </h1>
          <p className="mt-2 text-muted-foreground">
            Kalkuláld ki a 3D nyomtatási költségeket egyszerűen
          </p>
        </div>

        {/* Main Card */}
        <Card className="animate-scale-in overflow-hidden border-0 shadow-card">
          <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-button">
                <Printer className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Költségkalkulátor</h2>
                <p className="text-sm text-muted-foreground">Add meg a nyomtatás paramétereit</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <CustomerForm
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerEmail={customerEmail}
              setCustomerEmail={setCustomerEmail}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              customerAddress={customerAddress}
              setCustomerAddress={setCustomerAddress}
              itemName={itemName}
              setItemName={setItemName}
              itemQuantity={itemQuantity}
              setItemQuantity={setItemQuantity}
            />

            <MaterialSelector
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              onMaterialChange={setMaterialCost}
            />

            <QuotationForm
              materialCost={materialCost}
              setMaterialCost={setMaterialCost}
              grams={grams}
              setGrams={setGrams}
              machineRatePerMinute={machineRatePerMinute}
              setMachineRatePerMinute={setMachineRatePerMinute}
              minutes={minutes}
              setMinutes={setMinutes}
              modelingFee={modelingFee}
              setModelingFee={setModelingFee}
              postProcess={postProcess}
              setPostProcess={setPostProcess}
            />

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <QuotationSummary net={net} vat={vat} gross={gross} />

            <Button
              onClick={generatePDF}
              className="mt-6 w-full gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-button transition-all hover:opacity-90 hover:shadow-lg"
              size="lg"
            >
              <FileDown className="h-5 w-5" />
              PDF Árajánlat Letöltése
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Alanyi adómentes vállalkozás – ÁFA tv. 187. §
        </p>
      </div>
    </div>
  );
}
