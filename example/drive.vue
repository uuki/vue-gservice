<template>
  <section class="pattern">
    <div class="pattern__content">
      <h2 class="pattern__head">Auth, Create, Delete, List</h2>

      <ul class="serviceList">
        <li><a class="button" @click="createFile">Create File</a></li>
        <li><a class="button" @click="deleteFile">Delete File</a></li>
        <li><a class="button" @click="getFiles">Get File</a></li>
      </ul>
    </div>

    <div class="pattern__content">
      <h2 class="pattern__head">Upload</h2>

      <div class="droppable" v-gd-upload-area="uploadArea" />
    </div>

  </section>
</template>

<script>
  // ignored file
  import auth from './auth'

  export default {
    name: 'drive',
    data() {
      return {
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
    methods: {
      async createFile () {
        const result = await this.$gs.drive.createFile({
          name: 'dummy',
          parents: [auth.testFolderId],
          uploadType: "media",
          fields: "id, name, parents",
          media: {
            mimeType: "text/plain"
          },
          resource: {
            mimeType: "application/vnd.google-apps.document"
          }
        })
        console.log(result)
      },
      async deleteFile () {
        const result = await this.$gs.drive.deleteFile({
          fileId: ''
        })
        console.log(result)
      },
      async getFiles () {
        const result = await this.$gs.drive.getFiles({
          orderBy: 'folder,modifiedTime',
          q: `trashed=false and ${ auth.testFolderId } in parents`,
          fields: 'files(id, name, kind, size, mimeType, lastModifyingUser, modifiedTime, iconLink, owners, folderColorRgb, shared, webViewLink, webContentLink), nextPageToken',
        })
        console.log(result)
      },
      async updatePermission () {
        const result = await this.$gs.drive.updatePermission()
        console.log(result)
      },
      onUploaded (objFile) {
        console.log(objFile)
      }
    }
  }
</script>