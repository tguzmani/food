exports.mapReferenceToDatabase = reference => ({
  ...reference,
  protein: reference.protein.toFixed(2),
  fat: reference.fat.toFixed(2),
  carbs: reference.carbs.toFixed(2),
})

exports.mapReferenceToDomain = reference => reference._doc
