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
          <v-btn outline small fab color="indigo" to='/escorts'>
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6
      style="border: red solid 2px"
      class="mt-2 mb-1">
      <span class="headline">Images-{{image.vixen}}</span>
      <hr />
        <v-card-media
        height="400px"
        class="ma-2"
        >
        <v-progress-circular
        indeterminate
        :width="4"
        :size="160"
        fill="blue"
        color="red"
        v-show="vixenloading">
      </v-progress-circular>
        <v-carousel hide-delimiters hide-controls v-show="!vixenloading">
          <v-carousel-item
          v-for="(item,i) in imagesVixen"
          :key="i"
          :src="item.src"
          transition="slide-y-transition"
          reverseTransition="fade"
          ></v-carousel-item>
        </v-carousel>
      </v-card-media>
      </v-flex>
    <v-flex xs12 sm6
    class="mt-2 mb-1">
      <div style="border: red solid 2px">
        <span class="headline">Offers-<span class="orange--text">{{image.vixen}}</span></span>
        <div>
          <v-list class="purple lighten-3 pa-2">
            <v-list-tile avatar v-for="item in casualservices" :key="item.id"  :to="'/escort/'+id+'/book/'+item.id" class="blue elevation-1 ma-2">
              <!-- <v-list-tile-action v-for="n in item.id" :key="n" class="hidden-sm-and-down">
                <v-icon  color="yellow">star</v-icon>
              </v-list-tile-action> -->
              <v-list-tile-content>
                <v-list-tile-title v-text="item.budget+' ' +item.timefor">
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </div>
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
      image: null,
      size: 'md'
    }
  },
  computed: {
    casualservices () {
      return this.$store.getters.getCasualServices
    },
    imagesVixen () {
      return this.$store.state.OneVixenImages
    },
    vixenloading () {
      return this.$store.state.vixenloading
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('setImages')
    this.image = this.$store.getters.getOne(this.id)
    this.$store.dispatch('setOneVixenImages', this.id)
  }
}
</script>

<style>
</style>
