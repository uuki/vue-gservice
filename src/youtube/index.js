import GoogleAuthService from './GoogleAuthService'

export default {
  install: function (Vue, clientConfig) {
    const $gservice = Vue.prototype[clientConfig.namespace];
    const _this = $gservice['youtube'] = {};
    const $methods = [
      'searchList',
      'videosList',
      'commentsList',
      'liveBroadcastsList',
    ];

    // TODO
    $methods.forEach(method => {
      _this[method] = () => { return 'Loading Google API...' }
    })

    Vue.prototype.$eventHub.$on('gapiReady', () => {
      /**
       * Instantiate service
       */
      const googleAuthService = new GoogleAuthService($gservice);
      $methods.forEach(method => {
        _this[method] = googleAuthService[method]
      })
    })
  }
}