import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6SauPRgt7rpHdc3knlZhKmT5g6ZGyHbw',
  authDomain: 'supertictactoe-co.firebaseapp.com',
  databaseURL: 'https://supertictactoe-co.firebaseio.com',
  projectId: 'supertictactoe-co',
  storageBucket: 'supertictactoe-co.appspot.com',
  messagingSenderId: '692461279690',
  appId: '1:692461279690:web:a20c0eff0aabab37965733',
  measurementId: 'G-HKS6TZLLCS'
}

// InitFirebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
