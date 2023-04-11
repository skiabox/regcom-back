const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
  {
    customerCode: {
      type: String,
      required: true
    },
    taxId: {
      type: String,
      required: true
    },
    fiscalEndDate: {
      type: Date,
      required: true
    },
    companyType: {
      type: String,
      required: false,
      enum: [
        "ΑΕ",
        "ΕΠΕ",
        "AMKE",
        "ΔΗΜΟΣΙΟΣ ΦΟΡΕΑΣ",
        "ΕΕ",
        "ΙΔΡΥΜΑ",
        "ΙΚΕ",
        "ΜΚΟ",
        "ΟΕ"
      ]
    },
    memberShips: {
      type: [String],
      required: false,
      enum: ["ΕΒΕΑ", "ΑΛΛΟ"]
    },
    isRegulated: {
      type: Boolean,
      required: false
    },
    isListed: {
      type: Boolean,
      required: false
    },
    stocksExchange: {
      type: String,
      required: false,
      enum: ["ATHEX", "CY", "UK", "US"]
    },
    stocksExchangeMarket: {
      type: String,
      required: false,
      enum: ["ENA", "KYRIA"]
    },
    underSupervision: {
      type: Boolean,
      required: false
    },
    suspended: {
      type: Boolean,
      required: false
    },
    capitalization: {
      type: String,
      required: false,
      enum: ["Unknown", "Small", "Medium", "Large"]
    },
    subsidiaries: {
      type: [String],
      required: false
    },
    numberOfEmployees: {
      type: Number,
      required: false
    },
    turnover: {
      type: mongoose.Schema.Types.Decimal128,
      required: false
    },
    totalAssets: {
      type: mongoose.Schema.Types.Decimal128,
      required: false
    },
    websiteUrl: {
      type: String,
      required: false
    },
    industries: {
      type: [String],
      required: false,
      default: undefined
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
