import React from 'react'

import { connect } from 'react-redux'

const ListExport = (props) => {
    return (
      <a href={url(props.type,props.data)} download={props.download}><p>{props.title}</p></a>
    )
  }

function mapDispatchToProps(dispatch) {
    return {

    }
  }
function url(type,data){
  let blob ={}
  if(type==="json"){
     blob = new Blob([JSON.stringify(data)],{type:""})
  }else{
    blob = new Blob([data],{type:"text/csv"})
  }
  const url =window.URL.createObjectURL(blob)
  return url
}
  function mapStateToProps(state) {
      
    return {
      data:state
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListExport)