import { Link, useLocation } from "react-router-dom";
import { LuBookOpenText } from "react-icons/lu";
import ToggleDarkAndLightModeButton from "@/components/ToggleDarkAndLightModeButton/ToggleDarkAndLightModeButton";
import Testlanguges from "@/components/LangugeButton/LangugeButton";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
          <LuBookOpenText className="text-blue-600 dark:text-blue-400 text-2xl" />
          <span className="tracking-tight">OCR App</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 text-sm font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive("/")
                ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Home
          </Link>
        </nav>

        {/* Controls (Dark Mode + Language) */}
        <div className="flex items-center gap-3">
          <ToggleDarkAndLightModeButton />
          <Testlanguges />
        </div>
      </div>
    </header>
  );
};

export default Header;
