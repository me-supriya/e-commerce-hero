exports.razorPayOptions = (amount, user) => {
  const { name, email } = user
  return {
    key: 'rzp_test_0mlNFirdUPWdIU',
    amount: amount ? amount * 100 : 50000, // 50000 refers to 50000 paise or INR 500.
    currency: 'INR',
    name: 'E-comm',
    description: 'An e-commerce for developers',
    image: 'https://img.etimg.com/thumb/height-450,width-800,msid-63110702,imgsize-12508/razorpay.jpg',
    // order_id: 'order_9A33XWu170gUtm',
    handler: function(response) {
      alert(response.razorpay_payment_id)
    },
    prefill: {
      name: name || 'name',
      email: email || 'example@example.com',
      contact: ''
    },
    notes: {
      address: 'Address'
    },
    theme: {
      color: '#F37254'
    }
  }
}
