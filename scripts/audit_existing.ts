import { formulas } from "../src/data/formulas";

console.log(`Total formulas in database: ${formulas.length}`);

const physicsFormulas = formulas.filter(
  (f) => !f.subjectId || f.subjectId === "physics"
);
console.log(`Physics formulas: ${physicsFormulas.length}`);

const topics = [...new Set(physicsFormulas.map((f) => f.topic))];

for (const t of topics) {
  console.log(`\n========================================`);
  console.log(`TOPIC: ${t}`);
  console.log(`========================================`);
  const inTopic = physicsFormulas.filter((f) => f.topic === t);
  inTopic.forEach((f, idx) => {
    console.log(
      `${idx + 1}. [${f.id}] "${f.name}"\n   Equation: ${f.equation}\n   Type: ${f.calculatorType}\n   Vars: ${f.variables.map((v) => `${v.symbol} (${v.name})`).join(", ")}`
    );
  });
}
