/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

/* constants */
const SET_IS_RENDER = 'SET_IS_RENDER'
const UNSET_IS_RENDER = 'UNSET_IS_RENDER'

/* action creator functions */

// parentAddress is optional
function setIsRender() {
   return {
    type: SET_IS_RENDER
  }
}
function unsetIsRender() {
    return {
     type: UNSET_IS_RENDER
   }
 }



export {
    SET_IS_RENDER,
    UNSET_IS_RENDER,
    setIsRender,
    unsetIsRender
}