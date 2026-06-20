"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionary, Dictionary, Language } from "@/lib/dictionary";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  dict: Dictionary;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.body.classList.add("light-theme");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  };

  const dict = dictionary[lang];

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, dict }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
