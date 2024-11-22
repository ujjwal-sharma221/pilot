import { Circle, Square, Squircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BorderSytleButtoProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQCIRCLE: "sqircle",
};

const borderStyles = Object.values(BorderStyles);

export function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderSytleButtoProps) {
  const handleClick = () => {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;

    onChange(borderStyles[nextIndex]);
  };

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
