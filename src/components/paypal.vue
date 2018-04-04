<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-card class="mt-2">
        <v-card-media :src="src" height="275px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{image.vixen}}</h3>
            <div>{{image.location}}</div>
            <span class="mr-2"><i :class="image.color+'--text fa fa-'+image.icon"></i>{{image.class}}</span>
            <span class="mr-2"> <i class="fa fa-fire orange--text"></i>Hot</span>
            <span class="mr-2"><v-icon light class="green--text">verified_user</v-icon>Verified</span>
          </div>
        </v-card-title>
        <v-list class="purple lighten-3">
          <v-list-tile avatar class="blue elevation-1 ma-2">
            <v-list-tile-content>
              <v-list-tile-title v-text="image.vixen">
              </v-list-tile-title>
              <v-list-tile-title v-text="image.location">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!-- <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-flex>
  <div v-show="message">
    <v-snackbar
    :timeout="6000"
    :color="syscolor"
    v-model="snackbar"
    class=""
    >
    {{ message }}
    <v-btn dark flat @click.native="snackbar = false">X</v-btn>
  </v-snackbar>
</div>
<v-flex xs12 md6>
  <v-card class="ml-2 mt-2">
    <v-card-media src="/static/img/fg.png" height="300px" class="hidden-xs-only">
    </v-card-media>
    <v-card-title primary-title>
    </v-card-title>
    <v-list class="purple lighten-3">
      <v-list-tile avatar class="blue elevation-1 ma-2">
        <v-list-tile-content>
          <v-list-tile-title v-text="offer.budget">
          </v-list-tile-title>
          <v-list-tile-title v-text="offer.timefor">
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile avatar class="blue elevation-1 ma-2">
        <v-list-tile-content>
          <v-list-tile-title v-text="offer.duration">
          </v-list-tile-title>
          <v-list-tile-title>
            from: {{date}}
          </v-list-tile-title>
          <v-list-tile-title>
            to: {{enddate}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-card-actions>
      <div class="text-xs-center">
        <PayPal
        :amount="offer.payment"
        currency="USD"
        :client="paypal"
        env="sandbox"
        :buttonStyle="myStyle"
        v-on:paypal-paymentAuthorized="logAuthPayment"
        v-on:paypal-paymentCompleted="logCompletePayment"
        v-on:paypal-paymentCancelled="logCancelPayment">
      </PayPal>
    </div>


  </v-card-actions>
</v-card>
</v-flex>
</v-layout>
</template>

<script>
import PayPal from 'vue-paypal-checkout'
export default {
  components: {
    PayPal
  },
  data () {
    return {
      vixenid: null,
      serviceid: null,
      user: null,
      date: null,
      enddate: null,
      amount: null,
      returndata: null,
      snackbar: false,
      message: '',
      syscolor: 'red',
      days: null,
      paypal: {
        sandbox: 'AQK3kcteHi9Z_PXFK1Jb4-13ZJrKXvUiZCORy-InNhFAQ4Pu6C8HdINKzOJxE0-3WElL0xQeqZnNcZ7t',
        production: 'AS8A-FEnFVhYly4xylHF8QJgXAG9KKF-070w3hlLIesRUrpNaVKZpwdyM5amt3rxs6FTReSsH3hVgZPS'
      },
      myStyle: {
        label: 'checkout',
        size: 'large',
        shape: 'rect',
        color: 'gold'
      }
    }
  },
  methods: {
    setDate (value) {
      var currentDt = null
      if (this.date != null) {
        currentDt = new Date(this.date)
      } else {
        currentDt = new Date()
      }
      var mm = currentDt.getMonth() + 1
      mm = (mm < 10) ? '0' + mm : mm
      var dd = currentDt.getDate() + value
      var yyyy = currentDt.getFullYear()
      var date = yyyy + '-' + mm + '-' + dd
      return date
    },
    logAuthPayment (data) {
      console.log(data)
      this.snackbar = true
      this.message = 'Payment was successful, check your email for more details'
      this.syscolor = 'success'
      // this.$router.push('/thanks')
    },
    logCompletePayment (data) {
      console.log('payment complete')
      this.snackbar = true
      this.message = 'Payment was Completed, Thanks'
      this.syscolor = 'info'
    },
    logCancelPayment (data) {
      console.log('payment canceled')
      this.snackbar = true
      this.message = 'You cancelled the payment'
      this.syscolor = 'red'
      // this.$router.push('/executive')
    }
  },
  computed: {
    image () {
      return this.$store.getters.getVixen(this.vixenid)
    },
    src () {
      return this.$store.getters.getVixen(this.vixenid).src
    },
    offer () {
      if (this.$route.params.offertype === 'exec') {
        return this.$store.getters.getExecService(this.serviceid)
      } else {
        return this.$store.getters.getCasService(this.serviceid)
      }
    }
  },
  created () {
    if (this.$route.params.offertype === 'exec') {
      this.$store.getters.getExecService(this.serviceid)
      this.vixenid = this.$route.params.vixenid
      this.serviceid = this.$route.params.serviceid
      this.user = this.$route.params.user
      if (this.offer.duration === 'nights') {
        this.enddate = this.setDate(1)
      }
      if (this.offer.duration === 'weekends') {
        this.enddate = this.setDate(3)
      }
      if (this.offer.duration === 'weeks') {
        this.enddate = this.setDate(6)
      }
      if (this.offer.duration === 'days') {
        this.enddate = this.setDate(12)
        // this.days = 12
      }
    } else {
      this.$store.getters.getCasService(this.serviceid)
      this.vixenid = this.$route.params.vixenid
      this.serviceid = this.$route.params.serviceid
      this.user = this.$route.params.user
      // this.date = this.$route.params.startdate
      if (this.offer.duration === 'hour') {
        this.enddate = this.setDate(1)
      }
      if (this.offer.duration === 'hours') {
        this.enddate = this.setDate(3)
      }
      if (this.offer.duration === 'night') {
        this.enddate = this.setDate(6)
      }
      if (this.offer.duration === 'weekend') {
        this.enddate = this.setDate(12)
        // this.days = 12
      }
      var mm = new Date().getHours()
      mm = (mm < 10) ? '0' + mm : mm
      var dd = new Date().getMinutes()
      var yyyy = new Date().getSeconds()
      var date = mm + ':' + dd + ':' + yyyy
      this.date = date
    }
  }
}
</script>
<style>
</style>
