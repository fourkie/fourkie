import Image from "next/image";
import React from "react";
import { Img } from "./types/ImgComponent.type";

/* 
사용법 
<CommonEmotionImage 
    src={이미지url string 타입}  //상수화 되어 있을 겁니다.
    size={"~" } //string 타입입니다. xs, s, m, l, xl 중에 골라주세요. 그 외의 값은 막힙니다.
/>

사용 예시
<CommonEmotionImage
    src={EMOTION_URL.JOY}
    size={"xl"}
/>
 */
export const CommonEmotionImage = ({ src, size }: Img) => {
  const sizeClasses: Record<"xs" | "s" | "m" | "l" | "xl", number> = {
    xs: 30, // 아주 작은 사이즈
    s: 50, // 작은 사이즈
    m: 60, // 보통 사이즈
    l: 100, // 큰 사이즈
    xl: 200, // 아주 큰 사이즈
  };

  const imageSize =
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses["xs"];

  return (
    <Image
      src={src}
      alt="Emotion"
      className={`rounded object-cover`}
      width={imageSize}
      height={imageSize}
      priority
    />
  );
};
