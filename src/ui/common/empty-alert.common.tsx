import { AlertType } from "@/types/cookie-alert.type";

const EmptyAlert = ({ text, isContent = false }: AlertType) => {
  let common = "flex flex-col items-center justify-center gap-6 text-grey-6 ";

  if (!isContent) {
    common = common + "pt-24";
  }

  return (
    <div className={`${common}`}>
      {text}
    </div>
  );
};

export default EmptyAlert;
