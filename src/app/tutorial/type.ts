export type DescriptionProps = {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  onDotClick: (index: number) => void;
  currentStep: number;
  buttonName: string;
  isFromMypage?: boolean;
};
