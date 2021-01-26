<template>
    <div class="page-wraper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="validateBeforeSubmit">

      <div v-if="serverErrors" class="server-error">
        <div v-for="(value, key) in serverErrors" :key="key">{{value[0]}}</div>  
      </div>

      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="login-input" :class="{ 'input-error': errors.has('name') }" v-model="name" v-validate="'required'">
        <span class="form-error">{{errors.first('name')}}</span>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" class="login-input" :class="{ 'input-error': errors.has('email') }" v-model="email" v-validate="'required|email'">
        <span class="form-error">{{errors.first('email')}}</span>
        <!-- <span class="form-error">{{error_email}}</span> -->
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" :class="{ 'input-error': errors.has('password') }" v-model="password" v-validate="'required|min:6'">
        <span class="form-error">{{errors.first('password')}}</span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
    // created(){
    //   this.$toast.success({
    //       title: 'Register successfully',
    //       message: 'You can login here'
    //   })
    // },
    data(){
        return{
            name: '',
            email: '',
            password: '',
            serverErrors: '',
            successMessage: '',
        }
    },
    methods:{
        register(){
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
                .then(() => {
                  this.successMessage = 'Register successfully!'
                  this.$router.push({ name: 'login', params: { dataSuccessMessage: this.successMessage } })
                  this.$toast.success({
                      title: this.successMessage,
                      message: 'You can login here'
                  })
                })
                .catch(error => {
                  console.log(Object.values(error.response.data))
                  this.serverErrors = Object.values(error.response.data.errors)
                  // this.error_email = error.response.data.error.email
                })
        },
        validateBeforeSubmit() {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.register()
            }
          });
        }
    }
}
</script>