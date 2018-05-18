<template>
  <div>
    <v-card>
      <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
        <v-layout>
          <v-flex>
            <span class="display-2">{{image.vixen}}</span>            
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="text-xs-right">
            <v-btn outline small fab color="indigo" to='/executive'>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 style="border: red solid 2px" class="mt-2 mb-1">
            <span class="headline">Images-{{image.vixen}}</span>
            <hr />
            <v-card-media  height="400px"  class="ma-2">
              <v-progress-circular  indeterminate  :width="4" :size="160" fill="blue" color="red" v-show="vixenloading">
              </v-progress-circular>
              <v-carousel hide-delimiters hide-controls v-show="!vixenloading">
                <v-carousel-item v-for="(item,i) in imagesVixen"  :key="i" @click='escorts' :src="item.src"  transition="slide-y-transition" reverseTransition="fade"></v-carousel-item>
              </v-carousel>

            </v-card-media>
            <lightbox :src="item.src" :caption="image.vixen" :album="image.vixen" v-for="(item,i) in imagesVixen"  :key="i" class="ma-1">
              <img width="150px" height="150px" :src="item.src" style="cursor:pointer">
            </lightbox>
          </v-flex>
          <v-flex xs12 sm6 class="mt-1 mb-1">
            <div style="border: red solid 2px" class="mb-1">
              <span class="headline">About-<span class="orange--text">{{image.vixen}}</span></span>
              <hr />
              <div>
                <p>
                  I am {{image.vixen}}, i am from {{image.location}}. I love making people feel welcome and loved around me.
                </p>
                <p>
                  I am {{image.vixen}}, i am from {{image.location}}. I love making people feel welcome and loved around me.
                </p>
                <p>
                  I am {{image.vixen}}, i am from {{image.location}}. I love making people feel welcome and loved around me.
                </p>
              </div>
            </div>
            <div>
              <v-layout row justify-center>
                <v-flex xs12>
                <v-dialog v-model="dialog" persistent max-width="1200" v-show="!consent">
                  <v-btn round color="primary" slot="activator" ref="openDD">Book me!</v-btn>
                  <v-card class="purple lighten-2 ma-2" height="400px">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <div class="headline">
                          Services I offer:
                        </div>
                      </v-flex>
                      <v-flex xs12>
                        <v-card-text light class="small mt-2">
                          <v-list class="purple lighten-3 pa-2">
                            <v-list-tile avatar v-for="item in officialservices" :key="item.id"  :to="'/executive/'+id+'/book/'+item.id" class="accent elevation-1 ma-2 pt-1 pb-1">
                              <v-list-tile-content class="headline ">
                                <v-list-tile-title v-text="item.budget+' ' +item.timefor"></v-list-tile-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-card-text>
                      </v-flex>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-card-actions class="body-1 mt-2">
                          <v-btn round color="error" class="mx-auto" @click="dialog=!dialog">Close</v-btn>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
                </v-flex>
              </v-layout>
            </div>
            <div >
              <!-- <v-layout row justify-center>
                <v-dialog  v-model="dialog2" persistent :overlay="false" transition="dialog-bottom-transition">
                  <v-flex xs12 sm4 offset-sm4>
                  <v-carousel hide-delimiters>
                    <v-carousel-item v-for="(item,i) in imagesVixen"  :key="i" @click='dialog2=!dialog2' :src="item.src"  transition="slide-y-transition" reverseTransition="fade" style="cursor:pointer"></v-carousel-item>
                  </v-carousel>
                  </v-flex>
                </v-dialog>
              </v-layout> -->

            </div>
            <!-- <div style="border: red solid 2px">
              <span class="headline">Here is a list of things i can do for you</span>
              <div>
                <v-list class="primary lighten-3 pa-2">
                  <v-list-tile v-for="item in officialservices" :key="item.id"  :to="'/executive/'+id+'/book/'+item.id" class="accent elevation-1 ma-2">
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.budget+' ' +item.timefor"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </div> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
module.exports = {
  props: ['id'],
  data () {
    return {
      dialog: false,
      dialog2: false,
      image: null,
      size: 'md'
    }
  },
  methods: {
    escorts () {
      this.dialog2 = true
    }
  },
  computed: {
    officialservices () {
      return this.$store.getters.getOfficialServices
    },
    imagesVixen () {
      return this.$store.state.OneVixenImages
    },
    vixenloading () {
      return this.$store.state.vixenloading
    }
  },
  created () {
    this.image = this.$store.getters.getOne(this.id)
    this.$store.dispatch('setOneVixenImages', this.id)
  }
}
</script>

<style>
</style>
