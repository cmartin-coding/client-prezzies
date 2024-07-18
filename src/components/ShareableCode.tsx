import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

export function ShareableCode(props: {
  shareableCode: string;
  className?: string;
}) {
  const handleCopyAndNotify = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className={`flex flex-col justify-between gap-2 ${props.className}`}>
      <p className={`text-md text-black  text-center`}>Room Code</p>
      <div className={`flex flex-row justify-center gap-2`}>
        <p className={`text-lg font-bold`}>{props.shareableCode}</p>
        <button
          className={`group`}
          onClick={() => {
            handleCopyAndNotify(props.shareableCode);
          }}
        >
          <span>
            <MdOutlineContentCopy
              className={`transform duration-300 ease-in-out group-hover:scale-110`}
              size={20}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
