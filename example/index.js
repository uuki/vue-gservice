import Vue from 'vue'
import App from './app.vue'
import VueGService from '../src'

/**
 * Plugins
 */
import VueGAPI from 'vue-gapi'

// ignored file
import auth from './auth'

Vue.config.debug = true

/**
 * VueGAPI
 * @see About scopes
 *   Drive API       : https://developers.google.com/drive/api/v3/about-auth
 *   Youtube Data API: https://developers.google.com/youtube/v3/guides/auth/installed-apps?hl=ja
 *   More            : https://developers.google.com/identity/protocols/googlescopes
 * @see About discoveryDocs
 *   https://developers.google.com/api-client-library/javascript/features/discovery?hl=ja
 */
Vue.use(VueGAPI, {
  apiKey: auth.apiKey,
  clientId: auth.clientId,
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  ],
  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube',
})
Vue.use(VueGService, {
  use: {
    drive: true,
    youtube: true
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
})