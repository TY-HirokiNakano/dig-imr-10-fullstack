export function LevelDisplay({ levels, submittedSeconds }) {
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
          style={{
            width: `${level.width_percent}%`,
            backgroundColor:
              submittedSeconds !== null &&
              submittedSeconds <= level.max_seconds &&
              (index === 0 || submittedSeconds > levels[index - 1].max_seconds)
                ? level.applicable_color
                : level.not_applicable_color,
            textAlign: "center",
            color:
              submittedSeconds !== null &&
              submittedSeconds <= level.max_seconds &&
              (index === 0 ||
                submittedSeconds > levels[index - 1].max_seconds) &&
              "white",
          }}
        >
          <div>{level.label}</div>
          <div>{level.sub_label}</div>
        </div>
      ))}
    </div>
  );
}
