import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Mail } from "lucide-react";
import elevateLogo from "@/assets/why-elevate-logo.svg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-background flex flex-col items-center justify-center px-6"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#F3F5FF] blur-3xl" />
      </div>

      {/* Logo */}
      <motion.img
        src={elevateLogo}
        alt="Elevate"
        className="h-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-2xl w-full text-center">
        {/* Big 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-[8rem] md:text-[12rem] leading-none font-bold bg-gradient-to-br from-primary via-primary to-primary/40 bg-clip-text text-transparent select-none"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4"
        >
          הדף שחיפשת לא נמצא
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2"
        >
          ייתכן שהקישור שגוי, או שההצעה שאתה מנסה לפתוח כבר לא זמינה.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm md:text-base text-muted-foreground mb-10"
        >
          אם קיבלת קישור להצעה, ודא שהעתקת אותו במלואו. אחרת — צור איתנו קשר ונשמח לעזור.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="https://elevate.co.il"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            לאתר Elevate
          </a>
          <a
            href="mailto:info@elevate.co.il"
            className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
          >
            <Mail className="h-4 w-4" />
            צור קשר
          </a>
        </motion.div>

        {/* Path display */}
        {location.pathname && location.pathname !== "/" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 text-xs text-muted-foreground/70 font-mono"
            dir="ltr"
          >
            {location.pathname}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default NotFound;
