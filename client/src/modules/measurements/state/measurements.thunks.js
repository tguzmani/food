import { thunk } from 'easy-peasy'
import MeasurementsRepository from './measurements.repository'

const measurementsRepository = new MeasurementsRepository()

const measurementThunks = {
  createMeasurement: thunk(async (actions, measurement, { fail }) => {
    try {
      const createdMeasurement = await measurementsRepository.createMeasurement(
        measurement
      )
      actions.appendMeasurement(createdMeasurement)
    } catch (error) {
      fail(error)
    }
  }),

  readMeasurements: thunk(async (actions, _, { fail }) => {
    try {
      const measurements = await measurementsRepository.readMeasurements()
      actions.setMeasurements(measurements)
    } catch (error) {
      fail(error)
    }
  }),

  readMeasurementsByDate: thunk(async (actions, { from, to }, { fail }) => {
    try {
      
      const measurementsByQuery =
        await measurementsRepository.readMeasurementsByDate(from, to)

      actions.setMeasurementsByQuery(measurementsByQuery)
    } catch (error) {
      fail(error)
    }
  }),

  updateMeasurement: thunk(async (actions, measurement, { fail }) => {
    try {
      const updatedMeasurement = await measurementsRepository.updateMeasurement(
        measurement
      )
      actions.replaceMeasurement(updatedMeasurement)
    } catch (error) {
      fail(error)
    }
  }),

  deleteMeasurement: thunk(async (actions, measurement, { fail }) => {
    try {
      const removedMeasurement = await measurementsRepository.deleteMeasurement(
        measurement
      )
      actions.filterMeasurements(removedMeasurement)
    } catch (error) {
      fail(error)
    }
  }),
}

export const measurementsThunksNames = Object.keys(measurementThunks).map(
  key => key
)

export default measurementThunks
