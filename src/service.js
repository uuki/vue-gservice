// Google Drive
import VueGDrive from './gdrive'
import uploadArea from './directives/gdrive/upload_area'

// Youtube
import VueYoutube from './youtube'

export default class Service {

  constructor (Vue, namespace) {
    this._vm = Vue;
    this.state = Vue.prototype[namespace];
    this.modules = {};

    this.initialize();
  }

  initialize () {
    this.modules['drive'] = () => {
      this._vm.use(VueGDrive, this.state)
      this._vm.directive('gdUploadArea', uploadArea)
    }

    this.modules['youtube'] = () => {
      this._vm.use(VueYoutube, this.state)
    }

    /**
     * Add methods and directive
     */
    Object.keys(this.state.use).forEach((k) => {
      if ( this.state.use[k] && typeof this.modules[k] === 'function' ) this.modules[k]();
    })
  }
}
