const express = require("express");

//--rest of the code

const {
  createOrganization,
  getOrganization,
  getOrganizations,
  deleteOrganization,
  updateOrganization
} = require("../controllers/organizationController");
//get the authorization middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
//router.use(requireAuth);

//previous path from root server.js is /api/organizations

// GET all organizations
router.get("/", getOrganizations);

// GET a single organization
router.get("/:id", getOrganization);

// POST a new organization
router.post("/", requireAuth, createOrganization);

// DELETE an organization
router.delete("/:id", requireAuth, deleteOrganization);

// UPDATE an organization
router.patch("/:id", requireAuth, updateOrganization);

module.exports = router;
