<template>
  <div>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 style="background-color: accent darken-2" class="ma-1">
        <v-card class="">
          <div class="mt-2 elevation-3">
            <v-tabs grow v-model="active">
              <v-tabs-bar class="secondary" dark>
                <v-tabs-item  v-for="(tab,i) in tabsContent"  :key="i"  :href="'#' + tab.name"  ripple >
                  {{ tab.name}}
                </v-tabs-item>
                <v-tabs-slider color="red lighten-2"></v-tabs-slider>
              </v-tabs-bar>
              <v-tabs-items>
                <v-tabs-content  v-for="(tab,i) in tabsContent"  :key="i"  :id="tab.name">
                  <v-card flat>
                    <v-card-text v-html="tab.text"></v-card-text>
                  </v-card>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleName: '',
      active: null,
      tabsContent: [
        {
          name: 'About',
          text: `<span class="display-1">Vixens you can trust</span><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /><br />`
        },
        {
          name: 'Career',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'executive',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'services',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]

    }
  },
  methods: {
    next () {
      this.active = this.tabsContent[(this.tabsContent.indexOf(this.active) + 1) % this.tabsContent.length]
    }
  }
}
</script>

<style>
</style>
