import { ReactElement, useState } from "react";

export default function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Go to the next step
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;

      return i + 1;
    });
  }

  // Go to the previous step
  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;

      return i - 1;
    });
  }

  // Go to the * step
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    goTo,
  };
}
