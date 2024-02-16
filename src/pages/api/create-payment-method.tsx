// pages/api/attach-payment-method.ts

import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';

const stripeClient = new stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { paymentMethodID, customerID } = req.body;
  try {
    const attachedPaymentMethod = await stripeClient.paymentMethods.attach(
      paymentMethodID,
      { customer: customerID }
    );

    // Payment method attached successfully
    res
      .status(200)
      .json({ success: true, paymentMethod: attachedPaymentMethod });
  } catch (error) {
    // Handle the error and return a JSON response with an error message
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the payment method.' });
  }
};
