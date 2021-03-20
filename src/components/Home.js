import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Cart } from '../Cart'
import Skeleton from 'react-loading-skeleton'


const Home = () => {

  // hotels from api
  const [hotels, setHotels] = useState([])
  // axios on error handler
  const [fetchError, setFetchError] = useState(false)

  // global context storage of cart total value
  const { cartTotal, setCartTotal } = useContext(Cart)
  // skeleton loader
  const [skeletonLoad, setSkeletonLoad] = useState(true)
  const trash = <FontAwesomeIcon icon={faTrash} size="2x" />

  useEffect(() => {
    // fetching the hotels
    try {
      axios.get('https://60532e9a45e4b30017291055.mockapi.io/hotels')
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data)
            if (error.response.status === 404) {
              setFetchError(true)
            }
          }
        })
        .then((resp) => {
          const hotels = resp.data
          setHotels(hotels)
        })

    } catch (error) {
      console.log(error.response)
    }

  }, [])

  useEffect(() => {
    // recalculate the total sum after every change of hotels state
    let updatedSum = 0
    for (let i = 0; i < hotels.length; i++) {
      updatedSum += hotels[i].nights * hotels[i].price
      setCartTotal(numberWithCommas(updatedSum))
    }

  }, [hotels])

  useEffect(() => {
    // skeleton loader timeout on initial render
    setTimeout(() => {
      setSkeletonLoad(false)
    }, 2500)
  }, [])

  function handleNights(event) {
    // handle both the select and add/remove buttons
    const id = event.target.value

    let updatedHotels = [...hotels]

    if (event.target.name.length > 6) {
      for (let i = 0; i < updatedHotels.length; i++) {
        if (updatedHotels[i].id == event.target.name) {
          updatedHotels[i].nights = Number(event.target.value)
        }
        setHotels(updatedHotels)
      }
    }

    else if (event.target.name === 'add') {
      for (let i = 0; i < updatedHotels.length; i++) {

        if (updatedHotels[i].id == id) {
          if (updatedHotels[i].nights == 14) return
          updatedHotels[i].nights = updatedHotels[i].nights += 1
        }
        setHotels(updatedHotels)
      }
    }
    else if (event.target.name === 'remove') {
      for (let i = 0; i < updatedHotels.length; i++) {
        if (updatedHotels[i].id == id) {
          if (updatedHotels[i].nights == 0) return
          updatedHotels[i].nights = updatedHotels[i].nights -= 1
        }
        setHotels(updatedHotels)
      }
    }
  }

  function handleDelete(event) {
    let updatedHotels = hotels.filter(x => x.id != event.target.value)
    setHotels(updatedHotels)
  }

  function numberWithCommas(x) {
    // commafy prices after each 1000
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }


  return <div className="home">

    {fetchError && <div className="error-screen">
      <h2>Something went wrong! Try again</h2>
    </div>}

    {hotels.length > 0 && <div className="cart">

      <Fade>
        <h1>Cart</h1>
      </Fade>


      {hotels.map((hotel, index) => {

        return <Fade key={index}>
          {/* map out the hotels from state */}
          {skeletonLoad ? <Skeleton height={'30vh'} width={'64vw'} /> : <div className="cart__entry" key={index}>

            <div className="cart__entry__img">
              <img src={hotel.img} alt={hotel.name}></img>
            </div>

            <div className="cart__entry__info">
              <h3>{hotel.name}</h3>
              <p>{hotel.sub}</p>
            </div>

            <div className="cart__entry__manage">

              <div className="cart__entry__manage__nights" >
                <div>
                  <button value={hotel.id} name="remove" disabled={hotel.nights == 0 ? true : false} onClick={handleNights}>-</button>

                  <select value={hotel.nights} name={hotel.id} onChange={handleNights}>
                    {Array.from(Array(15), (e, i) => {
                      return <option key={i}>{i}</option>
                    })}
                  </select>

                  <button value={hotel.id} name="add" onClick={handleNights} disabled={hotel.nights == 14 ? true : false} >+</button>
                </div>
              </div>

              <div className="cart__entry__manage__price">
                <h3><span>$</span>{numberWithCommas(hotel.price * hotel.nights)}</h3>
                <button value={hotel.id} name="Remove hotel" onClick={handleDelete}>{trash}</button>
              </div>

            </div>

          </div>}

        </Fade>

      })}

      <div className="cart__result">
        <div className="cart__result__total">

          <h2><span>$</span>{String(cartTotal)}</h2>
          <Link to="/payment">CHECKOUT</Link>

        </div>
      </div>

    </div>
    }

  </div >

}

export default Home