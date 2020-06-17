const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get specific employee
router.get("/:id", async (req, res) => {
  //   const empId = req.params.id;
  //   console.log(empId);
  try {
    const employee = await Employee.findById(req.params.id);
    // console.log(employee);
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Add a new employee
router.post("/", (req, res) => {
  console.log(req.body);
  const employee = new Employee({
    name: req.body.name,
    department: req.body.department,
    salary: req.body.salary,
  });

  employee
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
    });
});

// Update an employee
router.delete("/:id", async (req, res) => {
  try {
    const removedEmployee = await Employee.findByIdAndRemove({
      _id: req.params.id,
    });
    res.json(removedEmployee);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    // console.log(req.body);
    const updatedEmployee = await Employee.updateOne(
      { _id: req.params.id },
      {
        $set: {
          appraised: true,
          productivity: req.body.productivity,
          attendance: req.body.attendance,
          qualityOfWork: req.body.qualityOfWork,
          targetAchievement: req.body.targetAchievement,
          remarks: req.body.remarks,
        },
      }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400);
    res.json({ message: err });
  }
});
module.exports = router;
