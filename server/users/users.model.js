const mongoose = require('mongoose')
const dayjs = require('dayjs')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    units: {
      type: String,
      default: 'lb',
    },

    role: {
      type: String,
      default: 'user',
    },

    goals: {
      protein: {
        type: Number,
      },

      carbs: {
        type: Number,
      },

      fat: {
        type: Number,
      },
      
    },

    baseWeight: {
      type: Number,
    },

    activity: {
      type: Number,
    },

    birthdate: {
      type: Date,
    },

    height: {
      type: Number,
    },

    offset: {
      type: Number,
      default: 0,
    },

    offsetMode: {
      type: String,
    },

    gender: {
      type: String,
    },

    sex: {
      type: String,
    },

    isSetupComplete: {
      type: Boolean,
      default: false,
    },

    proteinPref: {
      type: Number,
    },

    fatPref: {
      type: Number,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    isPremiumUntil: {
      type: Date,
      default: new Date()
    },

    themeMode: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    }
  },
  { timestamps: true }
)

userSchema.virtual('age').get(function () {
  return dayjs().diff(dayjs(this.birthdate), 'year')
})

userSchema.virtual('baseWeightInKg').get(function () {
  return this.units === 'lb' ? this.baseWeight / 2.2 : this.baseWeight
})

userSchema.virtual('baseWeightInLb').get(function () {
  return this.units === 'kg' ? this.baseWeight * 2.2 : this.baseWeight
})

userSchema.virtual('bmr').get(function () {
  if (this.sex === 'm') {
    return (
      66.5 +
      13.75 * this.baseWeightInKg +
      5.003 * this.height -
      6.755 * this.age
    )
  }

  return (
    655.1 + 9.563 * this.baseWeightInKg + 1.85 * this.height - 4.676 * this.age
  )
})

userSchema.virtual('bmrActivity').get(function () {
  return this.bmr * this.activity
})

userSchema.virtual('bmrGoal').get(function () {
  const offsetMultiplier =
    this.offsetMode === 'deficit'
      ? -1
      : this.offsetMode === 'maintenance'
      ? 0
      : 1

  const offset = this.offset * offsetMultiplier

  return this.bmrActivity + offset
})

userSchema.virtual('macroGoals').get(function () {
  const protein = this.baseWeightInLb * this.proteinPref
  const fat = (this.bmrGoal * this.fatPref) / (100 * 9)
  const carbs = (this.bmrGoal - fat * 9 - protein * 4) / 4

  return { protein, fat, carbs }
})

module.exports = mongoose.model('User', userSchema)
