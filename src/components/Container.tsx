import { ReactNode } from "react";

export function Container(props: { children: ReactNode }) {
  return <div className={` h-[100vh] w-[100vw]`}>{props.children}</div>;
}
