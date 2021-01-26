<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">

      <div class="success-message" v-if="successMessage">{{successMessage}}</div>

      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="email">Username/Email</label>
        <input type="email" name="username" id="username" class="login-input" v-model="username">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" :disabled="loading">
          <div class="lds-ring-container" v-if="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
          Login
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String
    }
  },
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false
    }
  },
  methods: {
    login() {
      //alert('1')
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'todo' })
        })
        .catch(error => {
          this.loading = false
          console.log(error.response.data)
          this.serverError = error.response.data
          this.successMessage = ''
        })
    }
  }
}
</script>