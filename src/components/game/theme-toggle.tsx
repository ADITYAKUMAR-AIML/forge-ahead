import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  withLabel = false,
}: {
  className?: string;
  withLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const label = isLight ? "Switch to night theme" : "Switch to day theme";

  return (
    <Button
      type="button"
      variant="outline"
      size={withLabel ? "sm" : "icon"}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(className)}
    >
      {isLight ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
      {withLabel && <span>{isLight ? "Night" : "Day"}</span>}
    </Button>
  );
}
