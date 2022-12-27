import { action } from 'easy-peasy'

const measurementsActions = {
  appendMeasurement: action((state, measurement) => {
    state.measurements = [measurement, ...state.measurements]
  }),

  setMeasurements: action((state, measurements) => {
    state.measurements = measurements
  }),

  setMeasurementsByQuery: action((state, measurementsByQuery) => {
    state.measurementsByQuery = measurementsByQuery
  }),

  filterMeasurements: action((state, measurement) => {
    state.measurements = state.measurements.filter(
      stateMeasurement => stateMeasurement._id !== measurement._id
    )
  }),

  replaceMeasurement: action((state, measurement) => {
    state.measurements = state.measurements.map(stateMeasurement =>
      stateMeasurement._id === measurement._id ? measurement : stateMeasurement
    )
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
}

export default measurementsActions
