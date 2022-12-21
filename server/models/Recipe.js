const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
