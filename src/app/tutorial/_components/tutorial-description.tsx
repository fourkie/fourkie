import { TUTORIAL } from "@/constants/tutorial.constant";
import Image from "next/image";
import { DescriptionProps } from "../type";

const TutorialDescription = ({
  title,
  description,
  image,
  currentStep,
  onClick,
  onDotClick,
  buttonName,
}: DescriptionProps) => {
  return (
    <div
      className={`flex min-h-screen min-w-[360px] items-center justify-center ${currentStep !== 4 ? "bg-white" : "bg-primary-50"} font-minsans`}
    >
      <div className="flex w-full max-w-[360px] flex-col items-center justify-center gap-5 px-4">
        {currentStep === 4 ? (
          <div className="flex flex-col items-center">
            <Image
              src={image}
              alt={title}
              width={140}
              height={140}
              className="object-contain"
              priority
            />

            <div className="flex flex-col items-center py-8">
              <h1 className="my-4 text-3xl font-bold">{title}</h1>
              <p className="whitespace-pre-line text-center text-sm text-[#898989]">
                {description}
              </p>
            </div>
          </div>
        ) : (
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
                priority
              />

              {currentStep === 1 && (
                <>
                  <Image
                    src={TUTORIAL.IMAGE.LIST2}
                    alt="list2"
                    width={160}
                    height={116}
                    className="absolute right-1/4 top-1/4 -translate-x-16 translate-y-24 animate-list2 object-contain"
                    priority
                  />

                  <Image
                    src={TUTORIAL.IMAGE.LIST3}
                    alt="list3"
                    width={160}
                    height={135}
                    className="absolute bottom-3/4 left-1/4 translate-x-16 translate-y-32 animate-list3 object-contain"
                    priority
                  />
                </>
              )}

              {currentStep === 2 && (
                <Image
                  src={TUTORIAL.IMAGE.MUSIC2}
                  alt="music1"
                  width={230}
                  height={105}
                  className="absolute left-1/2 top-1/4 -translate-x-16 -translate-y-10 animate-music2 object-contain"
                  priority
                />
              )}

              {currentStep === 3 && (
                <Image
                  src={TUTORIAL.IMAGE.FRIEND2}
                  alt="FRIEND2"
                  width={353}
                  height={231}
                  className="absolute left-1/3 top-1/4 -translate-x-16 -translate-y-10 animate-friend2 object-contain drop-shadow-md"
                  priority
                />
              )}
            </div>
          </>
        )}

        <div className="flex cursor-pointer justify-center gap-2">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              onClick={() => onDotClick(step)}
              className={`h-2 w-2 rounded-full ${currentStep === step ? "bg-primary-700" : "bg-grey-1"}`}
            />
          ))}
        </div>

        <button
          onClick={onClick}
          className={`w-full rounded-2xl py-4 text-lg font-bold ${currentStep === 4 ? "bg-primary-300" : "bg-primary-100"} "text-primary-800"`}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default TutorialDescription;
