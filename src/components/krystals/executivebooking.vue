<template>
  <div id="">
    <v-layout>
      <v-flex>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-media  :src="src"  height="400px"  class="mb-4" >
              </v-card-media>
            </v-flex>
            <v-flex sm4 xs12>
              <span class="headline red--text">
                {{image.vixen}}
              </span>
              <br />
              I Love:
              <span class="small blue--text">
                {{image.interests}}
              </span>
              <v-card-media  :src="src"  height="400px"  class="mb-4">
              </v-card-media>
            </v-flex>
            <v-flex sm5 offset-sm2 xs12>
              <h2>I am available for the following days</h2>
              <div>
                <v-alert :color="color" class=" hidden-xs-only"icon="info" dismissible v-model="alert">
                  {{message}}
                </v-alert>
              </div>
              <v-date-picker color="green lighten-1" header-color="primary" v-model="date"></v-date-picker>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="500px">
                  <v-btn color="success" dark slot="activator">Proceed</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Personal details</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md6>
                            <v-text-field label="Legal first name" required v-model="personal.firstname"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field label="Legal last name" required v-model="personal.lastname"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-radio-group v-model="contmode">
                              <v-radio label="Contact me via email" value="email"></v-radio>
                              <v-radio label="Contact me via mobile" value="phone"></v-radio>
                            </v-radio-group>
                          </v-flex>
                          <v-flex xs12 v-if="contmode ==='email'">
                            <v-text-field type="email" label="Email" required v-model="personal.email"></v-text-field>
                          </v-flex>
                          <v-flex xs12 v-if="contmode ==='phone'">
                            <v-text-field  label="Phone" required v-model="personal.phone"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-select  label="Age"  required  :items="['18-29', '30-54', '54+']"  v-model="personal.age"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>
                        *indicates required field
                      </small>
                      <br />
                      <small>Note: We do not
                        <strong>save your information</strong>
                        on our databases. These are for contact and hook up only.
                      </small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Change</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="Book">Proceed</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
              <v-snackbar  :timeout="timeout"  :color="color"  v-model="snackbar"  class="hidden-sm-and-up">
                {{ message }}
                <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ['vixenid', 'serviceid'],
  data: () => ({
    date: null,
    allowedDates: ['18-2-2018'],
    randomDays: [],
    message: null,
    snackbar: false,
    color: 'red',
    timeout: 6000,
    alert: false,
    dialog: false,
    contmode: 'email',
    personal: {
      email: '',
      firstname: '',
      lastname: '',
      age: '',
      phone: ''
    }
  }),
  methods: {
    Book () {
      console.log(this.personal)
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
    }
  },
  watch: {
    date (value) {
      console.log('new date set at', this.date)
      this.message = 'Good Choice, Mark the date'
      this.snackbar = true
      this.alert = true
      this.color = 'success'
    }
  }
}
</script>
<style scoped>
</style>
