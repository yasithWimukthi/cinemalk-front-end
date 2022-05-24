import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartItem from "./CartItem";
import Swal from 'sweetalert2'
import "./cart.scss";
import { getCartByUserId } from "../../../API/Customer pages/CartAPI";


const Cart = () => {
  let totalNoOfBookings = 0;
  const [isPayFromCard, setIsPayFromCard] = useState(false);
  const [isPayFromMobile, setIsPayFromMobile] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState({});
  const [totalNoOfTickets, setTotalNoOfTickets] = useState(0);

  const uid = localStorage.getItem('user_id');

      // fetch theater details from backend theater service
      const getcartItems = () => {
        getCartByUserId("/api/cart/", uid)
          .then((res) => {
            setCartItems(res.data.cart.items);
            console.log('cart', res.data.cart);
            setCartDetails(res.data.cart)
            res.data.cart.items.map((item) => (
              totalNoOfBookings += item.noOfTickets
            ))
            setTotalNoOfTickets(totalNoOfBookings)
        
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
      getcartItems(); //details of all theaters will be fetched when component renders for the first time
    }, []);

  const showPayFromCard = () => {
    setIsPayFromCard(true);
  };


  const hidePayFromCard = () => {
    setIsPayFromCard(false);
  };

  const showPayFromMobile = () => {
    setIsPayFromMobile(true);
  };


  const hidePayFromMobile = () => {
    setIsPayFromMobile(false);
  };

  const payWithCard = (e) => {
    e.preventDefault();
    Swal.fire(
        'Payment is successful!',
        '',
        'success'
    )
  }

    const payWithMobile = (e) => {
      e.preventDefault();
      Swal.fire(
          'Payment is successful!',
          '',
          'success'
      )
    }

  return (
    <>
      <Container className="cart-page-wrapper">
        <h2></h2>
        {
          cartItems.map((item) => (
            <CartItem key={item._id} bookingDetails={item} />
          ))
        }
        {/* cart total */}
        <div className="total-price-card-wrapper">
          <Row>
            <Col sm={3} className="total-left-wrap">
            </Col >
            <Col sm={9} className="total-right-wrap">
              {/* <div className="total-right-card1">
                <h6 >Ticket price: </h6>
                <h6 >RS. 500.00</h6>
              </div> */}
              <div className="total-right-card1">
                <h6 >Total no of bookings: </h6>
                <h6 >{totalNoOfTickets}</h6>
              </div>
              <div className="total-right-card">
                <h6 >Total price: </h6>
                <h6 >{"RS. "+cartDetails.totalPrice+".00"}</h6>
              </div>
              <hr className="straight-line" />
              <div className="checkout-btn">
                <button data-toggle="modal" data-target="#staticBackdrop" onClick={showPayFromCard}>PAY FROM CARD</button>
                <button data-toggle="modal" data-target="#staticBackdrop" onClick={showPayFromMobile}>PAY FROM MOBILE</button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {
        isPayFromCard && (
        <div className="card mt-50 mb-50">
          <div className="card-title mx-auto">
            Pay From Card
          </div>
          <div className="nav">
            <ul className="mx-auto">
              <li><a href="#">Account</a></li>
              <li className="active"><a href="#">Payment</a></li>
            </ul>
          </div>
          <form onSubmit={payWithCard}>
            <div className="row row-1">
              <div className="col-2"><img className="img-fluid"
                                          src="https://img.icons8.com/color/48/000000/mastercard-logo.png"/></div>
            </div>
            <span id="card-header">Add new card:</span>
            <div className="row-1">
              <div className="row row-2">
                <span id="card-inner">Card holder name</span>
              </div>
              <div className="row row-2">
                <input type="text" placeholder="Bojan Viner"/>
              </div>
            </div>
            <div className="row three">
              <div className="col-7">
                <div className="row-1">
                  <div className="row row-2">
                    <span id="card-inner">Card number</span>
                  </div>
                  <div className="row row-2">
                    <input type="text" placeholder="5134-5264-4"/>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <input type="text" placeholder="Exp. date"/>
              </div>
              <div className="col-2">
                <input type="text" placeholder="CVV"/>
              </div>
            </div>
            <button type="submit" className="btn d-flex mx-auto"><b>Pay Now</b></button>
          </form>
        </div> )
      }

      {
          isPayFromMobile && (
              <div className="card mt-50 mb-50">
                <div className="card-title mx-auto">
                  Pay From Mobile
                </div>
                <div className="nav">
                  <ul className="mx-auto">
                    <li><a href="#">Account</a></li>
                    <li className="active"><a href="#">Mobile Number</a></li>
                  </ul>
                </div>
                <form onSubmit={payWithMobile}>
                  <span id="card-header">Add mobile:</span>
                  <div className="row-1">
                    <div className="row row-2">
                      <span id="card-inner">Owner name</span>
                    </div>
                    <div className="row row-2">
                      <input type="text" placeholder="Bojan Viner"/>
                    </div>
                  </div>
                  <div className="row-1">
                    <div className="row row-2">
                      <span id="card-inner">Mobile Number</span>
                    </div>
                    <div className="row row-2">
                      <input type="text" placeholder="0714044488"/>
                    </div>
                  </div>
                  <button type="submit" className="btn d-flex mx-auto"><b>Pay Now</b></button>
                </form>
              </div> )
      }

    </>
  );
};

export default Cart;
