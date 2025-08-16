import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  const cards = [
    { title: t("arabicExtractor"), path: "/arabic", color: "from-green-400 to-green-600" },
    { title: t("englishExtractor"), path: "/english", color: "from-blue-400 to-blue-600" },
    { title: t("cvExtractor"), path: "/cv-extractor", color: "from-purple-400 to-purple-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-gray-50 to-gray-100 
                    dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold 
                       text-gray-800 dark:text-white mb-4 
                       bg-clip-text text-transparent 
                       bg-gradient-to-r from-blue-600 to-green-600">
          {t("ocrToolsTitle")}
        </h1>
        <h2 className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300">
          {t("nametitle")}
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t("para")}
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <Link
              to={card.path}
              className={`bg-gradient-to-br ${card.color} text-white p-8 
                          rounded-2xl shadow-lg flex flex-col items-center 
                          justify-center text-center h-40`}
            >
              <h2 className="text-2xl font-bold">{card.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} OCR Tools – {t("allRightsReserved")}
      </footer>
    </div>
  );
}
