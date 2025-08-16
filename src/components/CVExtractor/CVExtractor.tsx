import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function CVExtractor() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Convert PDF pages → canvas
  async function pdfToImages(file: File): Promise<HTMLCanvasElement[]> {
    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    const pages: HTMLCanvasElement[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport :any = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context :any  = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport, canvas }).promise;
      pages.push(canvas);
    }
    return pages;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setInfo(null);

    try {
      let text = "";

      if (file.type === "application/pdf") {
        const pages = await pdfToImages(file);
        for (const [i, canvas] of pages.entries()) {
          const { data: { text: pageText } } = await Tesseract.recognize(canvas, "eng");
          text += `\n--- Page ${i + 1} ---\n${pageText}`;
        }
      } else {
        const { data: { text: imgText } } = await Tesseract.recognize(file, "eng");
        text = imgText;
      }

      const nameRegex = /(Name|Full Name)[:：]?\s*(.+)/i;
      const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
      const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{10,15}/;
 // 🔍 Regex patterns
     const  experience= /(Experience|Work Experience|Employment)[\s\S]*?(?=(Education|Skills|Training|Soft Skills|Personal|$))/i
     const education= /(Education|Qualifications)[\s\S]*?(?=(Experience|Skills|Training|Soft Skills|Personal|$))/i
      const skills= /(Skills|Technical Skills)[\s\S]*?(?=(Experience|Education|Training|Soft Skills|Personal|$))/i
    const  training= /(Training|Certifications)[\s\S]*?(?=(Experience|Education|Skills|Soft Skills|Personal|$))/i
    const  softSkills= /(Soft Skills|Languages|Interpersonal)[\s\S]*?(?=(Experience|Education|Skills|Training|Personal|$))/i
    const  personal= /(Personal Information|Details)[\s\S]*?(?=(Experience|Education|Skills|Training|Soft Skills|$))/i
    
      const linkRegex = /(https?:\/\/[^\s]+)/gim;

      // Section matchers
      const extractSection = (title: any, text: string) => {
        const regex = new RegExp(`${title}[:\\-\\s]*([\\s\\S]*?)(?=\\n[A-Z][a-zA-Z ]{2,}:|$)`, "i");
        return text.match(regex)?.[1]?.trim() || "Not found";
      };
      setInfo({
        name: text.match(nameRegex)?.[2] || "Not found",
        email: text.match(emailRegex)?.[0] || "Not found",
        phone: text.match(phoneRegex)?.[0] || "Not found",
         experience: extractSection('EXPERIENCE', text),
        education: text.match('education')?.[0] || "Not found",
        skills: extractSection("Skills", text),
        training: extractSection("Training", text),
        softSkills: extractSection("Soft Skills", text),
        personalInfo: extractSection("Personal Information", text),
        links: text.match(linkRegex) || [],
        fullText: text,
      });
    } catch (err: any) {
      console.error("OCR Error:", err);
      setInfo({
        name: "Error",
        email: "Error",
        phone: "Error",
        fullText: `❌ OCR failed: ${err.message || err}`,
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        CV Info Extractor
      </h2>

      {/* Upload box */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
          id="cv-upload"
        />
        <label
          htmlFor="cv-upload"
          className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Upload CV (PDF / Image)
        </label>
        <p className="mt-2 text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
      </div>

      {loading && (
        <p className="text-blue-600 mt-6 text-center font-medium">
          ⏳ Processing CV, please wait...
        </p>
      )}

      {info && (
        <div className="mt-6 bg-white shadow rounded-xl p-6 space-y-3">
          <p><strong>Name:</strong> {info.name}</p>
          <p><strong>Email:</strong> {info.email}</p>
          <p><strong>Phone:</strong> {info.phone}</p>
          <p><strong>links:</strong> {info.links}</p>

          <details className="mt-4">
            <summary className="cursor-pointer text-blue-600 font-medium">
              Show Full Extracted Text
            </summary>
            <pre className="bg-gray-100 p-3 rounded mt-2 whitespace-pre-wrap text-sm">
              {info.fullText}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
