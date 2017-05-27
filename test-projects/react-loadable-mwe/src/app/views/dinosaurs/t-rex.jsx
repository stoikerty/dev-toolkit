import imgTRex from 'img/t-rex.png'
import React from 'react'

const TRex = () => (
  <div>
    <h3>Rawr!</h3>
    <img src={ imgTRex } />
    <p>Were you scared? Tell me honestly.</p>
  </div>
)

TRex.displayName = 'TRex'

export default TRex
