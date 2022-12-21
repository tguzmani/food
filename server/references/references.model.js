const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const referenceSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    isDirty: {
      type: Boolean,
      default: false,
    },

    isAlcohol: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Reference', referenceSchema)
