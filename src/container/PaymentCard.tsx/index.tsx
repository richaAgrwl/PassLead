import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { LeadPurchase } from '@/redux/action/LeadPurchase';
import { AnyAction } from '@reduxjs/toolkit';
import { checkSVG } from '@/svg';

const PaymentCard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { price, lead_id, lead_title, lead_description } = router.query;

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: '27px',
        color: '#212529',
        fontSize: '1.1rem',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#F99A52',
      },
    },
    showIcon: true,
  };
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const token = useAppSelector(
    (state: RootState) => state.login.user_info.token
  );

  const user = useAppSelector((state: RootState) => state.login.user);

  const customerID = user.customer_id;
  const address = user.address;
  const pincode = user.pinCode;
  const city = user.city;
  const state = user.state;
  const country = user.country;

  const handleSubmit = async (event: any) => {
    // Prevent default form submission
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);
    setErrorMsg('');
    const amount = price;
    const currency = 'USD';
    try {
      const billingDetails = {
        name,
        email,
        address: {
          state,
          city,
          line1: address,
          postal_code: pincode,
        },
      };
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: billingDetails,
      });
      if (paymentMethodResult.error) {
        setErrorMsg(paymentMethodResult.error.message as string);
      } else {
        const paymentMethodID = paymentMethodResult.paymentMethod.id;

        // First API call to /api/attach-payment-method
        const response = await fetch('/api/create-payment-method', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodID, customerID }),
        });

        if (response.ok) {
          // Payment method attached successfully
          const data = await response.json();

          // Second API call to /api/create-payment-intent
          const description = `buy for ${lead_title} lead`;
          const createPaymentIntentResponse = await fetch(
            '/api/create-payment-intent',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount,
                currency,
                customerID,
                description,
                address,
                city,
                state,
                pincode,
                country,
                name,
                paymentMethodID,
              }),
            }
          );

          if (createPaymentIntentResponse.ok) {
            const createPaymentIntentData =
              await createPaymentIntentResponse.json();

            const paymentIntentClientSecret =
              createPaymentIntentData.paymentIntent.client_secret;

            const { paymentIntent, error } = await stripe.confirmCardPayment(
              paymentIntentClientSecret,
              {
                payment_method: {
                  card: elements.getElement(CardNumberElement) as any,
                  billing_details: {
                    name: name,
                    email: email,
                    address: {
                      line1: address,
                      city,
                      postal_code: pincode,
                      state,
                    },
                  },
                },
              }
            );

            if (error) {
              // Handle payment confirmation error
            } else if (paymentIntent.status === 'succeeded') {
              const payment_details = {
                price: paymentIntent.amount,
                leadId: lead_id,
                payment_method: paymentIntent.payment_method_types[0],
                payment_id: paymentIntent.id,
              };
              dispatch(
                LeadPurchase(payment_details, router) as unknown as AnyAction
              );
              event.target.reset();
            }
          } else {
            const createPaymentIntentErrorData =
              await createPaymentIntentResponse.json();
            console.error(
              'Error creating Payment Intent:',
              createPaymentIntentErrorData.error
            );
          }
        } else {
          // Handle errors from the first API call
          const errorData = await response.json();
          console.error('Error:', errorData.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false after handling the response
    }
  };

  return (
    <React.Fragment>
      <div className='container  mt-5'>
        <div className='payment_container'>
          <h4 className=' payment_heading text-light text-center mb-3 p-3'>
            <span className=' '>Pay with card</span>
          </h4>
          <div className='card_data'>
            <div className='row'>
              <div className='col-md-7 sm-12 lg-6'>
                <div className='form_data'>
                  <form onSubmit={handleSubmit}>
                    <div className='row mt-3'>
                      <div className='col-md-12 mb-3'>
                        <div className='form-group'>
                          <label htmlFor='cc-number'>Card Number</label>

                          <CardNumberElement
                            id='cc-number'
                            className='form-control'
                            options={CARD_ELEMENT_OPTIONS}
                          />
                        </div>
                      </div>
                      <div className='col-md-6 mb-3 '>
                        <div className='form-group'>
                          <label htmlFor='cc-name'>Name on card</label>
                          <input
                            id='cc-name'
                            type='text'
                            className='form-control'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='col-md-6 mb-3'>
                        <div className='form-group'>
                          <label htmlFor='cc-email'>Email</label>
                          <input
                            id='cc-email'
                            type='text'
                            className='form-control'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='col-md-6 mb-3'>
                        <div className='form-group'>
                          <label htmlFor='expiry'>Expiration Date</label>
                          <CardExpiryElement
                            id='expiry'
                            className='form-control'
                            options={CARD_ELEMENT_OPTIONS}
                          />
                        </div>
                      </div>
                      <div className='col-md-6 mb-3'>
                        <div className='form-group'>
                          <label htmlFor='cvc'>CVC</label>
                          <CardCvcElement
                            id='cvc'
                            className='form-control'
                            options={CARD_ELEMENT_OPTIONS}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className='mb-4' />
                    <div className='row g-3'>
                      <div className='col-md-6 col-sm-6  col-12 col-lg-6'>
                        <button
                          className='btn card_btn'
                          type='submit'
                          disabled={loading}
                        >
                          {loading ? (
                            <div
                              className='spinner-border spinner-border-sm text-light'
                              role='status'
                            ></div>
                          ) : (
                            `PAY $${price}`
                          )}
                        </button>
                      </div>
                      <div className='col-md-6 col-sm-6 col-lg-6 col-12'>
                        <button
                          className='btn card_btn_cancel '
                          onClick={() => router.back()}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className='error-container'>
                        {errorMsg && (
                          <div className='text-danger mt-2'>{errorMsg}</div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-md-5 sm-12 lg-5 '>
                <div className='payment_detail'>
                  <h4 className=' mt-4'>Lead : {lead_title}</h4>
                  <p className='mb-4'>Description: {lead_description}</p>
                  <div className='capsule_container'>
                    <div className='capsule'>
                      {checkSVG} <div className='m-0 p-0'>Email</div>
                    </div>
                    <div className='capsule'>
                      {checkSVG} <div className='m-0 p-0'>Phone Number</div>
                    </div>
                    <div className='capsule'>
                      {checkSVG} <div className='m-0 p-0'>City Location</div>
                    </div>
                    <div className='capsule'>
                      {checkSVG} <div className='m-0 p-0'>Country</div>
                    </div>
                    <div className='capsule'>
                      {checkSVG} <div className='m-0 p-0'>Cost</div>
                    </div>
                    <div className='capsule'>
                      {checkSVG}{' '}
                      <div className='m-0 p-0'>Application Number</div>
                    </div>
                  </div>
                  <h5 className=' mt-4'>Amount : ${price}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentCard;
