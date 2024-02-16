// pages/api/create-payment-intent.ts

import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';

const stripeClient = new stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const {
    amount,
    currency,
    customerID,
    description,
    address,
    pincode,
    city,
    state,
    country,
    name,
    paymentMethodID,
  } = req.body;

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency,
      customer: customerID,
      payment_method_types: ['card'],
      payment_method: paymentMethodID,
      description,
      shipping: {
        name: name,
        address: {
          line1: address,
          postal_code: pincode,
          city: city,
          state: state,
          country: country,
        },
      },
    });

    res.status(200).json({ paymentIntent });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
