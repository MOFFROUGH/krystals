import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Contact from '@/components/home/contact'
import Executive from '@/components/krystals/executive'
import Party from '@/components/krystals/party'
import oneExecutive from '@/components/krystals/oneExecutive'
import ExecBooking from '@/components/krystals/executivebooking'
import PartyBooking from '@/components/krystals/partybooking'

import Paypal from '@/components/payment/paypal'

Vue.use(Router)
Vue.use(Meta)
export default new Router({
  routes: [
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/',
      name: 'Executive',
      component: Executive
    },
    {
      path: '/escort/partybooking',
      name: 'partybooking',
      component: PartyBooking
    },
    {
      path: '/escort/party/:id',
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
      path: '*',
      name: 'default',
      component: Executive
    }
  ],
  mode: 'history',
  hashbang: false
})
