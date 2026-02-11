import { useState, useEffect } from "react";
import img1 from "../assets/512green.png";
import img2 from "../assets/512pink.png";
import img3 from "../assets/512yellow.png";

export default function SplashScreen({ onFinish }) {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState(false); // 最初は透明

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setFade(true) },        // フェードイン開始
      { time: 2000, action: () => setStep(2) },        // img3
      { time: 3500, action: () => setStep(3) },        // img2
      { time: 4500, action: () => setFade(false) },    // フェードアウト開始
      { time: 5000, action: () => onFinish() },        // 終了
    ];

    const timers = timeline.map(item =>
      setTimeout(item.action, item.time)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, [onFinish]);

  const currentImage =
    step === 1 ? img1 :
    step === 2 ? img3 :
    img2;

  return (
    <div style={styles.container}>
      <img
        src={currentImage}
        alt="splash"
        style={{
          ...styles.image,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  image: {
    width: "70%",
    maxWidth: "300px",
  },
};
