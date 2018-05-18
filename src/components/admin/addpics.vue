<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <!-- A drop down of all the sytem users -->
        <!-- Image upload button -->
        <form method="post" enctype="multipart/form-data">
        <v-select
        label="Escort"
        v-model="select"
        :items="items"
        item-value="id"
        item-text="vixen"
        required
        ></v-select>
        <v-btn raised class="primary" @click="onPickFile">Upload Profile</v-btn>
        <input
        type ="file"
        required
        style="display:none"
        accept="image/*"
        ref="fileInput"
        @change = "onFilePicked"
        ></input>
        <div>
          <img :src="imageURL" alt="" height="150">
        </div>
        <v-btn @click="submit">submit</v-btn>
        <!-- A button to add the image -->
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/services/api'
export default {
  data () {
    return {
      image: null,
      imageURL: '',
      select: ''
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      for (var i = 0; i < files.length; i++) {
        this.createImage(files[i])
      }
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
    submit () {
      let personal = {
        image: this.imageURL,
        imagename: this.image.name
      }
      api.post('addpic/' + this.select, personal)
      .then(res => {
        // console.log(res)
        this.$store.dispatch('setImages')
        this.$store.dispatch('setLoading', false)
        this.$router.push('/admin/addpics')
      })
      .catch(error => {
        this.$store.dispatch('setLoading', false)
        console.log(error)
      })
    }
  },
  computed: {
    items () {
      let images = this.$store.getters.getImages
      return images
    }
  }
}
</script>

<style lang="css">
</style>
