import { AlertType } from "@/types/cookie-alert.type";

const CookieAlert = ({ text, isContent = false }: AlertType) => {
  let common = "flex flex-col items-center justify-center gap-6 text-grey-6 ";
  let size = "xs";

  if (!isContent) {
    size = "l";
    common = common + "pt-24";
  }

  return (
    <div className={`${common}`}>
      {text}
    </div>
  );
};

export default CookieAlert;
