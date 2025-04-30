import { Img } from "@/types/img-component.type";
import Image from "next/image";

const EmotionImage = ({ src, size, className }: Img) => {
  const sizeClasses: Record<
    "xxs" | "xs" | "xss" | "s" | "m" | "l" | "xl",
    number
  > = {
    xxs: 30,
    xs: 40,
    xss: 44,
    s: 50,
    m: 60,
    l: 100,
    xl: 200,
  };

  const imageSize =
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses["xs"];

  if (size === "xxs") {
    return (
      <div
        className={`relative aspect-square w-[30px] md:w-[50px] lg:w-[60px] ${className}`}
      >
        <Image
          src={src}
          alt="Emotion"
          fill
          className="rounded object-cover"
          sizes="(max-width: 640px) 30px, (max-width: 768px) 50px, (max-width: 1024px) 60px"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt="Emotion"
      className="rounded object-cover"
      width={imageSize}
      height={imageSize}
    />
  );
};

export default EmotionImage;
