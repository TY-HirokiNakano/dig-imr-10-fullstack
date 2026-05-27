/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("level").del();
  await knex("level").insert([
    {
      race_type: "half_marathon",
      label: "サブ1",
      sub_label: "エリート（トヨタ自動車 太田智樹選手）レベル",
      max_seconds: 3600,
      width_percent: 30,
    },
    {
      race_type: "half_marathon",
      label: "サブ70",
      sub_label: "全国トップレベル",
      max_seconds: 4200,
      width_percent: 40,
    },
    {
      race_type: "half_marathon",
      label: "サブ80",
      sub_label: "全国上位レベル",
      max_seconds: 4800,
      width_percent: 50,
    },
    {
      race_type: "half_marathon",
      label: "サブ90",
      sub_label: "市民ランナー上級レベル",
      max_seconds: 5400,
      width_percent: 60,
    },
    {
      race_type: "half_marathon",
      label: "サブ100",
      sub_label: "市民ランナー中級レベル",
      max_seconds: 6000,
      width_percent: 70,
    },
    {
      race_type: "half_marathon",
      label: "サブ2",
      sub_label: "市民ランナー標準レベル",
      max_seconds: 7200,
      width_percent: 90,
    },
    {
      race_type: "half_marathon",
      label: "2時間以上",
      sub_label: "完走、ビギナーレベル",
      max_seconds: 999999,
      width_percent: 100,
    },
  ]);
};
