<template>
      <v-layout row wrap>
        <v-flex xs12>

          <div>
            <v-layout>
              <v-flex  class="mb-2 mt-2 xs12">
                <v-toolbar color="accent" dark v-show="!loading">
                  <v-toolbar-title class="hidden-xs-only">Book Party Vixens</v-toolbar-title>
                  <v-spacer class="hidden-xs-only"></v-spacer>
                  <div class="title" v-if="!visibleRoutes">
                    <!-- The most personalised experience in the entire city -->
                  </div>
                  <v-btn to="/executive/partybooking">Book {{this.$store.getters.getPartyVixens.length}}</v-btn>
                </v-toolbar>
              </v-flex>
            </v-layout>
            <!-- <v-layout row wrap>
              <v-flex>
                Book
                <div>
                  {{this.$store.getters.getPartyVixens.length}}
                </div>
              </v-flex>
            </v-layout> -->
          </div>
          <div>
            <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
              <v-layout row wrap>
                <v-flex xl3 md4 sm6 xs12 v-if="image.inParty!=true" v-for="(image,i) in images" :key="i" class="pl-1 mt-2" >
                  <v-card flat tile style="border: red solid 2px">
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-center">
                        <span class="mr-2"><i :class="image.color+'--text fa fa-'+image.icon"></i>{{image.class}}</span>
                        <span class="mr-2"> <i class="fa fa-fire orange--text"></i>Hot</span>
                        <span class="mr-2"><v-icon light class="green--text">verified_user</v-icon>Verified</span>
                        <span class="mr-2"><v-icon light class="purple--text">work</v-icon>Executive</span>
                        <hr class="mb-1 green"/>
                        <v-card-media :src="image.src" height="300px" >
                        </v-card-media>
                      </v-flex>
                    </v-layout>

                    <v-card-title primary-title>
                      <div>
                        <h3 class="display-1 mb-0">{{image.vixen}}</h3>
                        <div><span class="title">{{image.location}}</span><br /><span class="caption">{{image.type}}</span></div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn round large block  color="red" dark @click="addPartyVixens(image.id)">Add me to party</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-flex>
      </v-layout>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      size: 'md'
    }
  },
  methods: {
    addPartyVixens (id) {
      this.$store.dispatch('setPartyVixens', id)
      // create a dialog asking if they want to continue
      this.$router.push('/executive/party/' + id)
    }
  },
  computed: {
    images () {
      return this.$store.getters.getImages
    },
    officialservices () {
      return this.$store.getters.getOfficialServices
    },
    consent () {
      if (!window.localStorage.getItem('consent')) {
        return false
      } else {
        return true
      }
    }
  }
  // mounted () {
  //   this.partyVixens.push(this.$store.getters.getVixen(this.id))
  // }
}
</script>

<style lang="css">
</style>
