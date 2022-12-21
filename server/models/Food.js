const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    reference: {
      type: ObjectId,
      ref: 'Reference',
      required: true,
    },

    recipe: {
      type: ObjectId,
      ref: 'Recipe',
    },

    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    quantity: {
      type: Number,
      default: 0,
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

    meal: {
      type: Number,
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

module.exports = mongoose.model('Food', foodSchema)
