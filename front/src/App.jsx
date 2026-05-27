import "./App.css";
import { useState } from "react";
import { TargetForm } from "./components/TargetForm";
import { useEffect } from "react";

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

  const convertToMinutesAndSeconds = (s = 0) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return { minutes, seconds };
  };
  return (
    <>
      <div>
        <h1>ランニング練習アプリ</h1>
        <TargetForm onSubmit={handleIsSubmit} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {levels.map((level) => (
            <div
              style={{
                width: `${level.width_percent}%`,
                backgroundColor: "#a8d3ff",
                textAlign: "center",
              }}
            >
              <div>{level.label}</div>
              <div>{level.sub_label}</div>
              test
            </div>
          ))}
        </div>
        <div></div>
        {isSubmit ? (
          <>
            <p>ジョギングでの推奨ペース</p>
            <label>1kmあたり：</label>
            <span>
              {
                convertToMinutesAndSeconds(recommendedJogPace.e_pace_upper)[
                  "minutes"
                ]
              }
              分
            </span>
            <span>
              {
                convertToMinutesAndSeconds(recommendedJogPace.e_pace_upper)[
                  "seconds"
                ]
              }
              秒
            </span>
            <span>~</span>
            <span>
              {
                convertToMinutesAndSeconds(recommendedJogPace.e_pace_lower)[
                  "minutes"
                ]
              }
              分
            </span>
            <span>
              {
                convertToMinutesAndSeconds(recommendedJogPace.e_pace_lower)[
                  "seconds"
                ]
              }
              秒
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
