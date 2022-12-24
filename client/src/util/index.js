import dayjs from "dayjs"

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const sum = array => array.reduce((total, el) => total + el, 0)

export const mean = array => sum(array) / array.length

export const stdev = array =>
  Math.sqrt(
    array.reduce((total, el) => total + Math.pow(el - mean(array), 2), 0) /
      (array.length - 1)
  )

export const formatDate = date => dayjs(date).format('DD/MM/YYYY')