import React from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow.png'
const Player = () => {
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" />
      <iframe width='90%' height='90%' src="https://www.youtube.com/embed/hlfz1ep8IL4" title="trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default Player
