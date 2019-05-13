# VueGService

<!-- [![Build Status](https://travis-ci.org/uuki/vue-gservice.svg?branch=master)](https://travis-ci.org/uuki/vue-GService) -->

## Overview

Google API Services wrapper for Vue 2.

## Installation

### Step 1

```shell
$ yarn add uuki/vue-gapi
$ yarn add uuki/vue-gservice
```

### Step 2

Use [VueGAPI](https://github.com/cedpoilly/vue-gapi) for GAPI authentication.

```js
import Vue from 'vue'
import VueGAPI from 'vue-gapi'
import VueGService from 'vue-gservice'

/**
 * @see https://github.com/cedpoilly/vue-gapi
 */
Vue.use(VueGAPI, {
  apiKey: '<API_KEY>',
  clientId: '<CLIENT_ID>',
  discoveryDocs: ['<DISCOVERY_DOCS>'],
  scope: '<SCOPE>',
})
Vue.use(VueGService, {
  use: {
    gdrive: true, // When using Drive API.
    youtube: true, // When using Youtube Data API.
  }
})
```

## Google Drive

### Methods

- $gdrive.createFile（`gapi.client.drive.files.create`）
- $gdrive.deleteFile（`gapi.client.drive.files.delete`）
- $gdrive.getFiles（`gapi.client.drive.files.list`）

#### Usage

```javascript
<script>
  export default {
    methods: {
      async createFile () {
        const result = await this.$gdrive.createFile({
          name: '<FILE_NAME>',
          parents: ['<FOLDER_ID>'],
          uploadType: 'media',
          fields: 'id, name, parents',
          media: {
            mimeType: '<MIME_TYPE>'
          },
          resource: {
            mimeType: 'application/vnd.google-apps.<FILE_TYPE>'
          }
        })
      },
      async getListFiles () {
        const result = await this.$gdrive.getListFiles({
          orderBy: 'folder,modifiedTime',
          q: "trashed=false and '<DRIVE_ID>' in parents",
          fields: 'files(id, name, kind, size, mimeType, lastModifyingUser, modifiedTime, iconLink, owners, folderColorRgb, shared, webViewLink, webContentLink), nextPageToken',
        });
      },
      async deleteFile () {
        const result = await this.$gdrive.deleteFile({
          fileId: '<FILE_ID>'
        })
      },
    }
  }
</script>
```

### Directives

- v-gd-upload-area

※ require scope -> `https://www.googleapis.com/auth/drive`

#### Usage

Supports `multiple` attribute.

```html
<template>
  <div>
    <!-- input pattern -->
    <input type="file" multiple v-gd-upload-area="uploadArea">

    <!-- droppable pattern -->
    <div v-gd-upload-area="uploadArea" />
  </div>
</template>

<script>
  export default {
    data () {
      uploadArea: {
        uploadOptions: {
          path: '/upload/drive/v3/files',
        },
        metaExtends: {
          parents:['<TARGET_FOLDER_ID>']
        },
        callback: this.onUploaded
      }
    },
    onUploaded (objFile) {
      console.log(objFile);
    }
  }
</script>
```

## Youtube

wip
