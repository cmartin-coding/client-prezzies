type PrezziesHeaderProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textColor?: string;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function PrezziesHeading({
  className,
  level = 1,
  ...props
}: PrezziesHeaderProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={`text-2xl/8 font-semibold ${
        props.textColor ? props.textColor : "text-zinc-950"
      } sm:text-xl/8  ${className}`}
    />
  );
}
