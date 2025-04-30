import { X } from "lucide-react";
import Button from "./button.common";
import Popup from "./popup-bg.common";

type AlertProps = {
  title: string;
  contents: string | React.ReactNode;
  setOpenPopup: (state: boolean) => void;
  confirm: () => void;
};

const Alert = ({ setOpenPopup, confirm, title, contents }: AlertProps) => {
  return (
    <Popup>
      <div className="flex w-full max-w-[353px] flex-col rounded-2xl bg-white px-5 pb-4 pt-5 font-minsans">
        <div className="flex w-full cursor-pointer justify-end pb-2 text-black">
          <X
            size={18}
            onClick={() => setOpenPopup(false)}
            className="hover:text-grey-5"
          />
        </div>
        <div className="mx-auto flex max-w-[250px] flex-col items-center justify-center text-center">
          <strong className="text-lg">{title}</strong>
          <div className="mb-[26px] mt-4 text-sm text-grey-5">{contents}</div>
        </div>
        <div className="flex gap-4 px-[18px]">
          <Button type="button" onClick={() => setOpenPopup(false)}>
            취소
          </Button>
          <Button type="button" backgroundColor="sub" onClick={() => confirm()}>
            확인
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default Alert;
