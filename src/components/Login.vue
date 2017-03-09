<template>
  <div class='container'>
    <h1 class='page-header'>Provide your credentials!</h1>
    <form @submit='loginUser'>
      <div class='well'>

        <div class='form-group'>
          <label>Email</label>
          <input type='email' class='form-control' placeholder='enter your email' v-model='user.email'>
        </div>

        <div class='form-group'>
          <label>Password</label>
          <input type='password' class='form-control' placeholder='enter your password' v-model='user.password'>
        </div>

      </div>
      <button type='submit' class='btn btn-primary'>Submit</button>
    </form>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'register',
  data() {
    return {
      user: {},
      apiPath: process.env.API_PATH || 'http://localhost:8080',
      alert: '',
    }
  },
  methods: {
    loginUser(e){
      e.preventDefault();
      let vm = this;
      let verifyUser = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      }
      axios.post(`${vm.apiPath}/login`, verifyUser).then(function(response) {
        console.log(response);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', response.data.token);
        // $vm0.tokenBoolean = true;
        vm.$parent.tokenBoolean = true;
        vm.$router.push({ path: '/list', query: {alert: response.data.msg }});
      }).catch(function(error) {
        console.log(error);
        })
      }
    }
  }
</script>

<style scoped></style>
