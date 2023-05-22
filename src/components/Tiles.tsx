interface Props {
  image?: string;
  number: number;
  highlight: boolean;
}

export default function Tiles({ number, image, highlight }: Props) {
  let bgColor = "";
  if (number % 2 === 0) bgColor = "#825A34";
  else bgColor = "#DDB88C";

  if (highlight) {
    return (
      <div
        className="h-[80px] w-[80px] flex justify-center items-center relative"
        style={{ backgroundColor: `${bgColor}` }}
      >
        <div className="absolute rounded-full h-[30px] w-[30px] bg-[#00000070] top-[25px] left-[25px]" />
        {image && (
          <div
            className="chess-piece h-[70px] w-[70px] active:cursor-grabbing  hover:cursor-grab z-[10000]"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          />
        )}
      </div>
    );
  } else {
    return (
      <div
        className="h-[80px] w-[80px] flex justify-center items-center "
        style={{ backgroundColor: `${bgColor}` }}
      >
        {image && (
          <div
            className="chess-piece h-[70px] w-[70px] active:cursor-grabbing  hover:cursor-grab z-[10000]"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          />
        )}
      </div>
    );
  }
}
