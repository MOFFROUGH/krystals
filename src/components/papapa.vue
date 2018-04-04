<template>
  <PayPal
  amount="10.00"
  currency="USD"
  :client="paypal"
  env="sandbox"
  v-on:paypal-paymentAuthorized="logAuthPayment"
  v-on:paypal-paymentCompleted="logCompletePayment"
  v-on:paypal-paymentCancelled="logCancelPayment">
</PayPal>
</template>
<script>
import PayPal from 'vue-paypal-checkout'
export default {
  data () {
    return {
      paypal: {
        sandbox: 'AQK3kcteHi9Z_PXFK1Jb4-13ZJrKXvUiZCORy-InNhFAQ4Pu6C8HdINKzOJxE0-3WElL0xQeqZnNcZ7t',
        production: 'AS8A-FEnFVhYly4xylHF8QJgXAG9KKF-070w3hlLIesRUrpNaVKZpwdyM5amt3rxs6FTReSsH3hVgZPS'
      }
    }
  },
  components: {
    PayPal
  },
  methods: {
    logAuthPayment (data) {
      console.log(data)
    },
    logCompletePayment (data) {
      console.log('payment complete')
    },
    logCancelPayment (data) {
      console.log('payment canceled')
    }
  }
}
</script>
