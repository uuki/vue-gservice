/**
 * vue-gservice
 */

// Utils
import { asyncForEach } from './utils'

// Libs
import VueEventHub from './libs/vue.eventHub'

// Service
import Service from './service'

async function plugin (Vue, clientOptions = {}) {
  /**
   * State
   */
  const state = {
    gapi: null,
    authInstance: null,
  };

  /**
   * Plugin options
   */
  const options = {
    namespace: '$gs',
    use: {
      drive: false,
      youtube: false,
    },
    drive: {
      apiKey: ''
    },
    youtube: {
      apiKey: ''
    }
  };

  Vue.use(VueEventHub);

  Object.assign(state, options, clientOptions);
  Vue.util.defineReactive(Vue.prototype, options.namespace, state)

  /**
   * Initialize services
   */
  new Service(Vue, options.namespace);

  /**
   * Load GAPI
   * @desc Depends on another plugin `uuki/vue-gapi`.
   * @see  https://github.com/uuki/vue-gapi
   */
  const gapi = await Vue.prototype.$getGapiClient()
                .catch((e) => {
                  console.error('vue-gapi is not installed. Please `$yarn add uuki/gapi`', e)
                  return;
                })
  // new gapi.auth2.SigninOptionsBuilder().setScope('https://www.googleapis.com/auth/drive.file')

  Vue.prototype[options.namespace].gapi = gapi;
  Vue.prototype.$eventHub.$emit('gapiReady');
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin;