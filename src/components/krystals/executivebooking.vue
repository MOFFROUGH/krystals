<template>
  <div id="">
    <v-layout row wrap>
      <v-flex sm6 order-xs2 order-sm1>
        <v-card flat tile style="border: grey solid 1px; border-radius:5px;" height="100%"  color="grey lighten-2" class="title black--text">
          <h3>Escort details</h3>
          <v-card-actions class="pa-3">
            Name
            <v-spacer></v-spacer>
            {{image.vixen}}
          </v-card-actions>
          <v-card-actions class="pa-3">
            Location
            <v-spacer></v-spacer>
            {{image.location}}
          </v-card-actions>
          <v-card-actions class="pa-3">
            Services
            <v-spacer></v-spacer>
            {{image.vixen}}
          </v-card-actions>
          <v-card-actions class="pa-3">
            Type
            <v-spacer></v-spacer>
            {{image.type}}
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 order-xs1 order-sm2>
        <v-card>
          <v-card-media  :src="src"  height="200px"  class="mb-4" >
          </v-card-media>
          <v-card-text class="title text-xs-center">
            <p>
              You have chosen  <span class="orange--text">{{image.vixen}}</span> as a service for:
            </p>
            <p>
              1 <span class="headline">{{offer.duration }}</span>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-flex xs12>
              <v-btn  :disabled="dialog"   class="white--text"  color="green darken-2" @click.stop="dialog = true"    block round  >
                Proceed
              </v-btn>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Contact Details</span>
                    </v-card-title>
                    <v-card-text>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-form ref="form">
                            <v-text-field  label="User Name"  v-model="username" :error-messages="nameErrors" @input="$v.username.$touch()"  @blur="$v.username.$touch()"  required/>
                            <v-text-field  label="Phone number"  v-model="phone" :error-messages="phoneErrors" @input="$v.phone.$touch()"  @blur="$v.phone.$touch()"  required/>
                          </v-form>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Change</v-btn>
                            <v-btn color="blue darken-1" flat :loading="loading"      :disabled="loading" @click.native="Book">Proceed</v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-layout>
                      <small class="red--text" v-if="error">{{error}}</small>
                      <br />
                      <small>
                        *indicates required field
                      </small>
                      <br />
                      <small>Note: We do not
                        <strong>save your information</strong>
                        on our databases. These are for contact and hook up only.
                      </small>
                    </v-card-text>

                  </v-card>
                </v-dialog>
              </v-layout>
              <v-snackbar  :timeout="timeout"  :color="color"  v-model="snackbar"  class="hidden-sm-and-up">
                {{ message }}
                <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import api from '@/services/api'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['vixenid', 'serviceid'],
  mixins: [validationMixin],
  validations: {
    username: { required },
    phone: { required }
  },
  data: () => ({
    date: null,
    email: '',
    username: '',
    phone: '',
    message: null,
    snackbar: false,
    color: 'red',
    timeout: 6000,
    alert: false,
    dialog: false,
    contmode: 'phone',
    loading: false,
    error: null
  }),
  methods: {
    Book () {
      console.log(this.personal)
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        api.post('bookcontacts', {
          name: this.username,
          phone: this.phone
        })
        .then(response => {
          this.loading = false
          this.$router.push({
            name: 'Paypal',
            params: {
              vixenid: this.vixenid,
              serviceid: this.serviceid,
              user: this.personal,
              startdate: this.date,
              offertype: 'exec'
            }
          })
        })
        .catch(error => {
          this.loading = false
          this.error = 'Something wrong happened, this resposne was not processed'
          console.log(error)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
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
      return this.$store.getters.getExecService(this.serviceid)
    },
    nameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone number is required')
      return errors
    }
  },
  watch: {
    //
  }
}
</script>
<style scoped>
</style>
