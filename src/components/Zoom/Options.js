import React from 'react'
import Icon from '../Icon'
import { connect } from 'react-redux'
import {
    changeScale
  } from '../../viewport/actions'
 class Options extends React.Component{
    constructor(props){
        super(props)
        this.zoomIn=this.zoomIn.bind(this)
        this.zoomOut=this.zoomOut.bind(this)

    }
    zoomIn(){
        const zoomIntensity = 0.05
        const zoom = Math.exp(1*zoomIntensity)
       let {width,height} = this.props.screensize
        this.props.zoomIn(zoom,width/2,height/2)
    }
    zoomOut(){
        const zoomIntensity = 0.05
        const zoom = Math.exp(-1*zoomIntensity)
       let {width,height} = this.props.screensize
        this.props.zoomOut(zoom,width/2,height/2)
    }
    render( ){
        return(
            <div>
                <Icon name="minus-line.svg" size='small' withBackground={false} onClick={this.zoomOut}/>
                <Icon name="plus-line.svg" size='small' withBackground={false} onClick={this.zoomIn}/>
            
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        zoomIn: (zoom,x,y) => {
        return dispatch(changeScale(zoom,x,y))
      },
      zoomOut: (zoom,x,y) => {
        return dispatch(changeScale(zoom,x,y))
      }
    }
  }
  
  function mapStateToProps(state) {
    return {
        screensize: state.ui.screensize
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Options)