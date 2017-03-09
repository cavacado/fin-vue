<template>
    <div class='container'>
      <Alert v-if='alert' :message='alert' />
      <div class='text-center'>
        <img src="static/logo.png">
      </div>
      <br />

      <div class="jumbotron">
        <h1>fin-vue</h1>
        <p class="lead">Welcome to fin-vue, a basic SPA application consuming a backend RESTful API</p>
        <div id='flex'>
          <router-link to='/register'><button class='btn btn-success'>Register now!</button></router-link>
          <router-link to='/login'><button class='btn btn-primary'>Login now!</button></router-link>
        </div>
        <blockquote>
          <p>{{quote}}</p>
        </blockquote>
      </div>

    </div>
</template>

<script>
  import Alert from './Alert.vue';
  import axios from 'axios';
  export default {
    name: 'main',
    data() {
      return {
        alert: '',
        quote: '',
      }
    },
    methods: {
      // disableHome() {
      //   document.getElementById('home').style.display = 'none';
      // }
    },
    // mounted: function() {
    //   this.disableHome();
    // },
    created: function() {
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
    },
    components: {
      Alert
    },
  }
</script>

<style scoped>

</style>
