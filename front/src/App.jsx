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
  const handleSave = async () => {
    console.log("edittedLevelIds", edittedLevelIds);
    edittedLevelIds.forEach(async (id) => {
      const level = levels.find((payload) => payload.id === id);
      await fetch(`/api/levels/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(level),
      });
    });
    setEdittedLevelIds([]);
  };

  const handleChangeLevel = async (id, column, value) => {
    const newLevels = levels.map((level) => {
      if (level.id === id) {
        return { ...level, [column]: value };
      }
      return level;
    });
    setLevels(newLevels);
    setEdittedLevelIds([...edittedLevelIds, id]);
  };

  return (
    <>
      <div>
        <h1>マラソン練習アプリ</h1>
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
                <input
                  defaultValue={level.label}
                  onChange={(e) =>
                    handleChangeLevel(level.id, "label", e.target.value)
                  }
                />
                <input
                  defaultValue={level.sub_label}
                  onChange={(e) =>
                    handleChangeLevel(level.id, "sub_label", e.target.value)
                  }
                />
                <input
                  type="number"
                  defaultValue={level.max_seconds}
                  onChange={(e) =>
                    handleChangeLevel(level.id, "max_seconds", e.target.value)
                  }
                />
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
