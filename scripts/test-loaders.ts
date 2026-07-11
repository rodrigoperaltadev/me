import { getExperienceData, getExperienceEntry, listExperienceIds } from "../src/lib/content/loaders";

async function main() {
  const ids = await listExperienceIds();
  console.log("IDs:", ids.length, "→", ids);

  const en = await getExperienceData("en");
  console.log("EN entries:", en.length);
  console.log("  First:", en[0].company, "/", en[0].year, "/", en[0].role.slice(0, 30));

  const es = await getExperienceData("es");
  console.log("ES entries:", es.length);
  console.log("  First ES role:", es[0].role.slice(0, 30));
  console.log("  First ES points[0]:", es[0].points[0].slice(0, 50) + "...");

  const single = await getExperienceEntry("000_VAL2", "es");
  console.log("Single 000_VAL2/es:", single?.company, "/", single?.points.length, "points");

  const missing = await getExperienceEntry("nonexistent", "en");
  console.log("Missing entry:", missing);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});