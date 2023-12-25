const express = require("express");

const router = express.Router();

router.use("/api", require("./api"));

router.use("/*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "No Api Found",
  });
});

router.use((error, req, res, next) => {
  return res.status(error.status || 400).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

module.exports = router;
