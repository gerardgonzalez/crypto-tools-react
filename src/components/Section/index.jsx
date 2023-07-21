import clsx from "clsx";

export const Section = ({ children, pageClassName, className, ...rest }) => {
  return (
    <div className={clsx("section", className)} {...rest}>
      <div className={clsx(pageClassName, "page-container")}>{children}</div>
    </div>
  );
};
