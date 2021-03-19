import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'


import { Cart } from '../Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faUndoAlt } from '@fortawesome/free-solid-svg-icons'

const Payment = (props) => {

  const home = <FontAwesomeIcon icon={faUndoAlt} size="2x" />
  const [firstRender, setFirstRender] = useState(true)
  const { cartTotal, setCartTotal } = useContext(Cart)

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [address, setAddress] = useState('')
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

    if (firstRender) {
      return setFirstRender(false)
    }

    name.length >= 3 ? setValidName('') : setValidName('(*) Minimum length: 3 characters')
    address.length > 0 ? setValidAddress('') : setValidAddress('(*)')
    number.length >= 9 ? setValidNumber('') : setValidNumber('9 digit format')
    const re = /\S+@\S+\.\S+/
    re.test(email) ? setValidEmail('') : setValidEmail('(*) Invalid Email')

    if (name.length >= 3 && re.test(email)) setValidSubmit(true)

  }, [name, number, email, address])


  return <div className="home">

    <div className="checkout">
      <Link to="/Hotels-Cart">{home}</Link>
      <Fade>

        <h1>Checkout</h1>

        <form>

          <Slide left>
            <label htmlFor="name">{validName}</label>
            <input onChange={(event) => setName(event.target.value)} value={name} type="text" minLength="3" placeholder="John Kowalsky" name="name" required></input>
          </Slide>

          <Slide right>
            <label htmlFor="address">{validAddress}</label>
            <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" placeholder="Address" name="address" required></input>
          </Slide>

          <Slide left >
            <label htmlFor="number">{validNumber}</label>
            <input onChange={(event) => setNumber(event.target.value)} value={number} maxLength="9" type="text" name="number" placeholder="+48" ></input>
          </Slide>

          <Slide right >
            <label htmlFor="email">{validEmail}</label>
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" name="email" placeholder="example@example.com" required></input>
          </Slide>

          <h3><span>$</span>{cartTotal}</h3>

          <button disabled={validSubmit ? false : true} type="submit">Submit Payment</button>

          {!validSubmit && <p>(*) required</p>}

        </form>

      </Fade>

    </div>

  </div>

}

export default Payment