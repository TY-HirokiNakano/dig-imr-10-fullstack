export function TargetForm(
  raceType,
  setRaceType,
  inputHours,
  setInputHours,
  inputMinutes,
  setInputMinutes,
  inputSeconds,
  setInputSeconds,
) {
  return (
    <>
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
    </>
  );
}
