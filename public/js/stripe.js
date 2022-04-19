/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51Kp4TjSFfyJTiTM4culxn1pwTa1i9BK7ZcQ74cIi1oCKPdamm5q3RwOeMPY1TuI9RAhTp1AJUGKOitIPhWkk94S700HFA4UUQs'
  );

  try {
    // Get checkout session from API endpoint
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // Create checkout form
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
