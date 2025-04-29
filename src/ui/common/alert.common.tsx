import Popup from "./popup-bg.common";

type AlertProps = {
  children?: React.ReactNode;
  title: string;
  contents: string;
};

const Alert = ({ children, title, contents }: AlertProps) => {
  return (
    <Popup>
      <div className="flex w-full max-w-[353px] flex-col rounded-2xl bg-white px-[30px] pb-4 pt-[38px] font-minsans">
        <div className="flex flex-col items-center justify-center">
          <strong className="text-lg">{title}</strong>
          <div className="mb-[26px] mt-4 text-center text-sm text-grey-5">
            {contents}
          </div>
        </div>
        <div className="flex gap-4">{children}</div>
      </div>
    </Popup>
  );
};

export default Alert;
