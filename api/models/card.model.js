import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    // Other payment-related information
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  
  export default Payment