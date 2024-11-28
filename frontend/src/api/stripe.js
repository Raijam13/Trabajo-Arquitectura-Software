import { loadStripe } from '@stripe/stripe-js';

// Inicializa Stripe
const stripePromise = loadStripe('pk_test_51QQ9svG1BfGQJkwde5y3OJM4s5XYH5F8AvEoWSHl5E8buQM8SyGpwd2csE7rAIW5UuK2Gpg6rlB62sTBKejbE8c300gl78CkQj');

export default stripePromise;
