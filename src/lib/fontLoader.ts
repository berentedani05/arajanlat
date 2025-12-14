// Helper function to replace Hungarian special characters for PDF
// jsPDF has limited Unicode support, so we replace ő→ö and ű→ü
export function hungarianText(text: string): string {
  return text
    .replace(/ő/g, "ö")
    .replace(/Ő/g, "Ö")
    .replace(/ű/g, "ü")
    .replace(/Ű/g, "Ü");
}