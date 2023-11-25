const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    depenses: { type: Number },
    revenus: { type: Number },
    categorie: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
