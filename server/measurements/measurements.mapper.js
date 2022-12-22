exports.mapMeasurementToDatabase = (measurement) => ({
  ...measurement,
  protein: measurement.protein.toFixed(2),
  fat: measurement.fat.toFixed(2),
  carbs: measurement.carbs.toFixed(2),
})