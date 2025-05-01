import { TUTORIAL } from "@/constants/tutorial.constant";

export type DescriptionProps = {
  title: string;
  description: string;
  image: string;
  currentStep: number;
};

export type TutorialKeys = keyof typeof TUTORIAL.TITLE;
