// Day 21: Allergen Assessment
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const ingredients = new Map();
  const allergens = new Map();

  input.split("\n").forEach((food, i) => {
    let [ingr, allerg] = food.split(" (contains ");
    ingr = ingr.split(" ");
    allerg = allerg.substr(0, allerg.length - 1).split(", ");

    ingr.forEach((ing) => {
      if (!ingredients.has(ing)) {
        ingredients.set(ing, new Set());
      }
      ingredients.get(ing).add(i);
    });

    allerg.forEach((aller) => {
      if (!allergens.has(aller)) {
        allergens.set(aller, new Set());
      }
      allergens.get(aller).add(i);
    });
  });

  const ingToAllerMap = new Map();
  for (let ing of ingredients.keys()) {
    ingToAllerMap.set(ing, []);
  }

  for (let [aller, foodsWithAller] of allergens.entries()) {
    for (let [ing, foodsWithIng] of ingredients.entries()) {
      let found = true;
      for (let foodId of foodsWithAller.values()) {
        if (!foodsWithIng.has(foodId)) {
          found = false;
          break;
        }
      }
      if (found) {
        ingToAllerMap.get(ing).push(aller);
      }
    }
  }

  while ([...ingToAllerMap.values()].some((aller) => aller.length > 1)) {
    const toRemove = [];
    for (let aller of ingToAllerMap.values()) {
      if (aller.length === 1) {
        toRemove.push(aller[0]);
      }
    }
    for (let [ing, aller] of ingToAllerMap.entries()) {
      if (aller.length > 1) {
        ingToAllerMap.set(
          ing,
          aller.filter((a) => toRemove.indexOf(a) === -1)
        );
      }
    }
  }

  output = [...ingToAllerMap.entries()]
    .filter(([, aller]) => aller.length > 0)
    .sort(([, [a]], [, [b]]) => (a > b ? 1 : -1))
    .map(([ing]) => ing)
    .join(",");

  return { output /*, operations */ };
};

// output: nfnfk,nbgklf,clvr,fttbhdr,qjxxpr,hdsm,sjhds,xchzh
run(func);
