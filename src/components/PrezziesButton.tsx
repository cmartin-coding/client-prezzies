type PrezziesButtonType = {
  children: string;
  className?: string;
} & React.ComponentProps<"button">;

export function PrezziesButton(props: PrezziesButtonType) {
  return (
    <button {...props} className={`  rounded-full ${props.className}`}>
      {props.children}
    </button>
  );
}
