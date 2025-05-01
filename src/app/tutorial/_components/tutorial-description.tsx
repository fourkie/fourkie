import { TUTORIAL } from "@/constants/tutorial.constant";
import Image from "next/image";
import { DescriptionProps } from "../type";

const TutorialDescription = ({
  title,
  description,
  image,
  currentStep,
}: DescriptionProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col items-center justify-center">
      {currentStep === 4 ? (
        <div className="my-[103px] flex flex-col items-center">
          <Image
            src={image}
            alt={title}
            width={130}
            height={130}
            className="object-contain"
            priority
          />

          <div className="flex flex-col items-center py-7">
            <strong className="mb-4 text-[28px] text-grey-8">{title}</strong>

            <p className="whitespace-pre-line text-center text-sm text-grey-4">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <>
          <strong className="text-[28px] text-grey-8">{title}</strong>

          <p className="mt-4 whitespace-pre-line text-center text-sm text-grey-4">
            {description}
          </p>

          <div className="relative mt-5 h-[480px] w-full">
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
    </div>
  );
};

export default TutorialDescription;
