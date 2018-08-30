import React from 'react'
import FullScreenIcon from '../../icons/components/full-screen'
import './full-screen.css'

const FullScreen = (props) => (
  <div 
    className="FullScreen"
    onClick={props.handleFullScreen}
  >
    <FullScreenIcon
      {...props}
      size={25}
      color="white"
    />
  </div>
)

export default FullScreen