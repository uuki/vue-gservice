export default class GoogleAuthService {

  constructor ($gs) {
    this.$gs = $gs;

    this.searchList = this.searchList.bind(this)
    this.videosList = this.videosList.bind(this)
    this.liveBroadcastsList = this.liveBroadcastsList.bind(this)
  }

  // NOTE: handleErr method, this is private
  _handleErr (err) {
    console.error(err)
  }

  async commentsList (options) {
    const { result } = await this.$gs.gapi.client.youtube.comments.list(options)
    return result;
  }

  async searchList (options) {
    const { result } = await this.$gs.gapi.client.youtube.search.list(options)
    return result;
  }

  async videosList (options) {
    const { result } = await this.$gs.gapi.client.youtube.videos.list(options)
    return result;
  }

  async liveBroadcastsList (options) {
    const { result } = await this.$gs.gapi.client.youtube.liveBroadcasts.list(options)
    return result;
  }
}