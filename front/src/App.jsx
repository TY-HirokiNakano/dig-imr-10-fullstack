import "./App.css";
import { useState } from "react";
import { TargetForm } from "./components/TargetForm";
import { useEffect } from "react";
import { JogPace } from "./components/JogPace";
import { LevelDisplay } from "./components/LevelDisplay";

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [recommendedJogPace, setRecommendedJogPace] = useState("");
  const [levels, setLevels] = useState([]);
  const [submittedSeconds, setSubmittedSeconds] = useState(null);

  useEffect(() => {
    fetch("/api/levels?raceType=half_marathon")
      .then((res) => res.json())
      .then((data) => setLevels(data));
  }, []);

  const handleIsSubmit = async (raceType, targetSeconds) => {
    const res = await fetch(
      `/api/paces?raceType=${raceType}&targetSeconds=${targetSeconds}`,
    );
    const data1 = await res.json();
    const { e_pace_lower, e_pace_upper } = data1;
    setRecommendedJogPace({ e_pace_lower, e_pace_upper });
    // ここで表示のために秒数を保持しておく
    setSubmittedSeconds(targetSeconds);

    setIsSubmit(true);
  };

  return (
    <>
      <div>
        <h1>ランニング練習アプリ</h1>
        <TargetForm onSubmit={handleIsSubmit} />
        <LevelDisplay levels={levels} submittedSeconds={submittedSeconds} />

        {isSubmit && (
          <JogPace
            ePaceLower={recommendedJogPace.e_pace_lower}
            ePaceUpper={recommendedJogPace.e_pace_upper}
          />
        )}
      </div>
    </>
  );
}

export default App;
