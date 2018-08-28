<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-card class="mt-2 mr-1">
        <v-card-title primary-title>
        </v-card-title>
        <v-list class=" lighten-3">
          <!-- <v-dialog v-model="dialog" persistent max-width="500px"> -->
            <v-card>
              <v-card-title>
                <span class="display-1">Payment Procedure</span>
              </v-card-title>
              <v-card-text>
                <h1>Phone Number: 0706798820</h1>
                <div>
                  Steps to follow:
                  <!-- <p>
                  1. Go to mpesa, lipa na mpesa, Paybill
                  <br />
                  2. Enter the business number 887667
                  <br />
                  3. Enter account number as your name
                  <br />
                  4. Enter amount {{offer.budget}}.
                  <br />
                  5. Complete Transaction
                </p> -->
                <p>
                  1. Go to mpesa, send money
                  <br />
                  2. Enter the phone number 0706798820
                  <br />
                  3. Enter amount  as {{offer.budget}}
                  <br />
                  4. Enter your pin.
                  <br />
                  5. Complete Transaction
                </p>
                <!-- <p>
                  <v-form>
                    <v-text-field  label="Mpesa Confirmation Code"  v-model="mpesa" :error-messages="mpesaErrors" @input="$v.mpesa.$touch()"  @blur="$v.mpesa.$touch()"  required/>
                    </v-form>
                  </p> -->
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn> -->
                <v-btn color="blue darken-1" flat @click.native="Book">All Good</v-btn>
              </v-card-actions>
            </v-card>
          <!-- </v-dialog> -->
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
import api from '@/services/api'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    mpesa: { required }
  },
  metaInfo: {
    title: 'Payments'
  },
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
      snackbar: false
    }
  },
  methods: {
    Book () {
      console.log(this.mpesa)
      this.$router.push('/')
      this.$v.$touch()
      if (!this.$v.$error) {
        api.post('mpesa/code/', {
          mpesa: this.mpesa
        })
        .then(response => {
          this.$router.push('/')
        })
        .catch(error => {
          this.error = 'Something wrong happened, this response was not processed'
          console.log(error)
        })
      }
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
    },
    mpesaErrors () {
      const errors = []
      if (!this.$v.mpesa.$dirty) return errors
      !this.$v.mpesa.required && errors.push('Mpesa Code is required')
      return errors
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
