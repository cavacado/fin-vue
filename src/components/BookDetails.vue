<template>
  <div class='details container'>
    <h1 class='page-header'>{{book.title}}
      <span class='pull-right'>
        <router-link class='btn btn-primary' :to="'/edit/'+book.id">Edit</router-link>
        <button class='btn btn-danger' @click='deleteBook(book.id)'>Delete</button>
      </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item"><strong>Author</strong>: {{book.author}}</li>
      <li class="list-group-item"><strong>Description</strong>: {{book.description}}</li>
      <li class="list-group-item"><strong>Read?</strong>: {{book.read}}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'bookdetails',
    data() {
      return {
        apiPath: process.env.API_PATH || 'http://localhost:8080',
        book: {},
      }
    },
    methods: {
      fetchBook(id) {
        let vm = this;
        let config = {
          headers: {'Authorization': `Bearer ${localStorage.token}`},
        }
        axios.get(`${vm.apiPath}/books/${id}`, config).then(function(response) {
          // console.log(response.data);
          vm.book = response.data;
        })
      },
      deleteBook(id) {
        // console.log(id);
        let vm = this;
        let config = {
          headers: {'Authorization': `Bearer ${localStorage.token}`},
        }
        axios.delete(`${vm.apiPath}/books/${id}`, config).then(function(response) {
          console.log(response);
          vm.$router.push({ path: '/list', query: { alert: 'Book deleted!'}});
        })
      }
    },
    created: function() {
      this.fetchBook(this.$route.params.id);

    },
  }
</script>

<style scoped>
</style>
