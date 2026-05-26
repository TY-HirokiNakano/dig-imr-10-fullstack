import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [jogPace, setjogPace] = useState("");
  const [targetHours, setTargetHours] = useState(0);
  const [targetMinites, setTargetMinites] = useState(0);
  const [targetSecond, setTargetSecond] = useState(0);
  const [raceType, setRaceType] = useState("half_marathon");
  const [recommendedJogPace, setRecommendedJogPace] = useState("");
  const [recommendedMinitesL, setRecommendedMinitesL] = useState("");
  const [recommendedSecondsL, setRecommendedSecondsL] = useState("");
  const [recommendedMinitesU, setRecommendedMinitesU] = useState("");
  const [recommendedSecondsU, setRecommendedSecondsU] = useState("");

  // useEffect(() => {
  //   // fetch("/api")
  //   fetch("/api/paces")
  //     // .then((res) => res.text())
  //     .then((res) => res.json())
  //     .then((data) => setMessage(JSON.stringify(data)));
  //   // .then((data) => setMessage(data));
  // }, []);

  const handleIsSubmit = async () => {
    // const res = await fetch("/api/paces");
    // const data = await res.json();
    // setjogPace(data.e_pace_lower);
    // console.log("targetHours", targetHours);
    setIsSubmit(true);
    const targetSeconds = convertToSeconds(
      targetHours,
      targetMinites,
      targetSecond,
    );
    const res1 = await fetch(
      `/api/paces?raceType=${raceType}&targetSeconds=${targetSeconds}`,
    );
    const data1 = await res1.json();
    const { e_pace_lower, e_pace_upper } = data1;
    // console.log("e_pace_lower", e_pace_lower);
    // const rec
    await setRecommendedJogPace({ e_pace_lower, e_pace_upper });

    console.log("recommendedJogPace", await recommendedJogPace);
    console.log("data1", data1);
  };

  const convertToSeconds = (h = 0, m = 0, s = 0) =>
    Number(h * 3600 + m * 60 + s);

  const convertToMinitesAndSeconds = (s = 0) => {
    const minites = Math.floor(s / 60);
    const seconds = s % 60;
    return { minites, seconds };
  };
  return (
    <>
      <div className="App">Message from the backend: {message}</div>
      <div>
        <h1>ランニング練習アプリ</h1>
        {/* <button>ログイン</button> */}
        {/* <button>ゲストとして開始</button> */}
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
        {/* <div>
          <label>自己ベスト</label>
          <input />
        </div> */}
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
            onChange={(e) => setTargetMinites(e.target.value)}
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
                convertToMinitesAndSeconds(recommendedJogPace.e_pace_upper)[
                  "minites"
                ]
              }
              分
            </span>
            <span>
              {
                convertToMinitesAndSeconds(recommendedJogPace.e_pace_upper)[
                  "seconds"
                ]
              }
              秒
            </span>
            <span>~</span>
            <span>
              {
                convertToMinitesAndSeconds(recommendedJogPace.e_pace_lower)[
                  "minites"
                ]
              }
              分
            </span>
            <span>
              {
                convertToMinitesAndSeconds(recommendedJogPace.e_pace_lower)[
                  "seconds"
                ]
              }
              秒
            </span>
            {/* <span>{recommendedJogPace.e_pace_lower}</span> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
