<template>
  <div class="ma-1">
    <v-layout row wrap>
      <v-flex xs12>
        <div>
          <v-card>
            <!-- <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions> -->
          <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
            <v-layout row wrap>
              <v-flex
              md4
              sm6
              xs12
              v-for="(image,i) in images"
              :key="i"
              class="pl-1 mt-2 pr-1 mb-2"
              id="escortlist"
              >
              <v-card flat tile
              style="border: red solid 2px">
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center">
                    <span class="mr-2"><i :class="image.color+'--text fa fa-'+image.icon"></i>{{image.class}}</span>
                    <span class="mr-2"> <i class="fa fa-fire orange--text"></i>Hot</span>
                    <span class="mr-2"><v-icon light class="green--text">verified_user</v-icon>Verified</span>
                    <hr class="mb-1 green"/>
                    <!-- <span class=""> <i class="fa fa-certificate red--text"></i>platinum</span> -->
                    <v-card-media
                    :src="image.src"
                    height="300px"
                    >
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
              <v-layout row justify-center>
                <v-btn round large  color="red" dark :to="'/escorts/'+image.id">Hook Up with Me</v-btn>

            </v-layout>
            <!-- <v-btn flat color="orange">{{image.type}}</v-btn> -->
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
    casualservices () {
      return this.$store.getters.getCasualServices
    }
  },
  mounted () {
    // do something after creating vue instance
    this.$store.dispatch('setImages')
  }
}
</script>

<style>
</style>
