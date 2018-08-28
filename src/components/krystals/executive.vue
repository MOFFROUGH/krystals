<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-flex xs12 class="text-xs-center" v-show="loading">
        <!-- <v-progress-circular  indeterminate  :width="2"  :size="50"  fill="blue"  color="red">
        </v-progress-circular> -->
        <p>
          Check us out
        </p>
      </v-flex>
      <div v-show="!loading">
        <v-card class="main" height="100%">
          <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
            <v-layout row wrap fill-height>
              <v-flex xl2 md3  sm6  xs12  v-for="(image,i) in images"  :key="i"  class="pl-1 mt-2">
                <v-card flat tile style="border: grey solid 1px; border-radius:5px" height="100%">
                  <v-card-media  :src="image.src"  style="cursor:pointer;" height="400px" @click.native="send(image.id)">
                  </v-card-media>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <h1 class="text-xs-center headline font-weight-medium font-italic mb-0"  >{{image.vixen}}</h1>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text primary-title>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-center" id="">
                        <div>
                          <span class="title">{{image.location}}</span>
                          <br />
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-center">
                        <hr class="mb-1"/>
                        <span class="title mr-2">
                          <v-icon light class="green--text">verified_user</v-icon>
                          JipeRaha Verified
                        </span>
                        <!-- <span class="mr-2">
                          <v-icon light class="">work</v-icon>
                          Executive
                        </span> -->
                        <hr class="mb-1"/>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout row wrap>
                      <v-flex sm12>
                        <v-btn block large  class="mb-3"color="purple" dark :to="'/executive/'+image.id">Hook Up with Me</v-btn>
                      </v-flex>
                      <v-flex sm12>
                        <v-btn block large  color="blue" class=""light :to="'/escort/party/'+image.id">Duo, Trio, Party</v-btn>
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
</template>

<script>
export default {
  metaInfo: {
    title: 'Executive Escorts',
    meta: [
      { vmid: 'description', name: 'description', content: 'Get in tpuch with jiperaha for amazing offers on all types of escorts within and without nairobi' }
    ],
    script: [
      { innerHTML: '{"@context":"http://schema.org/","@type":"WebSite","name":"jiperaha.com","alternateName": "jiperaha",  "url": "https://jiperaha.com"}', type: 'application/ld+json' },
      { innerHTML: '{"@context": "http://schema.org/","@type":"JobPosting","title":"Escort","description":"To keep our guest company and to be available for corporate and other party events.",  "identifier": {"@type":"PropertyValue","name":"jiperaha","value":"Escort"},"hiringOrganization":{"@type":"Organization","name":"jiperaha",sameAs":"https://jiperaha.com"},"industry":"Entertainment","employmentType":"FULL_TIME", "workHours": "24/7",  "datePosted": "2018-08-21","validThrough":"2018-09-19T17:15","jobLocation": {"@type":"Place","address":{"@type":"PostalAddress","streetAddress":"Moiavenue","addressLocality":"Nairobi","postalCode":"60100","addressCountry":"KE","addressRegion":"KE"}},"baseSalary":{"@type":"MonetaryAmount","currency": "KES","value":{"@type":"QuantitativeValue",  "minValue": 25000,"maxValue":100000,  "value": 50000,"unitText": "MONTH"}},responsibilities":"Business and corporate tasks","skills":"N/a", "qualifications": "n/a",  "educationRequirements": "none", "experienceRequirements": "none"}', type: 'application/ld+json' }
    ]
  },
  data () {
    return {
      moduleName: '',
      size: 'xs',
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
</style>
