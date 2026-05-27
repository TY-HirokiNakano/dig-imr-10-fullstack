export function JogPace({ ePaceLower, ePaceUpper }) {
  const convertToMinutesAndSeconds = (s = 0) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return { minutes, seconds };
  };

  return (
    <>
      <p>ジョギングでの推奨ペース</p>
      <label>1kmあたり：</label>
      <span>{convertToMinutesAndSeconds(ePaceUpper)["minutes"]}分</span>
      <span>{convertToMinutesAndSeconds(ePaceUpper)["seconds"]}秒</span>
      <span>~</span>
      <span>{convertToMinutesAndSeconds(ePaceLower)["minutes"]}分</span>
      <span>{convertToMinutesAndSeconds(ePaceLower)["seconds"]}秒</span>
    </>
  );
}
