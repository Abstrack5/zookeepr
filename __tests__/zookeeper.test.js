const fs = require("fs");
const { zookeepers } = require("../data/zookeepers");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
jest.mock("fs");

test("create a zookeeper object", () => {
  const zookeeper = createNewZookeeper({ name: "sryj", id: "28" }, zookeepers);

  expect(zookeeper.name).toBe("sryj");
  expect(zookeeper.id).toBe("28");
});

test("filter by query", () => {
  const query = [
    {
      id: "0",
      name: "Kim",
      age: 28,
      favoriteAnimal: "dolphin",
    },
    {
      id: "1",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    }
  ];

  const newQuery = filterByQuery({ favoriteAnimal: "dolphin" }, query);

  expect(newQuery.length).toEqual(1);
});

test ('findById', () => {
    const query = [{
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin",
      },
      {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      }
    ];

    const newQuery = findById("0", query);

    expect(newQuery.name).toBe("Kim");
});

test ('validate age', () => {
    const valid = {
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin",
      };
    const invalid = 
      {
        id: "1",
        name: "Raksha",
        age: "31",
        favoriteAnimal: "penguin",
      };
    

    const test1 = validateZookeeper(valid);
    const test2 = validateZookeeper(invalid);

    expect(test1).toBe(true)
    expect(test2).toBe(false)
});