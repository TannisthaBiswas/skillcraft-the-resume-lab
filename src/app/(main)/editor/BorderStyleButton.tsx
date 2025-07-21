import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseCustomizations } from "@/lib/permissions";
import { Circle, Square, Squircle } from "lucide-react";
import { useSubscriptionLevel } from "../SubscriptionLevelProvider";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  function handleClick() {
    if (!canUseCustomizations(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
   <Button
      // Remove size="icon" to allow content to dictate width, and make it rectangular
      title="Change border style"
      onClick={handleClick}
      className="bg-white text-black hover:bg-gray-200 focus:ring-gray-700 px-4 py-2" // Added px-4 py-2 for padding
    >
      <Icon className="size-5 mr-2" /> {/* Added mr-2 for spacing between icon and text */}
      Border Style
    </Button>
  );
}
