

import React from 'react'

const SidebarButton = ({text,clickHandler}) => {
  return (
    <button className="sidebar-button" onClick={() => clickHandler()}>{text}</button>
  )
}

export default SidebarButton;