import { ReactNode } from "react";

export function Container(props: {
  children: ReactNode;
  containerStyle?: string;
}) {
  return (
    <div
      className={`h-[100vh] w-[100vw] bg-gradient-to-br from-red-300 via-white to-blue-300   flex flex-col`}
    >
      <div className={`flex-1 border ${props.containerStyle}`}>
        {props.children}
      </div>
    </div>
  );
}
