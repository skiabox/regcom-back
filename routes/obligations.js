const express = require("express");
//get the file middleware
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //let ext = path.extname(file.originalname);
    cb(null, file.originalname);
  }
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

//--rest of the code

const {
  createObligation,
  getObligation,
  getObligations,
  deleteObligation,
  updateObligation
} = require("../controllers/obligationController");
//get the authorization middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//previous path from root server.js is /api/workouts

// GET all workouts
router.get("/", getObligations);

// GET a single workout
router.get("/:id", getObligation);

console.log("upload object inside routes/obligations.js", upload);
console.log("upload.single object inside routes/obligations.js", upload.single);

// POST a new workout
router.post("/", upload.single("pdfDocument"), createObligation);

// DELETE a workout
router.delete("/:id", deleteObligation);

// UPDATE a workout
router.patch("/:id", updateObligation);

module.exports = router;
