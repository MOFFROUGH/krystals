<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-card class="mt-2 mr-1">
        <v-card-title primary-title>
        </v-card-title>
        <v-list class=" lighten-3">
          <v-btn  :disabled="dialog"   class="white--text"  color="purple darken-2" @click.stop="dialog = true"    block round  >
            Finish
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="display-1">Payment Procedure</span>
              </v-card-title>
              <v-card-text>
                <h1>Paybill Number: 887667</h1>
                <div>
                  Steps to follow:
                  <p>
                    1. Go to mpesa, lipa na mpesa, Paybill
                    <br />
                    2. Enter the business number 887667
                    <br />
                    3. Enter account number as your name
                    <br />
                    4. Enter amount {{offer.budget}}.
                    <br />
                    5. Complete Transaction
                  </p>
                  <p>
                    <v-form>
                      <v-text-field  label="Enter Mpesa Confirmation Code "  v-model="mpesa"  type ="text"  required>
                        C                </v-text-field>
                      </v-form>
                    </p>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="Book">All Good</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list>
          <v-card-actions>
            <div class="text-xs-center">
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="mt-2">
          <v-card-media :src="src" height="275px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{image.vixen}}</h3>
              <div>{{image.location}}</div>
              <span>
                {{offer.budget}}
              </span> <br />
              <span class="mr-2">
                Hot
              </span>
              <span class="mr-2">
                <v-icon light class="green--text">verified_user</v-icon>
                Verified
              </span>
            </div>
          </v-card-title>

        </v-card>
      </v-flex>
      <div v-show="message">
        <v-snackbar :timeout="6000"  :color="syscolor"  v-model="snackbar"  class="" >
          {{ message }}
          <v-btn dark flat @click.native="snackbar = false">X</v-btn>
        </v-snackbar>
      </div>
    </v-layout>
  </template>

  <script>
  export default {
    data () {
      return {
        mpesa: '',
        vixenid: null,
        serviceid: null,
        dialog: false,
        user: null,
        date: null,
        amount: null,
        returndata: null,
        snackbar: false,
        message: '',
        syscolor: 'red',
        days: null,
        personal: {
          email: '',
          firstname: '',
          lastname: '',
          age: '',
          phone: ''
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
      } else {
        this.$store.getters.getCasService(this.serviceid)
        this.vixenid = this.$route.params.vixenid
        this.serviceid = this.$route.params.serviceid
        this.user = this.$route.params.user
      }
    }
  }
  </script>
  <style>
  </style>
