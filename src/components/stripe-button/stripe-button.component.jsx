import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const  StripeCheckoutButton = ({ price }) => {
  const priceFroStripe = price * 100;
  const publishableKey = 'pk_test_51IjnfjI0UousCRJpGb4dV18yvO3Wvb62QbALFPFJjQ2wznSWcb7YajJwlRdCvrBPbM2a44Zl1yu0qTtqDStuYCLb00GxobUftG'

  const onToken = token => {
    console.log(token);
    alert('payment succesfull')
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceFroStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;