import { Link } from 'react-router-dom'
import React from 'react'

const DinoMain = () => (
  <div>
    <h3>Which dino do you want to visit?</h3>
    <Link to="/dinosaurs/t-rex">The mighty T-Rex, please!</Link>
    <br />
    <Link to="/dinosaurs/triceratops">The mighty Triceratops, please!</Link>
  </div>
)

DinoMain.displayName = 'DinoMain'

export default DinoMain
