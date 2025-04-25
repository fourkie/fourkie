import { Img } from "@/types/img-component.type";
import Image from "next/image";

const EmotionImage = ({ src, size }: Img) => {
  const sizeClasses: Record<"xxs" | "xs" | "s" | "m" | "l" | "xl", number> = {
    xxs: 30, // 아주 작은 사이즈
    xs: 40,
    s: 50, // 작은 사이즈
    m: 60, // 보통 사이즈
    l: 100, // 큰 사이즈
    xl: 200, // 아주 큰 사이즈
  };

  const imageSize =
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses["xs"];

  if (size === "xxs") {
    return (
      //부모 컴포넌트에 따라 커지게 relative 적용, 정사각형 유지 사이즈 별로 크기 지정
      <div className="relative aspect-square w-[30px] md:w-[50px] lg:w-[60px]">
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
