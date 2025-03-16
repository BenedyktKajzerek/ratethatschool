import Image from "next/image";
import React from "react";

const STEPS = [
  {
    name: "Select role",
    description: "Choose school connection",
  },
  {
    name: "Rate school",
    description: "Evaluate key aspects",
  },
  {
    name: "Write review",
    description: "Add comment and photos",
  },
  {
    name: "Final check",
    description: "Complete your review",
  },
];

interface ProgressBarProps {
  currentStepIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
}) => {
  return (
    <>
      <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border lg:border-gray-200">
        {STEPS.map((step, i) => {
          const isCurrent = i === currentStepIndex;
          const isCompleted = i < currentStepIndex;
          const imgPath = `/step-${i + 1}.svg`;

          return (
            <li key={step.name} className="relative overflow-hidden lg:flex-1">
              <div>
                <span
                  className={`absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full ${isCurrent && "bg-blue-200"} ${isCompleted && "bg-primary"}`}
                />

                {/* Image with description */}
                <span className="flex items-center p-4 text-sm font-medium">
                  <span className="flex-shrink-0">
                    <Image
                      src={imgPath}
                      alt="Progress Image"
                      className="flex h-[70px] w-[70px] items-center justify-center object-contain"
                    />
                  </span>

                  <span className="ml-4 mt-0.5 flex h-full min-w-0 flex-col justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {step.name}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {step.description}
                    </span>
                  </span>
                </span>

                {/* separator */}
                {i !== 0 ? (
                  <div className="absolute inset-0 hidden w-3 lg:block">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 12 82"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.5 0V31L10.5 41L0.5 51V82"
                        stroke="currentcolor"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};
