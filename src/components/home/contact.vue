<template>
  <section>
    <v-layout row wrap justify-center  class="my-5">
      <v-flex xs12>
        <v-card class="elevation-0  mb-2">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Contact us</div>
          </v-card-title>
          <div class="white elevation-2 mt-2">
            <v-toolbar flat dense class="light-green accent-2" light>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                  <v-spacer></v-spacer>
                We are Hiring!!!
                  <v-spacer></v-spacer>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <div class="headline font-weight-medium font-italic text-xs-center ma-2">
              <p>
                We are looking for new sophisticated escorts working in or around Nairobi.
              </p>
              <p>
                Our clientelle is strict and high-end, so we need discrete and professional escorts.
              </p>
              <p>
                For futher information and queries contact us via email: <span>careers@jiperaha.com</span>
              </p>
            </div>
          </div>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="grey lighten-2">
              <div class="ml-1 mr-1">
                <v-card-text>
                  You can find us at:
                </v-card-text>
                <v-list class="white">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>0722 456 789</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Moi Avenue, NBI</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>info@jiperaha.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-flex>
            <v-flex xs12 sm6 class="grey lighten-2">
              <div class="ml-1 mr-1 mb-2">
                <v-card-text>
                  Or send us a message:
                </v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation class="white">
                  <v-layout>
                    <v-flex xs12 sm8 offset-sm2>
                      <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      :counter="25"
                      label="Name"
                      required
                      ></v-text-field>
                      <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      ></v-text-field>
                      <v-textarea
                      v-model="comments"
                      :rules="commentRules"
                      label="Message"
                      required
                      ></v-textarea>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-btn @click="clear" round outline class="mr-2 red">clear</v-btn>
                        </v-flex>
                        <v-flex xs6>
                          <v-btn
                          round
                          :disabled="!valid"
                          @click="submit"
                          class="green"
                          >
                          submit
                        </v-btn>
                        </v-flex>
                      </v-layout>
                  </v-flex>
                </v-layout>
              </v-form>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-0 grey lighten-2">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline">Company location</div>
        </v-card-title>
        <v-card-text>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817331164068!2d36.821367949589266!3d-1.2834673990592758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6678064cf%3A0x956bb6f5e0ab2aac!2sMoi+Ave%2C+Nairobi!5e0!3m2!1sen!2ske!4v1534662570910" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</section>
</template>

<script>
import api from '@/services/api'
export default {
  metaInfo: {
    title: 'Contact Us',
    meta: [
      { vmid: 'description', name: 'description', content: 'Get in tpuch with jiperaha for amazing offers on all types of escorts within and without nairobi' }
    ]
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 25) || 'Name must be less than 25 characters'
    ],
    email: '',
    comments: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    commentRules: [
      v => !!v || 'Message is required'
    ]
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        api.post('comments', {
          name: this.name,
          email: this.email,
          comment: this.comments
        })
        this.$router.push('/')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="css">
</style>
