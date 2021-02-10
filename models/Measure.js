const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const measureSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    weight: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    sleep: {
      type: Number,
      default: 0,
    },

    calories: {
      type: Number,
      default: 0,
    },

    alcohol: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Measure', measureSchema)
