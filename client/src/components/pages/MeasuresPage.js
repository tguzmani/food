import React from 'react'
import { connect } from 'react-redux'
import { readMeasures } from '../../state/measure/measureActions'

const MeasuresPage = ({ readMeasures, measures, loading }) => {
  React.useEffect(() => {
    if (measures.length === 0) readMeasures()
  }, [])

  if (measures.length === 0 && loading) return <div>Loading...</div>

  return <div>{JSON.stringify(measures)}</div>
}

const mapActionsToProps = { readMeasures }

const mapStateToProps = state => ({
  measures: state.measure.measures,
  loading: state.measure.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(MeasuresPage)
