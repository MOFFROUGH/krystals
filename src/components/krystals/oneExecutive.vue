<template>
    <v-layout row wrap>
      <v-flex xs12 style="border-radius:5px" class="ma-0">
        <v-card grid-list-md  style="border-radius:5px">
          <v-layout row wrap>
            <v-flex sm6 xs12 order-xs2 order-sm1>
              <v-card-media  height="400px"  class="ma-2">
                <v-carousel lazy hide-delimiters hide-controls>
                  <v-carousel-item v-for="(item,i) in images"  :key="i" @click='escorts' :src="item.imageURL"  v-show="!vixenloading" transition="slide-y-transition" reverseTransition="fade">
                  </v-carousel-item>
                </v-carousel>
              </v-card-media>
              <lightbox :src="item.imageURL" :caption="image.vixen" :album="image.vixen" v-for="(item,i) in images"  :key="i" class="ma-1" v-show="!vixenloading">
                <img width="50px" height="50px" :src="item.imageURL" style="cursor:pointer">
              </lightbox>
            </v-flex>
            <v-flex sm6 xs12 order-xs1 order-sm2>
              <v-card-text  class="">
                <v-card flat tile style="border: grey solid 1px; border-radius:5px;" height="100%"  color="transparent" class="body-2 black--text">
                  <v-card-actions class="pa-3">
                    Name:
                    <v-spacer></v-spacer>
                    {{image.vixen}}
                  </v-card-actions>
                  <hr />
                  <v-card-actions class="pa-3">
                    Location:
                    <v-spacer></v-spacer>
                    {{image.location}}
                  </v-card-actions>
                  <hr />
                  <v-card-actions class="pa-3">
                    Services:
                    <v-spacer></v-spacer>
                    <v-layout row wrap class="text-xs-right">
                      <v-flex xs12>Incall</v-flex><br />
                      <v-flex xs12>Outcall</v-flex><br />
                    </v-layout>
                  </v-card-actions>
                  <hr />
                  <v-card-actions class="pa-3">
                    Ample Parking:
                    <v-spacer></v-spacer>
                    Available
                  </v-card-actions>
                  <hr />
                  <v-card-actions class="pa-3">
                    Availability:
                    <v-spacer></v-spacer>
                    24/7
                  </v-card-actions>
                  <hr />
                  <v-card-actions class="">
                    Charges:
                    <v-spacer></v-spacer>
                    <v-layout row wrap class="text-xs-right">
                      <v-flex xs12>Ksh 1,000 for 2 hours</v-flex><br />
                      <v-flex xs12>Ksh 2,000 for 1 night</v-flex><br />
                      <v-flex xs12>Ksh 7,000 for 1 weekend</v-flex><br />
                      <v-flex xs12>Ksh 10,000 for 1 week</v-flex><br />
                    </v-layout>
                  </v-card-actions>
                  <hr />
                </v-card>
                <v-flex >
                  <p>
                    I am {{image.vixen}}, i am from {{image.location}}.
                    {{image.interests}}
                  </p>

                </v-flex>
                <v-card-actions>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn  :disabled="dialog"   class="white--text"  color="purple darken-2" @click.stop="dialog = true"    large block >
                        Hang out with me!
                      </v-btn>
                      <v-dialog v-model="dialog" persistent width="400" v-show="!consent">
                        <v-card class="grey lighten-2 ma-2" height="100%">
                          <v-layout row wrap>
                            <v-flex xs12>
                              <p class="headline text-xs-center mt-2">
                                {{image.vixen}} is available for:
                              </p>
                            </v-flex>
                            <v-flex xs12>
                              <v-card-text light class="small mt-2">
                                <v-list class="grey lighten-3 pa-2" style="border-radius:5px">
                                  <v-list-tile light avatar v-for="item in officialservices" :key="item.id" :to="'/executive/'+id+'/book/'+item.id" class="cyan elevation-1 ma-2 pt-1 pb-1" style="border-radius:5px">
                                    <v-list-tile-title v-text="item.budget">
                                    </v-list-tile-title>
                                    <v-list-tile-title v-text="item.timefor">
                                    </v-list-tile-title>
                                  </v-list-tile>
                                </v-list>
                              </v-card-text>
                            </v-flex>
                            <v-flex xs12 sm6 offset-sm3>
                              <v-card-actions class="body-1 mt-2">
                                <v-btn block small color="error" dark class="mx-auto" @click="dialog=!dialog">
                                  Close
                                </v-btn>
                              </v-card-actions>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
module.exports = {
  props: ['id'],
  metaInfo () {
    return {
      title: this.image.vixen
    }
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      carousel: 0,
      size: 'md'
    }
  },
  methods: {
    escorts () {
      this.dialog2 = true
    },
    change_pics () {
      this.carousel = null
      // this.images = this.$store.state.OneVixenImages
      this.$nextTick(() => (this.carousel = 0))
    }
  },
  computed: {
    officialservices () {
      return this.$store.getters.getOfficialServices
    },
    imagesVixen () {
      return this.$store.state.OneVixenImages
    },
    imageAvailable () {
      if (this.$store.state.OneVixenImages) {
        return false
      }
      return true
    },
    image () {
      return this.$store.getters.getOne(this.id)
    },
    images () {
      return this.$store.state.OneVixenImages
    },
    vixenloading () {
      this.$store.getters.getLoading
    }
  },
  mounted () {
    this.change_pics()
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    this.$store.dispatch('setOneVixenImagesNull')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    this.$store.dispatch('setOneVixenImages', this.id)
    this.images = this.$store.state.OneVixenImages
    next()
  },
  created () {
    this.$store.dispatch('setOneVixenImages', this.id)
  }
  // updated () {
  //   this.$store.dispatch('setOneVixenImages', this.id)
  // }
}
</script>

<style scoped>
#dialogactivator1 {
  width: 100%;
  font-size: 800;
}
</style>
