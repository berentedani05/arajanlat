import jsPDF from "jspdf";

// Convert TTF font to base64 for jsPDF
export async function loadRobotoFont(doc: jsPDF): Promise<void> {
  try {
    const fontUrl = new URL("../assets/fonts/Roboto-Regular.ttf", import.meta.url).href;
    const response = await fetch(fontUrl);
    const arrayBuffer = await response.arrayBuffer();
    
    // Convert to base64
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    
    // Add font to jsPDF
    doc.addFileToVFS("Roboto-Regular.ttf", base64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
  } catch (error) {
    console.error("Error loading Roboto font:", error);
    // Fallback to Helvetica
    doc.setFont("helvetica");
  }
}
