/**
 * gapi.client.load (Deplicated)
 */
const gapiClientLoadPromise = {
  install: function (Vue, options) {
    Vue.prototype.$gapiClientLoadPromise = (gapi, name, version, callback) => {
      return new Promise((resolve, reject) => {
        gapi.client.load(name, version, () => {
          if ( typeof callback === 'function' ) callback();
          resolve();
        })
      })
    }
  }
}
export default gapiClientLoadPromise