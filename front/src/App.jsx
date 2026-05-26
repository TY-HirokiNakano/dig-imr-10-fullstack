import "./App.css";
import { useState } from "react";

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [targetHours, setTargetHours] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(0);
  const [targetSecond, setTargetSecond] = useState(0);
  const [raceType, setRaceType] = useState("half_marathon");
  const [recommendedJogPace, setRecommendedJogPace] = useState("");

  const handleIsSubmit = async () => {
    const targetSeconds = convertToSeconds(
      targetHours,
      targetMinutes,
      targetSecond,
    );
    const res = await fetch(
      `/api/paces?raceType=${raceType}&targetSeconds=${targetSeconds}`,
    );
    const data1 = await res.json();
    const { e_pace_lower, e_pace_upper } = data1;
    setRecommendedJogPace({ e_pace_lower, e_pace_upper });

    setIsSubmit(true);
  };

  const convertToSeconds = (h = 0, m = 0, s = 0) =>
    Number(h * 3600 + m * 60 + s);

  const convertToMinutesAndSeconds = (s = 0) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return { minutes, seconds };
  };
  return (
    <>
      <div>
        <h1>ランニング練習アプリ</h1>
        <div>
          <label>種目</label>
          <select
            value={raceType}
            onChange={(e) => {
              console.log("raceType変更後", e.target.value);
              setRaceType(e.target.value);
            }}
          >
            <option value="half_marathon">ハーフ</option>
            <option value="full_marathon">フル</option>
          </select>
        </div>
        <div>
          <label>目標タイム</label>
          <input
            type="number"
            min="0"
            max="10"
            onChange={(e) => setTargetHours(e.target.value)}
          />
          <label>時間</label>
          <input
            type="number"
            min="0"
            max="59"
            onChange={(e) => setTargetMinutes(e.target.value)}
          />
          <label>分</label>
          <input
            type="number"
            min="0"
            max="59"
            onChange={(e) => setTargetSecond(e.target.value)}
          />
          <label>秒</label>
        </div>
        <button onClick={handleIsSubmit}>ペース計算</button>
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
