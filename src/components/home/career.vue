<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="white red--text elevation-2">
          <v-toolbar flat dense class="accent" dark>
            <v-toolbar-title>Get yourself started at vixens.io</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn light flat icon  to='/about#career'>
              <v-icon>help</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="pa-2">
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="cyan--text text-xs-center">Fill out this form</h1>
                <v-layout>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-flex xs12 class="text-xs-center">
                      <v-progress-circular  v-if="loading"  indeterminate  v-bind:width="3" color="blue">
                      </v-progress-circular>
                    </v-flex>
                    <form method="post" enctype="multipart/form-data" v-if="!loading">
                      <v-text-field  label="Name"  v-model="name"  :error-messages="nameErrors"  :counter="25" @input="$v.name.$touch()" @blur="$v.name.$touch()" required>
                      </v-text-field>
                      <v-text-field  label="E-mail"  v-model="email" :error-messages="emailErrors"@input="$v.email.$touch()"  @blur="$v.email.$touch()"  required>
                      </v-text-field>
                      <v-text-field  label="Age"  v-model="age"  type ="number"  :error-messages="ageErrors"  @input="$v.age.$touch()"  @blur="$v.age.$touch()"  required>
                      </v-text-field>
                      <v-text-field  label="Location"  v-model="location"  type ="text"  required>
                      </v-text-field>
                      <v-text-field  label="Interests"  v-model="interests"  type ="text"  required>
                      </v-text-field>
                      <v-btn raised class="primary" @click="onPickFile">Upload Profile</v-btn>
                      <input type ="file"  required  style="display:none"  accept="image/*"  ref="fileInput"  @change = "onFilePicked"/>
                      <div>
                        <img :src="imageURL" alt="" height="150"/>
                      </div>
                      <v-select  label="Type"  v-model="select"  :items="items"  :error-messages="selectErrors"  @change="$v.select.$touch()"  @blur="$v.select.$touch()"  required>
                      </v-select>
                      <v-checkbox  label="Agree to terms and conditions"  v-model="checkbox":error-messages="checkboxErrors"@change="$v.checkbox.$touch()"  @blur="$v.checkbox.$touch()"  required>
                      </v-checkbox>
                      <v-btn @click="submit">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </form>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/services/api'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(25) },
    age: { required, between: between(20, 1000) },
    email: { required, email },
    select: { required },
    checkbox: { required }
  },
  data () {
    return {
      name: '',
      email: '',
      select: null,
      items: [
        'Blonde',
        'Brunette',
        'Asian',
        'Ebony',
        'Chocolate'
      ],
      checkbox: false,
      age: null,
      location: '',
      interests: '',
      imageURL: '',
      image: null
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      let personal = {
        email: this.email,
        name: this.name,
        type: this.select,
        age: this.age,
        location: this.location,
        image: this.imageURL,
        imagename: this.image.name
      }
      // console.log(personal)
      if (!this.image) {
        return
      }
      this.$store.dispatch('setLoading', true)
      api.post('register', personal)
      .then(res => {
        // console.log(res)
        this.$store.dispatch('setImages')
        this.$store.dispatch('setLoading', false)
        this.$router.push('/executive')
      })
      .catch(error => {
        this.$store.dispatch('setLoading', false)
        console.log(error)
      })
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.imageURL = e.target.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
      this.age = null
      this.location = ''
      this.images.casual = null
      this.images.work = null
    }
  },
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.required && errors.push('You must agree to continue!')
      return errors
    },
    ageErrors () {
      const errors = []
      if (!this.$v.age.$dirty) return errors
      !this.$v.age.required && errors.push('You must provide your age!')
      !this.$v.age.between && errors.push('You must be 20 years or older!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 25 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

<style>
</style>
