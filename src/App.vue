<template>
  <v-app light>
    <v-progress-linear v-bind:indeterminate="true" height="1" v-show="loading"></v-progress-linear>
    <v-progress-circular indeterminate :size="70" :width="7" color="purple"v-show="loading">
    </v-progress-circular>
    <v-container fluid v-show="!loading">
      <v-navigation-drawer  fixed  :mini-variant="miniVariant"  :clipped="clipped"  v-model="drawer"  app  temporary  v-show="!loading">
        <v-toolbar color="secondary">
          <v-toolbar-title>JipeRaha </v-toolbar-title>
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
          <img src="../static/img/logo.png" height="50" width="50"/>
          {{title}}
        </v-toolbar-title>
        <v-spacer class="hidden-xs-only "></v-spacer>
        <v-btn v-for="menuitem in Menuitems" :key="menuitem.id" flat dark :to="menuitem.to" class="hidden-xs-only">
          <v-icon left>{{menuitem.icon}}</v-icon>
          {{menuitem.name}}
        </v-btn>
      </v-toolbar>
      <v-content>
        <main class="mt-1 main">
          <v-layout>
            <v-flex  class="mb-2 mt-1 xs12">
              <v-toolbar color="pink lighten-4" dark v-show="!loading">
                <v-toolbar-title class="hidden-xs-only">A Good life is MADE </v-toolbar-title>
                <v-spacer class="hidden-xs-only"></v-spacer>
                <div class="title" v-if="!visibleRoutes">
                  The Best Experience
                </div>
                <v-text-field  prepend-icon="search" style="min-width= 350" placeholder="Search" hide-details single-line v-model="search" v-if="visibleRoutes">
                </v-text-field>
              </v-toolbar>
            </v-flex>
          </v-layout>
          <router-view>
          </router-view>
        </main>
      </v-content>
      <v-layout align-center justify-center row  wrap>
        <v-flex xs12>
          <v-footer :fixed="fixed" app>
            <!-- <v-btn class="hidden-xs-only" flat to="">Terms and Conditions</v-btn> -->
            <v-spacer></v-spacer>
            <span>&copy; {{new Date().getFullYear()}}</span>
            <v-spacer></v-spacer>
            <!-- <v-btn class="hidden-xs-only" flat to="">Privacy Policy</v-btn> -->
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
      title: 'JipeRaha ',
      Menuitems: [
        {name: 'Home', to: '/', icon: 'home'},
        {name: 'Contact', to: '/contact', icon: 'phone'}
        // {id: 1, icon: 'group_add', name: 'Career', to: '/career'},
        // {id: 3, icon: 'work', name: 'Escorts', to: '/executive'},
        // {id: 4, icon: 'help', name: 'About', to: '/about'}
      ],
      bottomNavigation: [
        {name: 'Home', to: '/', icon: 'home'},
        // {name: 'Executive', to: '/executive', icon: 'work'},
        {name: 'About', to: '/about', icon: 'help'}
      ],
      botnav: 'Home'
    }
  },
  methods: {
    homer () {
      this.$router.push('/')
    },
    deleteStore () {
      //
      window.localStorage.removeItem('vuex')
    }
  },
  computed: {
    loading () {
      return this.$store.state.vixenloading
    },
    visibleRoutes () {
      const route = this.$route.path
      if (route === '/executive' || route === '/') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    window.localStorage.removeItem('vuex')
    // do something after creating vue instance
    this.$store.dispatch('setImages')
    setTimeout(this.deleteStore, 120000)
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
<style scoped>
.main {
  background-image: url('/static/img/logo.png');
  background-repeat: repeat;
  background-position: center;
}
</style>
