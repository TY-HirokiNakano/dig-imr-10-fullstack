import { useState } from "react";

export function TargetForm({ onSubmit }) {
  const [raceType, setRaceType] = useState("half_marathon");
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const handleClick = () => {
    const totalSeconds =
      Number(inputHours) * 3600 +
      Number(inputMinutes) * 60 +
      Number(inputSeconds);
    onSubmit(raceType, totalSeconds);
  };

  const convertToSeconds = (h = 0, m = 0, s = 0) =>
    Number(h * 3600 + m * 60 + s);

  return (
    <>
      <div>
        <label>種目</label>
        <select
          value={raceType}
          onChange={(e) => {
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
          value={inputHours}
          onChange={(e) => setInputHours(e.target.value)}
        />
        <label>時間</label>
        <input
          type="number"
          min="0"
          max="59"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
        />
        <label>分</label>
        <input
          type="number"
          min="0"
          max="59"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
        />
        <label>秒</label>
      </div>
      <button onClick={handleClick}>ペース計算</button>
    </>
  );
}
