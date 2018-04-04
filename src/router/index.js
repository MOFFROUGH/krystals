import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Career from '@/components/home/career'
import Executive from '@/components/executive'
import Escorts from '@/components/escorts'
import EscortsOne from '@/components/escortsone'
import ExecBooking from '@/components/executivebooking'
import EscortBooking from '@/components/vixensbooking'
import oneExecutive from '@/components/oneExecutive'
import About from '@/components/about'
import Paypal from '@/components/paypal'
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
    {
      path: '/escorts',
      name: 'Escorts',
      component: Escorts
    },
    {
      path: '/escorts/:id',
      name: 'oneEscort',
      component: EscortsOne,
      props: true
    },
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
      path: '/executive/:id',
      name: 'oneExecutive',
      component: oneExecutive,
      props: true
    },
    {
      path: '/escort/:vixenid/book/:serviceid',
      props: true,
      name: 'EscortBooking',
      component: EscortBooking
    },
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
    }
  ],
  mode: 'history'
})
