const Obligation = require("../models/obligationModel");
const mongoose = require("mongoose");
const fs = require("fs");

// GET all obligations
const getObligations = async (req, res) => {
  console.log("INSIDE GET OBLIGATIONS");
  try {
    const obligations = await Obligation.find({}).sort({ createdAt: -1 });
    res.status(200).json(obligations);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// GET a single obligation
const getObligation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such obligation" });
  }
  try {
    const obligation = await Obligation.findById(id);
    //if there is not an obligation with this id, return a 404
    if (!obligation) return res.status(404).json({ msg: "No such obligation" });
    res.status(200).json(obligation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Create a new obligation
const createObligation = async (req, res) => {
  console.log("INSIDE CREATE OBLIGATION");
  //isListed, industries, size are optional fields
  const {
    title,
    inForceDate,
    mainCategory,
    applyToAll,
    isListed,
    industries,
    size
  } = req.body;
  const fileExists = req.file;
  console.log("request body", req.body);
  console.log("request file", req.file);

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!applyToAll) emptyFields.push("applyToAll");
  if (!inForceDate) emptyFields.push("inForceDate");
  if (!mainCategory) emptyFields.push("mainCategory");
  if (!fileExists) emptyFields.push("pdfDocument");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    const obligation = await Obligation.create({
      title,
      applyToAll,
      inForceDate,
      mainCategory,
      isListed,
      industries,
      size,
      pdfDocument: req.file.originalname
    });
    res.status(201).json(obligation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete an obligation
const deleteObligation = async (req, res) => {
  const { id } = req.params;

  //Check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such obligation" });
  }

  try {
    const obligation = await Obligation.findOneAndDelete({ _id: id });
    //if there is not an obligation with this id, return a 404
    if (!obligation) return res.status(404).json({ msg: "No such obligation" });
    //delete the file from the uploads folder
    console.log(
      "Inside delete command --> obligation.pdfDocument",
      obligation.pdfDocument
    );
    fs.unlink(`uploads/${obligation.pdfDocument}`, err => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
    });
    res.status(200).json(obligation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update an obligation
const updateObligation = async (req, res) => {
  const { id } = req.params;

  //Check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such obligation" });
  }

  try {
    const obligation = await Obligation.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );
    //if there is not an obligation with this id, return a 404
    if (!obligation) return res.status(404).json({ msg: "No such obligation" });
    res.status(200).json(obligation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getObligations,
  getObligation,
  createObligation,
  deleteObligation,
  updateObligation
};
