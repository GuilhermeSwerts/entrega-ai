export type StepConfig<T extends string> = {
    key: T;
    label: string;
    hidden?: boolean;
};

type StepperProps<T extends string> = {
    steps: StepConfig<T>[];
    currentStep: T;
};

const Stepper = <T extends string>({
    steps,
    currentStep,
}: StepperProps<T>) => {
    const currentIndex = steps.findIndex(
        (step) => step.key === currentStep
    );

    return (
        <div className="flex items-center  justify-between md:justify-center flex-row w-full gap-1">
            {steps.filter(x => !x.hidden).map((step, index) => {
                const isActive = step.key === currentStep;
                const isCompleted = index < currentIndex;

                return (
                    <div key={step.key} className="flex flex-col md:flex-row items-center gap-1">
                        {/* Círculo */}
                        <div
                            className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2
                ${isCompleted
                                    ? "bg-gray-500 border-gray-500 text-white"
                                    : isActive
                                        ? "border-gray-500 text-gray-500"
                                        : "border-gray-300 text-gray-300"
                                }
              `}
                        >
                            {isCompleted && "✓"}
                        </div>

                        {/* Label */}
                        <span
                            className={`text-sm font-medium ${isActive
                                ? "text-gray-500"
                                : isCompleted
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                        >
                            {step.label}
                        </span>

                        {/* Linha */}
                        {index < steps.filter(x => !x.hidden).length - 1 && (
                            <div className="w-15 hidden md:block border-t border-dashed border-gray-300 mx-2" />
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;
