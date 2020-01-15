import React from 'react'

import Icon from '../Icon/Icon'

function iconForHierarchy(hierarchy) {
  let hierarchyIcon = ''
  if (hierarchy == 'Leaf') {
    hierarchyIcon = 'leaf.svg'
  } else if (hierarchy == 'Branch') {
    hierarchyIcon = 'branch-with-leaf.png'
  } else if (hierarchy == 'Trunk') {
    hierarchyIcon = 'trunk.png'
  } else if (hierarchy == 'Root') {
    hierarchyIcon = 'root.png'
  } else if (hierarchy == 'No Hierarchy') {
    hierarchyIcon = 'question-mark.svg'
  }

  return hierarchyIcon
}
export { iconForHierarchy }

function HierarchyIcon({ hierarchy, status, size, onClick }) {
  return (
    <Icon
      name={iconForHierarchy(hierarchy)}
      size={size}
      className={`not-hoverable ${status ? status : 'grey'}`}
      onClick={onClick}
    />
  )
}

export default HierarchyIcon
