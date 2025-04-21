import Image from "next/image";
import { DescriptionProps } from "../type";

const TutorialDescription = ({
  title,
  description,
  image,
  currentStep,
  onClick,
  buttonName,
}: DescriptionProps) => {
  return (
    <div
      className={`flex h-screen flex-col justify-center ${currentStep !== 3 ? "bg-white" : "bg-primary-50"} px-5 py-10 font-pretendard`}
    >
      <div className="flex flex-col items-center gap-5 overflow-y-auto">
        {currentStep !== 3 ? (
          <>
            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="whitespace-pre-line text-center text-sm text-[#898989]">
              {description}
            </p>

            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={236}
              height={479}
              className="object-contain"
            />
          </>
        ) : (
          <div className="my-32 flex flex-col items-center">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={140}
              height={140}
              className="object-contain"
            />
            <div className="flex flex-col items-center py-8">
              <h1 className="my-4 text-3xl font-bold">{title}</h1>

              <p className="whitespace-pre-line text-center text-sm text-[#898989]">
                {description}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 w-2 rounded-full ${currentStep === step ? "bg-primary-700" : "bg-grey-1"}`}
            />
          ))}
        </div>

        <button
          onClick={onClick}
          className="w-full rounded-2xl bg-primary-100 py-5 text-lg font-bold text-primary-800"
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default TutorialDescription;
