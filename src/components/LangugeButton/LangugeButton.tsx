import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoLanguageOutline } from "react-icons/io5";

const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "ar", label: "العربية", dir: "rtl", flag: "🇪🇬" },
];

export default function LanguageButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const changeLang = (lng: string) => {
    const selectedLang = LANGUAGES.find((l) => l.code === lng);
    i18n.changeLanguage(lng);
    setIsOpen(false);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.dir;
    }
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync direction
  useEffect(() => {
    const savedLang = i18n.language;
    const selectedLang = LANGUAGES.find((l) => l.code === savedLang);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.dir;
    }
  }, [i18n.language]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 
                   bg-gray-50 hover:bg-gray-100 shadow-sm transition 
                   dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
      >
        <IoLanguageOutline className="text-lg" />
        <span>
          {currentLang.flag} {currentLang.label}
        </span>
        <FaChevronDown
          className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/10 z-50 overflow-hidden"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang.code)}
                className={`w-full px-4 py-2 flex items-center gap-2 text-sm transition
                  ${lang.code === currentLang.code
                    ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  } dark:text-gray-200`}
              >
                <span>{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
