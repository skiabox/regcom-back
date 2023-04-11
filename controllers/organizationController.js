const Organization = require("../models/organizationModel");
const mongoose = require("mongoose");

// GET all organizations
const getOrganizations = async (req, res) => {
  console.log("INSIDE GET ORGANIZATIONS");
  try {
    const organizations = await Organization.find({}).sort({ createdAt: -1 });
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// GET a single organization
const getOrganization = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such organization" });
  }
  try {
    const organization = await Organization.findById(id);
    //if there is not an organization with this id, return a 404
    if (!organization)
      return res.status(404).json({ msg: "No such organization" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Create a new organization
const createOrganization = async (req, res) => {
  console.log("INSIDE CREATE ORGANIZATION");
  //isListed, industries, size are optional fields
  const { customerCode, fiscalEndDate, taxId } = req.body;
  //const fileExists = req.file;
  console.log("request body", req.body);
  //console.log("request file", req.file);

  let emptyFields = [];

  if (!customerCode) emptyFields.push("customerCode");
  if (!taxId) emptyFields.push("taxId");
  if (!fiscalEndDate) emptyFields.push("fiscalEndDate");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    const organization = await Organization.create({
      customerCode,
      taxId,
      fiscalEndDate
    });
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete an organization
const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  //Check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such organization" });
  }

  try {
    const organization = await Organization.findOneAndDelete({ _id: id });
    //if there is not an organization with this id, return a 404
    if (!organization)
      return res.status(404).json({ msg: "No such organization" });

    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update an organization
const updateOrganization = async (req, res) => {
  const { id } = req.params;

  //Check if id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such organization" });
  }

  try {
    const organization = await Organization.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );
    //if there is not an organization with this id, return a 404
    if (!organization)
      return res.status(404).json({ msg: "No such organization" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getOrganizations,
  getOrganization,
  createOrganization,
  deleteOrganization,
  updateOrganization
};
