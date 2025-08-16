import OCRReader from "@/lib/OCRReader";
import { FileText } from "lucide-react";

export default function EnglishOCR() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <FileText className="w-8 h-8" />
          <h2 className="text-3xl font-extrabold">English Text Extractor</h2>
        </div>
        <p className="mt-2 text-gray-600 max-w-xl">
          Upload an image containing English text, and our OCR tool will extract it for you.  
          Copy and use it instantly with one click.
        </p>
      </div>

      {/* OCR Component */}
      <OCRReader lang="eng" />
    </div>
  );
}
