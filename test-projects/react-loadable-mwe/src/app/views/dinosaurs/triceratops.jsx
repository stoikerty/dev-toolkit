import imgTriceratops from 'img/triceratops.png'
import React from 'react'

const Triceratops = () => (
  <div>
    <h3>Shhh!</h3>
    <img src={ imgTriceratops } />
    <p>
      We’re either in a café in Paris or a coffee shop in New Jersey. I’m
      pretty sure I just came back from the doctor with life-changing news.
    </p>
  </div>
)

Triceratops.displayName = 'Triceratops'

export default Triceratops
