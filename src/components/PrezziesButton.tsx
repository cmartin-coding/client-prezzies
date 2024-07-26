import { ReactNode } from "react";

type PrezziesButtonType = {
  buttonText: string;
  customBtnStyle?: string;
  icon?: ReactNode;
  buttonStyle: ButtonTypes;
  buttonProps?: React.ComponentProps<"button">;
};
type ButtonTypes = "Primary" | "Secondary" | "Tertiary";
export function PrezziesButton(props: PrezziesButtonType) {
  const buttonTypes: { [key in ButtonTypes]: string } = {
    Primary:
      "p-1 rounded-md bg-indigo-600 md:px-3.5 md:py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    Secondary:
      "p-1 rounded-md bg-white md:px-3.5 md:py-2.5 md:text-sm text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200",
    Tertiary:
      "p-1 rounded-md bg-indigo-50 md:px-3.5 md:py-2.5 md:text-sm text-xs font-semibold text-red-600 shadow-sm hover:bg-indigo-100",
  };
  return (
    <button
      type="button"
      className={` ${
        props.icon && "inline-flex items-center gap-x-1.5 justify-between"
      } ${props.customBtnStyle}  ${buttonTypes[props.buttonStyle]}`}
      {...props.buttonProps}
    >
      {props.buttonText}
      {props.icon}
    </button>
  );
}
