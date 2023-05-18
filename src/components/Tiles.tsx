interface Props {
  number: number;
}

export default function Tiles({ number }: Props) {
  let bgColor = "";
  if (number % 2 === 0) bgColor = "#825A34";
  else bgColor = "#DDB88C";

  return (
    <div
      className="h-[80px] w-[80px] flex justify-center items-center"
      style={{ backgroundColor: `${bgColor}` }}
    />
  );
}
