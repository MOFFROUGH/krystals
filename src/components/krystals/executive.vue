<template>
  <div class="ma-1">
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 class="text-xs-center" v-show="loading">
          <v-progress-circular  indeterminate  :width="2"  :size="160"  fill="blue"  color="red">
          </v-progress-circular>
          <p>
            <!-- Please Consent to being an adult -->
          </p>
        </v-flex>
        <div v-show="!loading">
          <v-card class="main" height="100%">
            <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
              <v-layout row wrap fill-height>
                <v-flex xl2 md3  sm6  xs12  v-for="(image,i) in images"  :key="i"  class="pl-1 mt-2">
                  <v-card flat tile style="cursor:pointer;border: grey solid 1px; border-radius:5px" height="100%">
                    <v-card-media  :src="image.src"  height="400px" @click.native="send(image.id)">
                      <h3 class="body-2 mb-0 white--text"  >{{image.vixen}}</h3>
                    </v-card-media>
                    <v-card-text primary-title>
                      <v-layout row wrap>
                        <v-flex xs12 class="text-xs-center" id="">
                          <div>
                            <span class="title">{{image.location}}</span>
                            <br />
                            <span class="caption">{{image.type}}</span>
                          </div>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs12 class="text-xs-center" id="onpic">
                          <hr class="mb-1 green"/>
                          <span class="mr-2">
                            <v-icon light class="green--text">verified_user</v-icon>
                            Verified
                          </span>
                          <span class="mr-2">
                            <v-icon light class="purple--text">work</v-icon>
                            Executive
                          </span>
                          <hr class="mb-1 green"/>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                    <v-card-actions>
                      <v-layout row wrap>
                        <v-flex sm12>
                          <v-btn block round small  color="red" dark :to="'/executive/'+image.id">Hook Up with Me</v-btn>
                        </v-flex>
                        <v-flex sm12>
                          <v-btn block round small  color="orange" dark :to="'/escort/party/'+image.id">Duo, Trio, Party</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleName: '',
      size: 'md',
      pagination: {},
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  computed: {
    images () {
      return this.$store.getters.getImages
    },
    officialservices () {
      return this.$store.getters.getOfficialServices
    },
    imagesVixen () {
      return this.$store.state.OneVixenImages
    },
    loading () {
      return this.$store.state.vixenloading
    },
    consent () {
      if (!this.$store.state.consent) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getOneVixenD (id) {
      console.log('clicked')
      this.$store.dispatch('setOneVixenImages', id)
    },
    send (id) {
      this.$router.push('/executive/' + id)
    }
  },
  mounted () {
    // do something after creating vue instance
    this.$store.dispatch('setImages')
  },
  created () {
    this.$store.dispatch('setImages')
  }
}
</script>

<style scoped>
.main {
  background-image: url('/static/img/logo.png');
  background-repeat: repeat;
  background-position: center;
}
#onpic {
  /* background-color: grey; */
}
</style>
