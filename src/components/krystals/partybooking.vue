<template>
  <div class="container-fluid">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="purple lighten-2 ma-2 xs12">

          <v-layout row wrap>
            <v-flex xs12>
              <div class="headline">
                Book For party:
              </div>
            </v-flex>
            <v-flex xs12>
              <v-card-actions class="body-1 mt-2">                
                <v-btn  color="blue" @click="roter">Add more Girls</v-btn>
                <v-dialog v-model="dialog" persistent max-width="500px">

                  <v-btn  color="success" dark slot="activator">Finish</v-btn>

                  <v-card>
                    <v-card-title>
                      <span class="display-1">Payment Procedure</span>
                    </v-card-title>
                    <v-card-text>
                      <h1>Paybill Number: 887667</h1>
                      <div>
                        Steps to follow:
                        <div>
                          1. Go to mpesa, lipa na mpesa, Paybill
                          <br />
                          2. Enter the business number 887667
                          <br />
                          3. Enter account number as your name
                          <br />
                          4. Enter amount Ksh. {{parseInt(this.$store.getters.getPartyVixens.length) * 800}} /=.
                          <br />
                          5. Complete Transaction
                        </div>
                        <div>
                          <v-form>
                            <v-text-field  label="Enter Mpesa Confirmation Code "  v-model="mpesa"  type ="text"  required></v-text-field>
                          </v-form>
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="Book">All Good</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- <v-btn round block color="info" class="mx-auto" @click="dialog=!dialog">Checkout</v-btn> -->
              </v-card-actions>
              <v-card-text light class="small mt-2">
                <v-list class="purple lighten-3 pa-2">
                  <v-list-tile avatar v-for="item in partyVixens" :key="item.id"  class="accent elevation-1 ma-2 pt-1 pb-1">
                    <!-- <v-avatar></v-avatar> -->
                    <v-card-media>
                      <img width="50px" height="50px" :src="item.src" >
                    </v-card-media>
                    <v-list-tile-content class="headline ">
                      <v-list-tile-title>
                        {{item.vixen }} - {{item.type}}
                        <!-- <v-spacer></v-spacer> -->
                        <v-icon style="cursor:pointer; color: red" @click="removeFromParty(item.id)">clear</v-icon>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <v-card-actions class="body-1 mt-2">
                <!-- <v-btn round color="error" class="mx-auto" @click="dialog=!dialog">Close</v-btn> -->
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    //
    dialog: false
  }),
  methods: {
    //
    roter () {
      this.$router.push('/executive/party/4')
    },
    removeFromParty (id) {
      console.log('Remove from cart ' + id)
    }
  },
  computed: {
    partyVixens () {
      return this.$store.getters.getPartyVixens
    }
  }

}
</script>
<style scoped>
</style>
