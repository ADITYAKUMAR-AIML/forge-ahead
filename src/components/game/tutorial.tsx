import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const TUTORIAL_KEY = "hm-tutorial-complete";

type TutorialStep = {
  title: string;
  description: string;
  target?: string;
};

const steps: TutorialStep[] = [
  {
    title: "Welcome to your empire",
    description:
      "This quick tour shows you what everything does. Your goal is simple: grow your cash, reputation, income, and net worth without running your empire into the ground.",
  },
  {
    title: "Read your vital numbers",
    description:
      "This strip tracks the current day, lifestyle, reputation, cash, bank balance, net worth, and market condition. Check it before every major purchase.",
    target: "status",
  },
  {
    title: "Move around the game",
    description:
      "Use navigation to build your collection, buy businesses and property, trade stocks, place investments, review events, and manage your save. On a phone, this button opens the full menu.",
    target: "navigation",
  },
  {
    title: "Make the numbers climb",
    description:
      "Businesses create recurring income. Stocks and investments can grow or lose money. Properties and assets increase your holdings, while collection entries raise reputation and unlock higher tiers.",
    target: "overview",
  },
  {
    title: "Advance the simulation",
    description:
      "Advance day collects income, charges expenses, moves markets, progresses investments, and may trigger an event. Buy what you need first—then press it when you are ready.",
    target: "advance-day",
  },
  {
    title: "You are ready",
    description:
      "Start with the catalogue or a low-cost business, keep enough cash for expenses, and return here to watch your fortune grow. You can now begin playing.",
  },
];

type Highlight = {
  top: number;
  left: number;
  size: number;
};

function visibleTarget(name: string) {
  return Array.from(document.querySelectorAll<HTMLElement>(`[data-tutorial="${name}"]`)).find(
    (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    },
  );
}

export function FirstVisitTutorial() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const step = steps[stepIndex];

  useEffect(() => {
    try {
      setOpen(localStorage.getItem(TUTORIAL_KEY) !== "true");
    } catch {
      setOpen(true);
    }
  }, []);

  const positionHighlight = useCallback(() => {
    if (!open || !step?.target) {
      setHighlight(null);
      return;
    }

    const target = visibleTarget(step.target);
    if (!target) {
      setHighlight(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const size = Math.min(Math.max(rect.width, rect.height) + 24, window.innerWidth - 24);
    setHighlight({
      top: Math.max(12, Math.min(rect.top + rect.height / 2 - size / 2, window.innerHeight - size - 12)),
      left: Math.max(12, Math.min(rect.left + rect.width / 2 - size / 2, window.innerWidth - size - 12)),
      size,
    });
  }, [open, step?.target]);

  useLayoutEffect(() => {
    if (!open || !step?.target) return;
    const target = visibleTarget(step.target);
    target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    const timer = window.setTimeout(positionHighlight, 280);
    window.addEventListener("resize", positionHighlight);
    window.addEventListener("scroll", positionHighlight, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", positionHighlight);
      window.removeEventListener("scroll", positionHighlight, true);
    };
  }, [open, positionHighlight, step?.target]);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "ArrowRight") setStepIndex((current) => Math.min(current + 1, steps.length - 1));
      if (event.key === "ArrowLeft") setStepIndex((current) => Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function finish() {
    try {
      localStorage.setItem(TUTORIAL_KEY, "true");
    } catch {
      // The tour still closes when browser storage is unavailable.
    }
    setOpen(false);
  }

  if (!open || !step) return null;

  const finalStep = stepIndex === steps.length - 1;
  const arrowPointsDown = highlight ? highlight.top < window.innerHeight / 2 : false;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div className="absolute inset-0" aria-hidden />
      {highlight ? (
        <>
          <div
            className="tutorial-spotlight"
            style={{
              top: highlight.top,
              left: highlight.left,
              width: highlight.size,
              height: highlight.size,
            }}
            aria-hidden
          />
          <div
            className="tutorial-arrow"
            style={{
              top: arrowPointsDown ? highlight.top + highlight.size + 10 : highlight.top - 42,
              left: highlight.left + highlight.size / 2 - 14,
            }}
            aria-hidden
          >
            {arrowPointsDown ? <ArrowDown /> : <ArrowUp />}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px]" aria-hidden />
      )}

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-description"
        tabIndex={-1}
        className="tutorial-card"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase text-magenta">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <Button variant="ghost" size="icon" onClick={finish} aria-label="Skip tutorial">
            <X aria-hidden />
          </Button>
        </div>
        <h2 id="tutorial-title" className="mt-2 text-2xl text-foreground">
          {step.title}
        </h2>
        <p id="tutorial-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={finish}>Skip</Button>
          <div className="flex gap-2">
            {stepIndex > 0 ? (
              <Button variant="outline" size="sm" onClick={() => setStepIndex(stepIndex - 1)}>
                <ChevronLeft aria-hidden /> Back
              </Button>
            ) : null}
            <Button
              size="sm"
              onClick={() => (finalStep ? finish() : setStepIndex(stepIndex + 1))}
            >
              {finalStep ? <Check aria-hidden /> : null}
              {finalStep ? "Begin" : "Continue"}
              {!finalStep ? <ChevronRight aria-hidden /> : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}