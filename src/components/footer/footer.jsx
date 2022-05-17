import React from 'react';
import "./footer.scss"
const footer = () => {
    return (
        <footer className='footer'>
            <div className='container text-light pt-5 w-100'>
                <div className='row'>
                    <div className='col  mb-5' >
                        <div className='footer-title'>
                            <h6 className='footer-h6'>About Us</h6>
                        </div>
                        <div className='footer-content'>
                            <p>
                                <small className='text-muted'>
                                    Aenean suscipit eget mi act fermentum phasellus vulputate
                                    turpis tincidunt. Aenean suscipit eget. Aenean suscipit eget
                                    mi act fermentum phasellus vulputate turpis tincidunt. Aenean
                                    suscipit ege Aenean suscipit eget mi act fermentum phasellus.
                                </small>
                            </p>
                        </div>
                    </div>


                    <div className='col mb-5 offset-1'>

                    </div>
                    <div className='col mb-5 d-flex flex-column  justify-content-center align-items-center'>
                        <div className='footer-title'>
                            <h6 className='footer-h6'>Contact Us</h6>
                        </div>
                        <div className='footer-content'>
                            <p className='text-muted'>
                                <small>Address : 123 main street, Algiers, Algeria</small>
                            </p>
                            <p className='text-muted'>
                                <small>Phone : +213 (0) 123 456 789</small>
                            </p>
                            <p className='text-muted'>
                                <small>E-mail : contact@email.com</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom-footer pt-1 pb-1 text-center'>
                <small>© All Right Reserved</small>
            </div>
        </footer>
    );
};

export default footer;
