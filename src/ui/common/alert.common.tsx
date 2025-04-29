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
      <div className="flex w-full max-w-[353px] flex-col rounded-2xl bg-white px-[30px] pb-4 pt-[38px] font-minsans">
        <div className="flex flex-col items-center justify-center">
          <strong className="text-lg">{title}</strong>
          <div className="mb-[26px] mt-4 text-center text-sm text-grey-5">
            {contents}
          </div>
        </div>
        <div className="flex gap-4">
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
