import Confetti from "react-confetti";
import useindowSize from "react-use/lib/useWindowSize";

export default function ConfettiComponent() {
  const { width, height } = useindowSize();

  return (
    <Confetti width={width} height={height} />
  )
}
