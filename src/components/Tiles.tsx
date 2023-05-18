interface Props {
  image?: string;
  number: number;
}

export default function Tiles({ number, image }: Props) {
  let bgColor = "";
  if (number % 2 === 0) bgColor = "#825A34";
  else bgColor = "#DDB88C";

  return (
    <div
      className="h-[80px] w-[80px] flex justify-center items-center "
      style={{ backgroundColor: `${bgColor}` }}
    >
      {image && <img src={image} alt="" className="h-[100%] w-[100%]" />}
    </div>
  );
}
