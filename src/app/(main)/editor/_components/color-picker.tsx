import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { SprayCan } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSubscriptionPlan } from "@/providers/subscripton-plan-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { enableCustomisations } from "@/lib/permissions";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  const subscriptionType = useSubscriptionPlan();
  const premiumModal = usePremiumModal();

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          className=""
          variant="outline"
          size="icon"
          title="Change resume color"
          onClick={() => {
            if (!enableCustomisations(subscriptionType)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
        >
          <SprayCan className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
}
