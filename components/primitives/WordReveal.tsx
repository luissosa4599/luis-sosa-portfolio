/**
 * Título que se "enciende" palabra por palabra con el scroll: cada palabra pasa de tenue y
 * desenfocada a nítida (.word en globals.css, "Títulos palabra por palabra"). Las palabras de
 * una misma línea están a la misma altura, así que cada una desplaza su rango con --w.
 * El texto sigue siendo texto normal (spans en línea con espacios): se lee y se copia igual.
 * `suffix` va pegado a la última palabra (el punto de acento de los títulos).
 */
export function WordReveal({ text, suffix }: { text: string; suffix?: React.ReactNode }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word" style={{ "--w": i } as React.CSSProperties}>
            {word}
            {i === words.length - 1 && suffix}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  )
}
