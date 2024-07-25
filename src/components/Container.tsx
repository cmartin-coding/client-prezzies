import { ReactNode } from "react";

export function Container(props: {
  children: ReactNode;
  containerStyle?: string;
}) {
  return (
    <div
      className={`h-[100%] min-h-[100vh] max-w-[100%] w-[100vw]  bg-[#e7dec7] flex flex-col
        
        
        `}
      // bg-gradient-to-br from-red-300 via-white to-blue-300
    >
      <div className={`flex-1 ${props.containerStyle}`}>{props.children}</div>
    </div>
  );
}
