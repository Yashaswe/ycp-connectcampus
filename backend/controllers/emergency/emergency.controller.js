const Prisma = require("../../utils/prisma");

const createEmergency = async(req, res) => {
  const departmentName = req.body.departmentName;
  const phoneNumber = req.body.phoneNumber;

  await Prisma.emergency.create({
    data: {
      departmentName,
      phoneNumber
    }
  });

  res.status(200);
  res.json({
    "message": "successfully created contact"
  });
};

const getAllEmergencies = async(req, res) => {
  // res.json({"message": "hello world"});
  const emergencies = await Prisma.emergency.findMany();
  res.status(200);
  res.json({
    "emergencies": emergencies
  });
};

const getEmergenciesByDept = async(req, res) => {
  const dept = req.body.departmentName;
  if (dept) {
    const emergencies = await Prisma.emergency.findMany({
      where: {
        departmentName
      }
    });
    res.status(200);
    res.json({
      "emergencies": emergencies
    });
  } else {
    res.status(401);
    res.json({
      "message": "departmentName is required"
    });
  }
};

module.exports = { createEmergency, getAllEmergencies, getEmergenciesByDept };
