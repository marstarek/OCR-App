import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { motion } from "framer-motion";
import { Copy, Check, Upload } from "lucide-react";

type Props = { lang: "ara" | "eng" };

export default function OCRReader({ lang }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setText("");
    setCopied(false);

    try {
      const { data: { text } } = await Tesseract.recognize(file, lang);
      setText(text);
    } catch (err) {
      console.error(err);
      setText("❌ Error extracting text.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
      {/* Upload Button */}
      <label className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow-lg hover:scale-105 transition transform">
        <Upload className="w-5 h-5" />
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Loading State */}
      {loading && (
        <motion.p
          className="text-blue-600 mt-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ⏳ Processing image...
        </motion.p>
      )}

      {/* Extracted Text */}
      {text && (
        <motion.div
          className="mt-6 w-full max-w-2xl bg-white p-4 rounded-2xl shadow-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm">
            {text}
          </pre>

          <button
            onClick={handleCopy}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy to Clipboard
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
