import { useState, useEffect } from "react";
import img1 from "../assets/512green.png";
import img2 from "../assets/512pink.png";

export default function SplashScreen({ onFinish }) {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // 0〜2秒：1枚目フェードイン
    // 2〜2.5秒：フェードアウト
    // 2.5秒：2枚目に切り替え
    // 2.5〜3秒：フェードイン
    // 4秒：終了

    const timeline = [
      { time: 2000, action: () => setFade(false) },          // 1枚目フェードアウト
      { time: 2500, action: () => { setStep(2); setFade(true); } }, // 2枚目フェードイン
      { time: 4000, action: () => onFinish() }               // スプラッシュ終了
    ];

    const timers = timeline.map(item =>
      setTimeout(item.action, item.time)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, [onFinish]);

  return (
    <div style={styles.container}>
      <img
        src={step === 1 ? img1 : img2}
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