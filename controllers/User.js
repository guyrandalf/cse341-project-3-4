const mongodb = require("../database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  const result = mongodb.getDatabase().db("csewk3-4").collection("users").find();
  result
    .toArray()
    .then((user) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid user Id");
  }

  const userId = new ObjectId(req.params.id);
  const result = mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("users")
    .find({ _id: userId });

  result
    .toArray()
    .then((user) => {
      if (user.length === 0) {
        return res.status(404).json("User not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user[0]);
    })
    .catch((error) => {
      res.status(400).json({ _message: error });
    });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db("csewk3-4")
      .collection("users")
      .insertOne(user);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Failed to create a new user");
    }
  } catch (error) {
    console.error("Error creating a new user record:", error);
    res.status(500).json(error.message || "An unknown error occured");
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid user Id");
  }

  const userId = new ObjectId(req.params.id);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  const response = await mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error while updating user record");
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid user Id");
  }

  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occured while deleting the user");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
