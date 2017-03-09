<template>
  <div class='container'>
    <Alert v-if='alert' :message='alert' />
    <h1 class='page-header'>Provide your credentials!</h1>
    <form @submit='addUser'>
      <div class='well'>
        <div class='form-group'>
          <label>Name</label>
          <input type='text' class='form-control' placeholder='enter your name' v-model='user.name'>
        </div>

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
import Alert from './Alert';
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
    addUser(e){
      let vm = this;
      if (!this.user.name && !this.user.email && !this.user.password) {
        this.alert = 'Please fill in all required fields';
      } else {
        let newUser = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        }
        axios.post(`${vm.apiPath}/register`, newUser).then(function(response) {
          console.log(response);
          vm.$router.push({ path: '/', query: {alert: 'User registered successfully' }});
        }).catch(function(error) {
          // console.log(error);
        })
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  components: {
    Alert
  }
}
</script>

<style scoped></style>
