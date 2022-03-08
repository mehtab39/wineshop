const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wineSchema = Schema({
  wine: {
    type: String,
    required: true,
  },
  winery: {
    type: String,
    required: true,
  },
  rating: {
    
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("wine", wineSchema);