import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function PriorityView(props) {
  return <div>Priority</div>
}

PriorityView.propTypes = {

}
function mapDispatchToProps(dispatch) {
  return {}
}
function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityView)
