import { AshTraySVG } from "./AshTraySVG";
import { CardTableSVG } from "./CardTableSVG";

export function CardTableAndAshTray() {
  return (
    <div className={`relative w-full  rounded-full `}>
      <CardTableSVG
        className={`  `}
        // style={{
        //   transform: "",
        // }}
      />
      <AshTraySVG
        className={`absolute w-[50%]  top-0 right-10`}
        // style={{ transform: " rotateX(39deg)" }}
      />
    </div>
  );
}
