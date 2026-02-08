import { useState, useEffect } from "react";
import img1 from "./assets/512pink.png";
import img2 from "./assets/512green.png";

export default function SplashScreen({ onFinish }) {
  const [step, setStep] = useState(1);
  const [fade, setFade] = useState(true); // ← フェード用

  useEffect(() => {
    // 1枚目 → 2秒後にフェードアウト
    const timer1 = setTimeout(() => {
      setFade(false); // フェードアウト
      setTimeout(() => {
        setStep(2);    // 画像切り替え
        setFade(true); // フェードイン
      }, 500); // フェードアウト時間
    }, 2000);

    // 4秒後に終了
    const timer2 = setTimeout(() => onFinish(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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
