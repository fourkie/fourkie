export type CommonTextProps = {
  children: React.ReactNode;
  size: "xs" | "sm" | "bs" | "lg" | "xl";
  type: "h" | "title" | "body";
  color?: "black" | "grey" | "white";
  className?: string;
};
