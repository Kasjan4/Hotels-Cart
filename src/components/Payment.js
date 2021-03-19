import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'


import { Cart } from '../Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useScrollTrigger } from '@material-ui/core'

const Payment = (props) => {

  const { cartTotal, setCartTotal } = useContext(Cart)

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAdrress] = useState('')
  const [email, setEmail] = useState('')

  const [validName, setValidName] = useState('')
  const [validNumber, setValidNumber] = useState('')
  const [validAddress, setValidAddress] = useState('')
  const [validEmail, setValidEmail] = useState('')

  const [validSubmit, setValidSubmit] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {


    const x = name.length >= 3 ? setValidName('') : setValidName('Minimum length: 3 characters')
    const y = number.length < 9 ? setValidNumber('Minimum length: 9 digits') : setValidNumber('')
    const re = /\S+@\S+\.\S+/
    const z = re.test(email) ? setValidEmail('') : setValidEmail('Invalid Email')

    if (x && y && z) setValidSubmit(true)

  }, [name, number, email])


  return <div className="home">


    <div className="checkout">

      <h1>Checkout</h1>

      <form>

        <Slide left delay={200}>
          <label htmlFor="name">{validName}</label>
          <input onChange={(event) => setName(event.target.value)} value={name} type="text" minLength="3" placeholder="John Kowalsky" name="name" required></input>
        </Slide>

        <Slide right delay={200}>
          <label htmlFor="address">{validAddress}</label>
          <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" placeholder="Address" name="address" required></input>
        </Slide>

        <Slide left delay={200}>
          <label htmlFor="number">{validNumber}</label>
          <input onChange={(event) => setNumber(event.target.value)} value={number} minLength="9" maxLength="9" type="number" name="number" placeholder="+48" ></input>
        </Slide>

        <Slide right delay={200}>
          <label htmlFor="email">{validEmail}</label>
          <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" name="email" placeholder="example@example.com"></input>
        </Slide>

        <h3><span>$</span>{cartTotal}</h3>

        <Fade delay={200}>
          <button disabled={validSubmit ? false : true} type="submit">Submit Payment</button>
        </Fade>

      </form>

    </div>

  </div>

}

export default Payment