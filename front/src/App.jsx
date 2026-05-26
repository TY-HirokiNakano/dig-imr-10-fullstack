import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [jogPace, setjogPace] = useState("");

  useEffect(() => {
    // fetch("/api")
    fetch("/api/paces")
      // .then((res) => res.text())
      .then((res) => res.json())
      .then((data) => setMessage(JSON.stringify(data)));
    // .then((data) => setMessage(data));
  }, []);
  const handleIsSubmit = async () => {
    const res = await fetch("/api/paces");
    const data = await res.json();
    setjogPace(data.e_pace_lower);
    setIsSubmit(true);
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
          <select>
            <option value="half">ハーフ</option>
            <option value="full">フル</option>
          </select>
        </div>
        {/* <div>
          <label>自己ベスト</label>
          <input />
        </div> */}
        <div>
          <label>目標タイム</label>
          <input type="number" min="0" max="10" />
          <label>時間</label>
          <input type="number" min="0" max="59" />
          <label>分</label>
          <input type="number" min="0" max="59" />
          <label>秒</label>
        </div>
        <button onClick={handleIsSubmit}>ペース計算</button>
        {isSubmit ? (
          <>
            <p>ジョギングでの推奨ペース</p>
            <label>1kmあたり</label>
            <span>{jogPace}</span>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
