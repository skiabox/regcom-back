const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const obligationSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    applyToAll: {
      type: Boolean,
      required: true
    },
    industries: {
      type: [String],
      required: false,
      default: undefined
    },
    size: {
      type: String,
      required: false,
      enum: ["Unknown", "Small", "Medium", "Large"],
      default: "Unknown"
    },
    isListed: {
      type: Boolean,
      required: false
    },
    inForceDate: {
      type: Date,
      required: true
    },
    pdfDocument: {
      type: String,
      required: true
    },
    mainCategory: {
      type: String,
      required: true,
      enum: [
        "AML",
        "Corporate Governance",
        "GDPR",
        "Real Estate",
        "SOX",
        "COVID-19",
        "HIPAA",
        "NIST"
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Obligation", obligationSchema);
