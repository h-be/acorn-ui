

const SET_COORDINATES = 'SET_COORDINATES'
function setCoordinate(coordinates) {
  return {
   type: SET_COORDINATES,
   payload: {
    coordinates
   }
 }
}


export {
    SET_COORDINATES,
    setCoordinate,
}