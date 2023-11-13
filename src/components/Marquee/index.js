export default function Marquee({
  text,
  className = "text-neutral-900",
  separator = "✦",
}) {
  let repeatedText = "";

  if (typeof text === "string") {
    repeatedText = text;
  } else if (Array.isArray(text)) {
    repeatedText = text.join(` ${separator} `);
  }

  repeatedText = `${repeatedText} ${separator} `.repeat(25).trim();
  return (
    <div className={className}>
      <marquee className="py-4 font-medium uppercase">{repeatedText}</marquee>
    </div>
  );
}
