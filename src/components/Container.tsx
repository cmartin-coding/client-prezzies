import { ReactNode } from "react";

export function Container(props: { children: ReactNode }) {
  return <div className={`m-8`}>{props.children}</div>;
}
