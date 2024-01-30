const mongodb = require("../database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  const result = mongodb.getDatabase().db("csewk3-4").collection("employees").find();
  result
    .toArray()
    .then((employee) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(employee);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid employee Id");
  }

  const employeeId = new ObjectId(req.params.id);
  const result = mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("employees")
    .find({ _id: employeeId });

  result
    .toArray()
    .then((employee) => {
      if (employee.length === 0) {
        return res.status(404).json("Employee not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(employee[0]);
    })
    .catch((error) => {
      res.status(400).json({ _message: error });
    });
};

const createEmployee = async (req, res) => {
  const employee = {
    empId: req.body.empId,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary,
    birthdate: req.body.birthdate,
    empDate: req.body.empDate,
    empStatus: req.body.empStatus,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db("csewk3-4")
      .collection("employees")
      .insertOne(employee);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Failed to create a new employee record");
    }
  } catch (error) {
    console.error("Error creating a new employee record:", error);
    res.status(500).json(error.message || "An unknown error occured");
  }
};

const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid employee Id");
  }

  const employeeId = new ObjectId(req.params.id);

  const employee = {
    empId: req.body.empId,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary,
    birthdate: req.body.birthdate,
    empDate: req.body.empDate,
    empStatus: req.body.empStatus,
  };

  const response = await mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("employees")
    .replaceOne({ _id: employeeId }, employee);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error while updating employee record");
  }
};

const deleteEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Enter a valid employee Id");
  }

  const employeeId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db("csewk3-4")
    .collection("employees")
    .deleteOne({ _id: employeeId });
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occured while deleting the employee");
  }
};

module.exports = {
  getAll,
  getSingle,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
