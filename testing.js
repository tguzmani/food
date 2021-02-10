const moment = require('moment')

const weekNumber = moment('2021-01-31', 'YYYY-MM-DD').isoWeeks()

console.log(weekNumber)

console.log(
  moment('2021')
    .add(weekNumber + 1, 'weeks')
    .startOf('week')
    .format('YYYY-MM-DD')
)
