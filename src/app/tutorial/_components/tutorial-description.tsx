import { TUTORIAL } from "@/constants/tutorial.constant";
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

            <div className="relative">
              <Image
                src={image}
                alt={title}
                width={236}
                height={479}
                className="object-contain"
              />

              {currentStep === 1 && (
                <>
                  <Image
                    src={TUTORIAL.IMAGE.LIST2}
                    alt="list2"
                    width={160}
                    height={116}
                    className="animate-list2 absolute bottom-1/4 right-1/4 -translate-x-2/4 -translate-y-1/4 object-contain"
                  />

                  <Image
                    src={TUTORIAL.IMAGE.LIST3}
                    alt="list3"
                    width={160}
                    height={135}
                    className="animate-list3 absolute bottom-3/4 left-1/4 translate-x-2/4 translate-y-3/4 object-contain"
                  />
                </>
              )}

              {currentStep === 2 && (
                <Image
                  src={TUTORIAL.IMAGE.MUSIC2}
                  alt="music1"
                  width={230}
                  height={105}
                  className="animate-music2 absolute left-1/2 top-1/4 -translate-x-16 -translate-y-10 object-contain"
                />
              )}
            </div>
          </>
        ) : (
          <div className="my-32 flex flex-col items-center">
            <Image
              src={image}
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
          className={`w-full rounded-2xl py-4 text-lg font-bold ${currentStep === 3 ? "bg-primary-300" : "bg-primary-100"} "text-primary-800"`}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default TutorialDescription;
