import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Career from '@/components/home/career'
import About from '@/components/home/about'
import Executive from '@/components/krystals/executive'
import Party from '@/components/krystals/party'
import oneExecutive from '@/components/krystals/oneExecutive'
import ExecBooking from '@/components/krystals/executivebooking'
import PartyBooking from '@/components/krystals/partybooking'
// import EscortBooking from '@/components/vixensbooking'
// import Escorts from '@/components/escorts'
// import EscortsOne from '@/components/escortsone'
import Paypal from '@/components/payment/paypal'
// admin routes
import Addpics from '@/components/admin/addpics'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/career',
      name: 'Career',
      component: Career
    },
    // {
    //   path: '/escorts',
    //   name: 'Escorts',
    //   component: Escorts
    // },
    // {
    //   path: '/escorts/:id',
    //   name: 'oneEscort',
    //   component: EscortsOne,
    //   props: true
    // },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/executive',
      name: 'Executive',
      component: Executive
    },
    {
      path: '/executive/partybooking',
      name: 'partybooking',
      component: PartyBooking
    },
    {
      path: '/executive/party/:id',
      name: 'party',
      component: Party,
      props: true
    },
    {
      path: '/executive/:id',
      name: 'oneExecutive',
      component: oneExecutive,
      props: true
    },
    // {
    //   path: '/escort/:vixenid/book/:serviceid',
    //   props: true,
    //   name: 'EscortBooking',
    //   component: EscortBooking
    // },
    {
      path: '/executive/:vixenid/book/:serviceid',
      props: true,
      name: 'ExecBooking',
      component: ExecBooking
    },
    {
      path: '/paypal',
      name: 'Paypal',
      component: Paypal
    },
    {
      path: '/admin/addpics',
      name: 'Addpics',
      component: Addpics
    },
    {
      path: '*',
      name: 'default',
      component: Executive
    }
  ],
  mode: 'history',
  hashbang: false
})
