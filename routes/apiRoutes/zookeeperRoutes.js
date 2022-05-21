const router = require("express").Router();
const { zookeepers } = require("../../data/zookeepers");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");

router.get("/zookeepers", (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
  const results = findById(req.params.id, zookeepers);
  if (results) {
    res.json(results);
  } else {
    res.sendStatus(404);
  }
});

router.get("/zookeepers", (req, res) => {
  req.body.id = zookeepers.length.toString();

  if (!validateZookeeper(req.body)) {
    res.status(500).sendFile("Incorrect zookeeper format");
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeeper);
    res.join(zookeeper);
  }
});

module.exports = router;
