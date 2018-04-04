<template>
  <v-layout row wrap class="mt-2 pa-2">
    <v-flex xs12>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="1200" v-show="!consent">
          <v-btn slot="activator" ref="openDD" style="display:none">Open Dialog</v-btn>
          <v-card class="yellow darken-2 ma-2" height="400px">
            <v-layout row wrap>
              <v-flex xs12 sm6 offset-sm3>
                <v-card-title class="body-1 mt-2" light>This Site might contain adult content</v-card-title>
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <v-card-text light class="body-1 mt-2">{{adultmessage}}</v-card-text>
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <v-card-text light class="small mt-2">I agree to the terms and conditions of this site</v-card-text>
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <v-card-actions class="body-1 mt-2">
                  <v-btn round block color="red" @click="disagree">Disagree</v-btn>
                  <v-btn round block color="green" @click="agree">Agree</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout row wrap class="mt-2" v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
          indeterminate
          :width="4"
          :size="160"
          fill="blue"
          color="red">
        </v-progress-circular>
        <p>
          Please wait as we fetch some data from the servers
        </p>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-show="!loading">
      <v-flex xs12>
        <v-carousel hide-delimiters v-show="!loading" :lazy="true">
          <v-carousel-item
          v-for="(item,i) in images"
          :src="item.src"
          :key="i"
          @click='escorts(item.id)'
          class="responsive"
          style="cursor: pointer">
          <p class="text-xs-center">
            <span class="red--text display-2">{{item.vixen}}</span><br />
            <span class="red--text small text-xs-center">{{item.location}}</span>
          </p>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>

  <v-layout row wrap class="mt-2" v-show="!loading">
    <v-flex xs12 class="text-xs-center">
      <p>
        Make it Count!!
      </p>
    </v-flex>
  </v-layout>
  <v-parallax src='./static/img/images1.jpg' height="200" v-show="!loading">
    <v-layout row wrap class="text-xs-center">
      <v-flex class="display-2 mt-4 red--text">Focus</v-flex>
    </v-layout>
  </v-parallax>
  <v-layout row wrap v-show="!loading">
    <v-flex xs12>
      <div class="white red--text elevation-2">
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title color="accent">Quick Nav</v-toolbar-title>
          <slot name="action" />
        </v-toolbar>

        <div class="pa-2">
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <h1 class="cyan--text">Quick Links</h1>
              <v-list>
                <v-list-tile avatar v-for="item in quicklinks" v-bind:key="item.id" :to="item.to">
                  <v-list-tile-action>
                    <v-icon color="pink">{{item.icon}}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-flex xs12 sm6>
              <h1 class="cyan--text">Social</h1>
      <social-sharing url="http://127.0.0.1:8080/"
      title="The one site that offers all you need"
      description="Get Escorts that will give you profesional touch"
      quote="It must be the New York Krystals. Dedicated to service, Excellent at Delivery"
      hashtags="escorts, beauty, diamonds, certified, verified, girls, hot, babe"
      twitter-user="New York Krystals"
      inline-template>
      <div>
        <network style="cursor:pointer" class="pa-2 mt-2 mr-2 title btn green lighten-4" network="facebook">
          Facebook
        </network>
        <network style="cursor:pointer" class="pa-2 mt-2 mr-2 title btn green lighten-4" network="googleplus">
          Google +
        </network>
        <network style="cursor:pointer" class="pa-2 mt-2 mr-2 title btn green lighten-4" network="twitter">
          Twitter
        </network>
      </div>
    </social-sharing>
  </v-flex>
</v-layout>
</div>
</div>
</v-flex>
</v-layout>

<v-parallax src='./static/img/images.jpg' height="300" v-show="!loading">
  <v-layout row wrap class="text-xs-center">
    <v-flex class="display-2 mt-4 blue--text xs12">Freedom</v-flex>
    <v-flex class="small mt-4 blue--text">All Around</v-flex>
  </v-layout>
</v-parallax>

</v-flex>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      social: [
        {color: 'blue darken-4', icon: 'FB', title: 'Facebook', to: '/facebook'},
        {color: 'blue lighten-2', icon: 'TW', title: 'Twitter', to: '/facebook'},
        {color: 'red', icon: 'G+', title: 'Google+', to: '/facebook'}
      ],
      dialog: false,
      adultmessage: 'I consent that i am an adult and willing enter the site'
    }
  },
  methods: {
    escorts (id) {
      // console.log('redirect')
      this.$router.push('/executive/' + id)
    },
    oneVixen (id) {
      // console.log('ggg')
    },
    agree () {
      this.dialog = false
      window.localStorage.setItem('consent', 'true')
    },
    disagree () {
      this.dialog = true
      this.adultmessage = 'Sorry We cannot Proceed without your consent'
    }
  },
  computed: {
    images () {
      return this.$store.getters.getImages
    },
    getcards () {
      return this.$store.getters.getFeaturedVixens
    },
    cards () {
      return this.$store.state.BlogCont
    },
    quicklinks () {
      return this.$store.state.QuickLinks
    },
    loading () {
      return this.$store.state.loading
    },
    consent () {
      return this.$store.state.consent
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('setImages')
    if (!window.localStorage.getItem('consent')) {
      // this.$refs.openDD.click()
      this.dialog = true
    } else {
      this.dialog = false
    }
  }
}
</script>

<style>
v-carousel v-carousel-item :hover {
  cursor: pointer;
}
#bottomnav {
}
div>network {
  cursor:pointer;
}
</style>
