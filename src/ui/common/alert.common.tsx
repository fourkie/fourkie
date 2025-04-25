import Popup from "./popup-bg.common";

type AlertProps = {
  children?: React.ReactNode;
  title: string;
  contents: string;
};

const Alert = ({ children, title, contents }: AlertProps) => {
  return (
    <Popup>
      <div className="w-full rounded-2xl bg-white p-4">
        <div className="flex flex-col items-center justify-center p-4">
          <strong className="text-lg text-grey-7">{title}</strong>
          <div className="mt-2 text-sm text-grey-5">{contents}</div>
        </div>
        {children}
      </div>
    </Popup>
  );
};

export default Alert;
