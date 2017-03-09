<template>
  <div class='about'>
    <h1 class='page-header'>About this web application</h1>
    <p>This is a full-stack <strong>RESTful API</strong> backend created in node, built with <strong>Sequelize ORM</strong>. </p>
    <p>The front end client is a <strong>SPA</strong> that is built using <strong>Vue2.0.js</strong></p>
    <br>
    <div class='text-center'><button class='btn btn-default' @click='goBack()'>go back</button></div>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {

      }
    },
    methods: {
      goBack: function() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
</style>
