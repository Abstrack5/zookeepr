const fs = require('fs');
const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../lib/animals');
const {animals} = require('../data/animals');
jest.mock('fs');

test("creates an animal object", () => {
    const animal = createNewAnimal(
      { name: "Darlene", id: "jhgdja3ng2" },
      animals
    );
  
    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("jhgdja3ng2");
  });

  test ('filter by query', () => {
    const query = [
        {
        "id": "0",
        "name": "Spindle",
        "species": "bear",
        "diet": "omnivore",
        "personalityTraits": [
          "hungry",
          "zany",
          "loving"
        ]
      },
      {
        "id": "1",
        "name": "Terry",
        "species": "gorilla",
        "diet": "folivore",
        "personalityTraits": [
          "anxious",
          "goofy"
        ]
      }
    ];

    const newQuery = filterByQuery({ diet: "folivore"}, query);

    expect(newQuery.length).toEqual(1);
  });

  test ('Find by id', () => {
    const query = [
        {
        "id": "0",
        "name": "Spindle",
        "species": "bear",
        "diet": "omnivore",
        "personalityTraits": [
          "hungry",
          "zany",
          "loving"
        ]
      },
      {
        "id": "1",
        "name": "Terry",
        "species": "gorilla",
        "diet": "folivore",
        "personalityTraits": [
          "anxious",
          "goofy"
        ]
      }
    ];

    const newQuery = findById("1", query);

    expect(newQuery.name).toBe("Terry");
  });

  test ("validateAnimal", () => {
      const animal = 
        {
        "id": "0",
        "name": "Spindle",
        "species": "bear",
        "diet": "omnivore",
        "personalityTraits": [
          "hungry",
          "zany",
          "loving"
        ]
      };

      const invalidAnimal = 
        {
        "id": "0",
        "name": "Spindle",
        "species": "bear",
        "diet": "omnivore"
      };

      const test1 = validateAnimal(animal);
      const test2 = validateAnimal(invalidAnimal);

      expect(test1).toBe(true);
      expect(test2).toBe(false);
      
  })