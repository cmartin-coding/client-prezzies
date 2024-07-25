import { ReactNode } from "react";

type PrezziesButtonType = {
  buttonText: string;
  className?: string;
  icon?: ReactNode;
  buttonStyle: ButtonTypes;
} & React.ComponentProps<"button">;
type ButtonTypes = "Primary" | "Secondary" | "Tertiary";
export function PrezziesButton(props: PrezziesButtonType) {
  const buttonTypes: { [key in ButtonTypes]: string } = {
    Primary:
      "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    Secondary:
      "rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    Tertiary:
      "rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-indigo-100",
  };
  return (
    <button
      type="button"
      className={`${buttonTypes[props.buttonStyle]} ${
        props.icon && "inline-flex items-center gap-x-1.5 "
      }`}
    >
      {props.buttonText}
      {props.icon}
    </button>
  );
}
