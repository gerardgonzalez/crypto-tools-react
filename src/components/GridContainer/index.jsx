import clsx from "clsx";

export const GridContainer = ({
  className,
  rootClassName,
  rowClassName,
  children,
}) => {
  return (
    <div className={clsx("container-fluid px-0", className, rootClassName)}>
      <div className={clsx("row g-4", rowClassName)}>{children}</div>
    </div>
  );
};
