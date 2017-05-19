/**
 * Do some DOM things here!
 */

import('fastclick')
  .then(FastClick => FastClick.attach(document.body))
  .catch(err => {
    throw err
  })

import('./app').catch(err => {
  throw err
})
