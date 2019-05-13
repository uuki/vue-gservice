<template>
  <div class="demo">
    <h1>DEMO</h1>

    <ul class="serviceList">
      <li><a class="button" @click="login">Login</a></li>
      <li><a class="button" @click="logout">Logout</a></li>
      <li><a class="button" @click="isAuthenticated">Authenticated</a></li>
      <li><a class="button" @click="getUserData">User data</a></li>
    </ul>

    <details>
      <summary>Google Drive</summary>
      <drive />
    </details>

    <details>
      <summary>Youtube</summary>
      <youtube />
    </details>

  </div>
</template>

<script>
  // Components
  import Drive from './drive'
  import Youtube from './youtube'

  export default {
    name: 'App',
    data() {
      return {
      }
    },
    components: {
      Drive,
      Youtube
    },
    watch: {
      '$gapi.authenticated': 'onChangeAuthenticated'
    },
    methods: {
      onChangeAuthenticated () {
        alert(this.$gapi.authenticated)
      },
      login () {
        this.$login()
      },
      logout () {
        this.$logout()
      },
      isAuthenticated () {
        const loginState = this.$isAuthenticated()
        console.log(loginState)
      },
      getUserData () {
        const userData = this.$getUserData()
        console.log(userData)
      },
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    font-size: 16px;
  }

  p {
    line-height: 1.8;
    margin: 0;
    letter-spacing: .02em;
  }

  details {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  summary {
    font-size: 20px;
    font-weight: bold;
  }

  .demo {
    width: 800px;
    margin: auto;
    padding: 40px 0;
  }

  .pattern {
    min-height: 250px;
    margin-bottom: 40px;
  }

  .pattern__content {
    font-weight: bold;
  }

  .serviceList {
    margin: 0 0 20px;
    padding: 0;
    list-style: none;

    &:last-child {
      margin-bottom: 0;
    }

    li {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .droppable {
    position: relative;
    width: 600px;
    height: 100px;
    background-color: #318cef;
    border-radius: 6px;
    z-index: 0;
    cursor: pointer;

    &::before {
      content: 'Drag it here.';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      z-index: -1;
    }
  }

  .button {
    display: block;
    width: 160px;
    padding: 7px 14px;
    color: #fff;
    text-align: center;
    background-color: #2d967f;
    border-radius: 3px;
    cursor: pointer;
    box-sizing: border-box;
    transition: opacity .2s 0s ease-out;

    &:hover {
      opacity: .8;
    }
  }
</style>