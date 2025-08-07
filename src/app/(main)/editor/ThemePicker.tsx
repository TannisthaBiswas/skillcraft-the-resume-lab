"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseCustomizations } from "@/lib/permissions";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
import { ThemeName, themes } from "@/lib/themes";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData type
import { Check, Lock, LayoutGrid } from "lucide-react"; // Import LayoutGrid icon

// --- IMPORT EACH THUMBNAIL IMAGE DIRECTLY ---
// These paths use the alias "@/assets" which should resolve to your src/assets directory.
// Ensure your image filenames match the case here (e.g., Classic.png, Modern.png, Elegant.png).
import ClassicThumbnail from "@/assets/theme-previews/Classic.png"; // Renamed for clarity: Classic -> ClassicThumbnail
import ModernThumbnail from "@/assets/theme-previews/Modern.png";   // Renamed for clarity: Modern -> ModernThumbnail
import ElegantThumbnail from "@/assets/theme-previews/Elegant.png"; // Renamed for clarity: Elegant -> ElegantThumbnail

interface ThemePickerProps {
  theme: ThemeName | undefined;
  onChange: (theme: ThemeName) => void;
}

// Define the type for a single theme's metadata entry
interface ThemeMetaConfig {
  free: boolean;
  thumbnail: StaticImageData;
}

// HARDCODED THEME METADATA - uses lowercase keys to match themes.ts
// and the imported StaticImageData objects for thumbnails.
const themeMetadata: Record<ThemeName, ThemeMetaConfig> = {
  classic: {
    free: true,
    thumbnail: ClassicThumbnail, // Use the imported image object
  },
  modern: {
    free: false,
    thumbnail: ModernThumbnail, // Use the imported image object
  },
  elegant: {
    free: false,
    thumbnail: ElegantThumbnail, // Use the imported image object
  },
  // Add metadata for any other themes here, ensuring lowercase keys
  // and corresponding imported image objects.
};

export default function ThemePicker({ theme, onChange }: ThemePickerProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  // allThemeNames will be ["elegant", "modern", "classic"] based on your themes.ts
  const allThemeNames = Object.keys(themes) as ThemeName[];

  const handleThemeSelect = (selectedThemeName: ThemeName) => {
    // Access the hardcoded metadata here
    const selectedThemeMeta = themeMetadata[selectedThemeName];
    const canCustomize = canUseCustomizations(subscriptionLevel);

    if (selectedThemeMeta && !selectedThemeMeta.free && !canCustomize) {
      // If trying to select a premium theme without subscription
      onChange("classic"); // Default to "classic" (lowercase)
      premiumModal.setOpen(true);
      return;
    }

    // If subscribed, or selecting a free theme, allow change
    onChange(selectedThemeName);
  };

  // Determine the displayed theme for the button: Always "classic" if not customizable, otherwise current or "classic"
  // const displayedButtonTheme = !canUseCustomizations(subscriptionLevel)
  //   ? "classic" // Default to "classic" (lowercase)
  //   : (theme || "classic"); // Fallback to "classic" (lowercase)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          title="Change theme"
          className="bg-white text-black hover:bg-gray-200 focus:ring-gray-700 px-4 py-2"
        >
          <LayoutGrid className="mr-2 h-4 w-4" /> {/* Changed to LayoutGrid icon */}
          Theme
          {/* : {displayedButtonTheme.charAt(0).toUpperCase() + displayedButtonTheme.slice(1)}{" "} */}
          {/* Capitalize for display */}
        </Button>
      </PopoverTrigger>
      {/* Popover content with increased width */}
      <PopoverContent className="w-96 p-3">
        {" "}
        {/* Increased from w-80 to w-96 */}
        <div className="mb-2 text-center">
          <p className="text-lg font-bold">Select Theme</p>
          <p className="text-sm text-gray-500">
            Choose a layout that fits your style.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {" "}
          {/* Grid for images, scrollable */}
          {allThemeNames.map((themeName) => {
            // Access the hardcoded metadata for rendering
            const currentThemeMeta = themeMetadata[themeName];

            // Basic check if metadata exists for the theme (should for themes defined above)
            if (!currentThemeMeta) return null; // Or handle error gracefully

            const isCurrent = themeName === theme;
            const isPremiumTheme = !currentThemeMeta.free; // Determine premium status from metadata
            const isLocked = isPremiumTheme && !canUseCustomizations(subscriptionLevel);

            return (
              <div
                key={themeName}
                className={`relative border-2 p-1 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    isCurrent
                      ? "border-purple-500 ring-2 ring-purple-500"
                      : "border-gray-200 hover:border-purple-300"
                  }
                  ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                onClick={() => handleThemeSelect(themeName)}
              >
                {/* Thumbnail Image Container */}
                <div className="aspect-[3/4] w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
                  {currentThemeMeta.thumbnail ? (
                    <Image
                      src={currentThemeMeta.thumbnail}
                      alt={`${themeName} Theme Preview`}
                      width={170} // Increased from 150
                      height={227} // Increased from 200 (maintaining 3:4 aspect ratio)
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No preview</span>
                  )}
                </div>

                {/* Theme Name (Capitalized for display only) */}
                <p
                  className={`mt-2 text-center text-sm font-medium ${
                    isCurrent ? "text-purple-600" : "text-gray-800"
                  }`}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </p>

                {/* Status Icons */}
                {isLocked && (
                  <div className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1">
                    <Lock className="h-3 w-3" />
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-2 left-2 bg-purple-500 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}