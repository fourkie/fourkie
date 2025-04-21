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
    <div className="flex h-screen flex-col justify-between bg-white px-5 py-16">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 mt-2 text-3xl font-bold">{title}</h1>

        <div className="overflow-y-auto">
          <p className="whitespace-pre-line text-center text-lg text-[#898989]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <Image
          src={image}
          alt={image}
          width={306}
          height={306}
          className="object-contain"
        />
      </div>

      <div>
        <div className="my-10 flex justify-center gap-2">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 w-2 rounded-full ${
                currentStep === step ? "bg-primary-700" : "bg-grey-1"
              }`}
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
