type CommonTextProps = {
  children: React.ReactNode;
  type: "nickname" | "title" | "body" | "xs";
  className?: string;
};
const CommonText = ({ children, type, className = "" }: CommonTextProps) => {
  const textSizeClasss = {
    nickname: "text-2xl mx-auto",
    title: "text-xl font-bold ",
    body: "text-xl text-grey-7",
    xs: "text-xs",
  };
  return (
    <div className={`${textSizeClasss[type]}+ ${className}`}>{children}</div>
  );
};

export default CommonText;
