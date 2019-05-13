<template>
  <section class="pattern">
    <div class="pattern__content">
      <h2 class="pattern__head">Auth, Create, Delete, List</h2>

      <ul class="serviceList">
        <li><a class="button" @click="searchList">searchList</a></li>
        <li><a class="button" @click="videosList">videosList</a></li>
        <li><a class="button" @click="liveBroadcastsList">liveBroadcastsList</a></li>
      </ul>
    </div>

    <div class="pattern__content">
      <h2 class="pattern__head">Live Stream</h2>

      <div class="pattern__content">
        <h2 class="pattern__head">Sample Live</h2>
        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/live_stream?channel=${ channelSampleId }`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <h2 class="pattern__head">Original Live</h2>
        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/live_stream?channel=${ channelId }`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>

  </section>
</template>

<script>
  // ignored file
  import auth from './auth'

  export default {
    name: 'youtube',
    data() {
      return {
        channelId: auth.channelId,
        channelSampleId: auth.channelSampleId,
        uploadArea: {
          uploadOptions: {
            path: '/upload/drive/v3/files',
          },
          metaExtends: {
            parents:[auth.testFolderId]
          },
          callback: this.onUploaded
        }
      }
    },
    mounted () {
    },
    methods: {
      async searchList () {
        const result = await this.$gs.youtube.searchList({
          part: 'snippet',
          q: '天気'
        })
        console.log(result)
      },
      async videosList () {
        const result = await this.$gs.youtube.videosList({
          part: 'liveStreamingDetails',
          id: auth.liveId
        })
        console.log(result)
      },
      async liveBroadcastsList () {
        const result = await this.$gs.youtube.liveBroadcastsList({
          part: 'snippet',
          id: auth.broadCastSampleId,
        })
        console.log(result)
      },
    }
  }
</script>