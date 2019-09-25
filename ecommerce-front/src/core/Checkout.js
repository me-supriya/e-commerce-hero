import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { emptyCart } from './cartHelpers'
import { getCoupon } from '../admin/apiAdmin'
import { FaAmazonPay } from 'react-icons/fa'
import { razorpay } from '../config'
import { razorPayOptions } from './checkout.helper'
const Razorpay = window.Razorpay
const { user, token } = isAuthenticated()

const Checkout = ({ products }) => {
  const [values, setValues] = useState({
    code: '',
    discount: 0,
    invalidCode: false,
    applied: false
  })

  const { code, discount, applied, invalidCode } = values

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const applyCode = () => {
    getCoupon({ code }).then(data => {
      if (data.success && data.coupon.isActive) {
        setValues({ ...values, ['discount']: data.coupon.discount, ['applied']: true, ['invalidCode']: false })
      } else {
        setValues({ ...values, ['invalidCode']: true, ['applied']: false })
      }
    })
  }

  const productTax = 50
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price + productTax
    }, 0)
  }

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-raised btn-success">Pay Now</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-raised btn-warning">Sign in to checkout</button>
      </Link>
    )
  }

  // Razorpay

  const rzp1 = new Razorpay(
    razorPayOptions(applied ? getTotal() - productTax - discount : getTotal() - productTax, user)
  )
  const openRzrPay = event => {
    rzp1.open()
    event.preventDefault()
  }

  return (
    <div className="container-fluid">
      <table>
        <tbody>
          <tr>
            <td>
              <p>
                <a
                  className="btn btn-raised"
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Total Payable Amount: ₹ {getTotal()}
                  <FaAmazonPay
                    style={{
                      color: '#4CAF50',
                      fontSize: '1rem',
                      marginLeft: '.5rem'
                    }}
                  />
                </a>
              </p>
              <button onClick={openRzrPay} className="btn btn-raised btn-success" id="rzp-button1">
                Pay
              </button>

              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <tr>
                    <td>
                      <b>Price Summary</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-group">
                        <label className="text-muted">Apply Coupon</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange('code')}
                          value={code}
                          autoFocus
                          required
                        />
                      </div>
                      <button onClick={applyCode} className="btn btn-success active">
                        Apply Coupon
                      </button>{' '}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{invalidCode ? 'Invalid Coupon!' : applied ? `code applied successfully` : ''} </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Product Price- </td>
                    <td> ₹{getTotal() - productTax}</td>
                  </tr>
                  <tr>
                    <td> GST: </td>
                    <td>₹{productTax} </td>
                  </tr>
                  <tr>
                    <td> Discount: </td>
                    <td>₹{discount} </td>
                  </tr>
                  <tr>
                    <td> Total Amount= ₹ </td>
                    <td>{applied ? getTotal() - productTax - discount : getTotal() - productTax}</td>
                  </tr>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {showCheckout()}
    </div>
  )
}

export default Checkout
