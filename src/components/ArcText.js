import uuid from "react-uuid";

function ArcText({ text, arc, radius }) {
  const characters = text.split("");
  const degree = arc / characters.length;

  return (
    <h1 className="relative text-[0.7rem] font-[100] h-full w-full text-center top-[-1.5rem]">
      {characters.map((char, i) => (
        <span
          key={uuid()}
          className="absolute w-[10px]"
          style={{
            height: `${radius}px`,
            transform: `rotate(${degree * i - arc / 2}deg)`,
            transformOrigin: `0 ${i === 11 ? radius - 10 : radius}px 0`,
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}

export default ArcText;
