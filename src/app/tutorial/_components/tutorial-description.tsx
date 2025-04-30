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
      <div className="flex w-full max-w-[360px] flex-col items-center justify-center gap-5">
        {currentStep === 4 ? (
          <div className="flex flex-col items-center">
            <Image
              src={image}
              alt={title}
              width={140}
              height={140}
              className="mt-10 object-contain"
              priority
            />

            <div className="flex flex-col items-center gap-5 py-10">
              <h1 className="my-5 text-3xl font-bold">{title}</h1>
              <p className="mb-[190px] whitespace-pre-line text-center text-sm text-grey-5">
                {description}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="whitespace-pre-line text-center text-sm text-grey-5">
              {description}
            </p>

            <div className="relative h-[480px] w-full">
              <Image
                src={image}
                alt={title}
                fill
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
                    className="absolute left-16 top-32 -translate-x-16 translate-y-24 animate-list2 object-contain drop-shadow-md"
                    priority
                  />

                  <Image
                    src={TUTORIAL.IMAGE.LIST3}
                    alt="list3"
                    width={160}
                    height={135}
                    className="object-containdrop-shadow-md absolute -top-8 right-16 translate-x-16 translate-y-32 animate-list3"
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
                  className="object-containdrop-shadow-md absolute left-1/2 top-1/4 -translate-x-16 -translate-y-10 animate-music2"
                  priority
                />
              )}

              {currentStep === 3 && (
                <Image
                  src={TUTORIAL.IMAGE.FRIEND2}
                  alt="FRIEND2"
                  width={230}
                  height={149}
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
          aria-label="다음 설명으로 넘어가는 버튼"
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
