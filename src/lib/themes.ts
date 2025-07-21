// export const themes = {
//   classic: {
//     background: "#ffffff",
//     text: "#000000",
//     sectionHeading: "#000000",
//     fontFamily: "Georgia, serif",
//   },
//   modern: {
//     background: "#f7f9fc",
//     text: "#1f2937",
//     sectionHeading: "#1d4ed8",
//     fontFamily: "Inter, sans-serif",
//   },
//   elegant: {
//     background: "#fffdf8",
//     text: "#333333",
//     sectionHeading: "#b91c1c",
//     fontFamily: "'Times New Roman', serif",
//   },
// };

// export type ThemeName = keyof typeof themes;

// src/lib/themes.ts

import { FC } from "react";
import { ResumeValues } from "@/lib/validation";

// Import your future theme components
import ElegantTheme from "@/components/themes/ElegantTheme";
import ModernTheme from "@/components/themes/ModernTheme";
import ClassicTheme from "@/components/themes/ClassicTheme";

export interface ThemeProps {
 resumeData: ResumeValues;
}

export const themes: Record<string, FC<ThemeProps>> = {
 elegant: ElegantTheme,
 modern: ModernTheme,
 classic: ClassicTheme,
};

export type ThemeName = keyof typeof themes;