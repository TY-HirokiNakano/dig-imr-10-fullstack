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
  const [isEdit, setIsEdit] = useState(false);
  const [edittedLevelIds, setEdittedLevelIds] = useState([]);

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
  const handleSave = async () => {};

  return (
    <>
      <div>
        <h1>ランニング練習アプリ</h1>
        <TargetForm onSubmit={handleIsSubmit} />

        {isSubmit && (
          <JogPace
            ePaceLower={recommendedJogPace.e_pace_lower}
            ePaceUpper={recommendedJogPace.e_pace_upper}
          />
        )}
        <LevelDisplay levels={levels} submittedSeconds={submittedSeconds} />
        <button
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? "閉じる" : "レベルを設定"}
        </button>
        {isEdit && (
          <div>
            {levels.map((level) => (
              <div key={level.id}>
                <input defaultValue={level.label} />
                <input defaultValue={level.sub_label} />
                <input type="number" defaultValue={level.max_seconds} />
              </div>
            ))}
            <button onClick={handleSave}>保存</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
