import "./App.css";
import { useState } from "react";
import { TargetForm } from "./components/TargetForm";

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [recommendedJogPace, setRecommendedJogPace] = useState("");

  const handleIsSubmit = async (raceType, targetSeconds) => {
    const res = await fetch(
      `/api/paces?raceType=${raceType}&targetSeconds=${targetSeconds}`,
    );
    const data1 = await res.json();
    const { e_pace_lower, e_pace_upper } = data1;
    setRecommendedJogPace({ e_pace_lower, e_pace_upper });

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
