import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Llama al backend para obtener el clientSecret
      const { data } = await axios.post('/api/create-payment-intent', {
        amount: 5000, // 50 USD en centavos
        currency: 'usd',
      });

      // Procesa el pago con Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Pago exitoso. ¡Gracias por tu compra!');
      }
    } catch (error) {
      setMessage('Ocurrió un error. Inténtalo nuevamente.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;
