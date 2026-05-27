export function LevelDisplay({ levels, submittedSeconds }) {
  /**
   * ベースカラーコードから濃色のカラーコードを取得する
   * @param {String} baseColorCode #ffffff
   * @param {Number} darkWeight 0.0 ~ 1.0
   * @returns {String} カラーコード(rgb(255,255,255))
   */
  function getDarkColor(baseColorCode, darkWeight) {
    let red = parseInt(baseColorCode.substring(1, 3), 16);
    let green = parseInt(baseColorCode.substring(3, 5), 16);
    let blue = parseInt(baseColorCode.substring(5, 7), 16);

    let redNew = Math.round(red * (1 - darkWeight));
    let greenNew = Math.round(green * (1 - darkWeight));
    let blueNew = Math.round(blue * (1 - darkWeight));

    return "rgb(" + redNew + "," + greenNew + "," + blueNew + ")";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {levels.map((level, index) => (
        <div
          // mapで要素を返す場合は、ユニークなkey属性をつける必要がある。要素の区別のため
          key={level.id}
          style={{
            width: `${level.width_percent}%`,
            backgroundColor:
              submittedSeconds !== null &&
              submittedSeconds <= level.max_seconds &&
              (index === 0 || submittedSeconds > levels[index - 1].max_seconds)
                ? level.applicable_color
                : level.not_applicable_color,
            textAlign: "center",
            border:
              submittedSeconds !== null &&
              submittedSeconds <= level.max_seconds &&
              (index === 0 ||
                submittedSeconds > levels[index - 1].max_seconds) &&
              "solid",
            color:
              !(
                submittedSeconds !== null &&
                submittedSeconds <= level.max_seconds &&
                (index === 0 ||
                  submittedSeconds > levels[index - 1].max_seconds)
              ) && "white",
            fontWeight:
              submittedSeconds !== null &&
              submittedSeconds <= level.max_seconds &&
              (index === 0 ||
                submittedSeconds > levels[index - 1].max_seconds) &&
              "bold",
          }}
        >
          <div>{level.label}</div>
          <div>{level.sub_label}</div>
        </div>
      ))}
    </div>
  );
}
