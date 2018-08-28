<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="purple lighten-2 ma-2 xs12">
        <v-layout row wrap>
          <v-flex xs12>
            <div class="headline">
              Book For party:
            </div>
          </v-flex>
          <v-flex xs12>
            <v-card-actions class="body-1 mt-2">
              <v-btn  color="orange" class="mr-2" @click.native="roter">Add more Girls</v-btn>
              <v-btn  :disabled="dialog"   class="white--text"  color="green darken-2" @click.stop="dialog = true"  >
                Get party Rocking
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
                            <v-text-field  label="User Name"  v-model="name" :error-messages="nameErrors" @input="$v.name.$touch()"  @blur="$v.name.$touch()"  required/>
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
                    </v-card-text>

                  </v-card>
                </v-dialog>
              </v-layout>
              <!-- <v-dialog v-model="dialog2" persistent width="500px">
                <v-btn   color="success" dark slot="activator">Finish</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="display-1">Payment Procedure</span>
                  </v-card-title>
                  <v-card-text>
                    <h1>Phone Number: 0706798820</h1>
                    <div>
                      Steps to follow:
                      <div>
                        1. Go to mpesa, send money
                        <br />
                        2. Enter the phone number 0706798820
                        <br />
                        3. Enter amount as  Ksh. {{parseInt(this.$store.getters.getPartyVixens.length) * 2000}} /=.
                        <br />
                        4. Enter your pin.
                        <br />
                        5. Complete Transaction
                      </div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="Book">All Good</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->

          </v-card-actions>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm8 offset-sm2>
                <v-card light class="small mt-2" v-for="item in partyVixens" :key="item.id">
                  <v-card-media :src="item.src" height="200px"></v-card-media>
                  <v-card-text class="text-xs-center title">{{item.vixen }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round  class="text-xs-center"color="red">Remove from party</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
            </v-card>
              </v-flex>
            </v-layout>

          </v-card-text>
        </v-flex>

      </v-layout>
    </v-card>
  </v-flex>
</v-layout>
</template>
<script>
import api from '@/services/api'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  metaInfo: {
    title: 'Escort Booking',
    meta: [
      { vmid: 'description', name: 'description', content: 'Welcome to JipeRaha executive Nairobi escorts. We offer highly proffessional escorts for party and companionship' }
    ]
  },
  mixins: [validationMixin],
  validations: {
    name: { required },
    phone: { required }
  },
  data: () => ({
    //
    dialog: false,
    dialog2: false,
    loading: false,
    name: '',
    phone: '',
    escorts: []
  }),
  methods: {
    //
    getPartyVixensId () {
      for (var i = 0; i < this.partyVixens.length; i++) {
        this.escorts[i] = this.partyVixens[i].id
      }
    },
    Book () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading = true
        api.post('party/userdetails', {
          name: this.name,
          phone: this.phone,
          escorts: this.escorts
        })
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = 'Something wrong happened, this resposne was not processed'
          console.log(error)
        })
      }
    },
    roter () {
      this.$router.push('/escort/party/1')
    },
    removeFromParty (id) {
      console.log('Remove from cart ' + id)
    },
    showImage (id) {
      this.$store.getters.showImage(id)
    },
    close (id) {
      this.$store.getters.hideImage(id)
    }
  },
  computed: {
    partyVixens () {
      return this.$store.getters.getPartyVixens
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone number is required')
      return errors
    }
  },
  created () {
    this.getPartyVixensId()
  }

}
</script>
<style scoped>
</style>
