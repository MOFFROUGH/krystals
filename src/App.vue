<template>
  <v-app light>
    <v-progress-linear v-bind:indeterminate="true" height="1" v-show="loading"></v-progress-linear>
    <v-progress-circular indeterminate :size="70" :width="7" color="purple" v-show="loading"></v-progress-circular>
    <v-container fluid v-show="!loading">
      <v-navigation-drawer  fixed  :mini-variant="miniVariant"  :clipped="clipped"  v-model="drawer"  app  temporary  v-show="!loading">
        <v-toolbar color="secondary">
          <v-toolbar-title>New York Krystals</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile  value="true"  v-for="(item, i) in Menuitems"  :key="i"  exact  :to="item.to" >
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped" class="secondary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" light class="hidden-sm-and-up">
        </v-toolbar-side-icon>
        <v-toolbar-title  class="display-2"  @click="homer"  style="cursor: pointer">
          {{title}}
        </v-toolbar-title>
        <v-spacer class="hidden-xs-only "></v-spacer>
        <v-btn v-for="menuitem in Menuitems" :key="menuitem.id" flat light :to="menuitem.to" class="hidden-xs-only">
          {{menuitem.name}}
        </v-btn>
      </v-toolbar>
      <v-content>
        <main class="mt-2">
          <v-layout>
            <v-layout>
              <v-flex  class="mb-2 mt-2 xs12">
                <v-toolbar color="accent" dark v-show="!loading">
                  <v-toolbar-title class="hidden-xs-only">New York Krystals</v-toolbar-title>
                  <v-spacer class="hidden-xs-only"></v-spacer>
                  <div class="title" v-if="!visibleRoutes">
                    The most personalised experience in the entire NY city
                  </div>
                  <v-text-field  prepend-icon="search" style="min-width= 350"placeholder="Search" hide-details single-line v-model="search" v-if="visibleRoutes">
                  </v-text-field>
                </v-toolbar>
              </v-flex>
            </v-layout>
          </v-layout>
          <router-view>
          </router-view>
        </main>
      </v-content>
      <v-layout row wrap>
        <v-flex xs12>
          <v-footer :fixed="fixed" app>
            <v-btn flat to="">Terms and Conditions</v-btn>
            <v-spacer></v-spacer>
            <span>&copy; {{new Date().getFullYear()}}</span>
            <v-spacer></v-spacer>
            <v-btn flat to="">Privacy Policy</v-btn>
          </v-footer>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
import api from '@/services/api.js'
import _ from 'lodash'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      search: '',
      title: 'New York Krystals',
      Menuitems: [
        {id: 1, icon: 'group_add', name: 'Career', to: '/career'},
        {id: 3, icon: 'work', name: 'Escorts', to: '/executive'},
        {id: 4, icon: 'help', name: 'About', to: '/about'}
      ],
      bottomNavigation: [
        {name: 'Home', to: '/', icon: 'home'},
        {name: 'Executive', to: '/executive', icon: 'work'},
        {name: 'About', to: '/about', icon: 'help'}
      ],
      botnav: 'Home'
    }
  },
  methods: {
    homer () {
      this.$router.push('/')
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    visibleRoutes () {
      const route = this.$route.path
      if (route !== '/executive') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    // do something after creating vue instance
    this.$store.dispatch('setImages')
    this.$store.dispatch('setConsent')
  },
  watch: {
    search: _.debounce(function (value) {
      // const route = {
      //   name: 'Home'
      // }
      if (this.search !== '') {
        // route.query = {
        //   search: this.search
        // }
        api.get('/search?search=' + this.search)
        .then(res => {
          console.log(res.data)
          this.$store.dispatch('setImagesSearch', res.data.searchResults)
        })
        .catch(e => {
          console.log(e)
        })
      } else {
        this.$store.dispatch('setImages')
      }
      // this.$router.push(route)
    }, 700)
    // '$route.query.search': {
    //   immediate: true,
    //   handler (value) {
    //     this.search = value
    //   }
    // }
  }
}
</script>
