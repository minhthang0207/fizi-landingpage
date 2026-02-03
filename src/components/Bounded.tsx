import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export const Bounded = ({
  as: Tag = "section", // Đổi tên tạm thành Tag
  className,
  children,
  ...restProps
}: BoundedProps) => {
  // Gán lại cho một biến viết hoa và ép kiểu thành 'any'
  // để dập tắt cảnh báo 'never' của TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;

  return (
    <Comp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
};
