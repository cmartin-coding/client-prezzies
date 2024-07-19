type PrezziesButtonType = {
  children: string;
  className?: string;
} & React.ComponentProps<"button">;

export function PrezziesButton(props: PrezziesButtonType) {
  return (
    <button
      {...props}
      className={`p-2   border border-black rounded-full ${props.className}`}
    >
      {props.children}
    </button>
  );
}
