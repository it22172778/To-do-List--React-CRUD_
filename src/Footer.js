import React from 'react'

const Footer = ({Length}) => {
    
  return (
    <footer>{Length} list {Length === 1 ? "item" : "items"} </footer>
  )
}

export default Footer;