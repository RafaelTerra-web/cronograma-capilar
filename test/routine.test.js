import test from "node:test";
import assert from "node:assert/strict";
import {
  ROUTINE_CONFIG_VERSION,
  buildRoutineDays,
  defaultRoutineCareTypes,
  normalizeRoutineConfig
} from "../src/data/routine.js";

test("builds the requested default weekly routine", () => {
  const days = buildRoutineDays();
  const careTypeByDay = Object.fromEntries(days.map((day) => [day.id, day.careType]));

  assert.deepEqual(careTypeByDay, defaultRoutineCareTypes);
  assert.equal(careTypeByDay.sunday, "washExtraCream");
  assert.equal(careTypeByDay.friday, "maskWash");
  assert.equal(days.filter((day) => day.tags.includes("lavagem")).length, 4);
});

test("normalizes partial and invalid saved configurations", () => {
  const normalized = normalizeRoutineConfig({
    version: 1,
    days: { monday: "wash", friday: "unknown", sunday: "dayAfter" }
  });

  assert.equal(normalized.version, ROUTINE_CONFIG_VERSION);
  assert.equal(normalized.days.monday, "wash");
  assert.equal(normalized.days.friday, defaultRoutineCareTypes.friday);
  assert.equal(normalized.days.sunday, "dayAfter");
  assert.equal(normalized.days.tuesday, defaultRoutineCareTypes.tuesday);
});

test("derives every care detail from the selected type", () => {
  const days = buildRoutineDays({ ...defaultRoutineCareTypes, wednesday: "maskWash" });
  const wednesday = days.find((day) => day.id === "wednesday");

  assert.equal(wednesday.careType, "maskWash");
  assert.equal(wednesday.statusLabel, "Dia de máscara");
  assert.ok(wednesday.products.includes("Máscara"));
  assert.ok(wednesday.tags.includes("máscara"));
});
