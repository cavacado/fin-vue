<template>
  <div class='books container'>
    <Alert v-if='alert' :message='alert' />
    <h1 class='page-header'>Books</h1>
    <input class='form-control' placeholder="filter by author of book" v-model='filterInput'>
    <br />
    <router-link to='/add'><button class='btn btn-primary pull-right'>Add Book</button></router-link>
    <table class='table table-striped'>
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>description</th>
          <th>read</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='book in filterBy(books, filterInput)'>
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td> {{ book.description }} </td>
          <td> {{ book.read }} </td>
          <td><router-link class='btn btn-default' :to="'/book/' + book.id">view this book</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import Alert from './Alert.vue';
  export default {
    name: 'books',
    data() {
      return {
        books: [],
        apiPath: 'http://localhost:8080/',
        alert: '',
        filterInput: ''
      }
    },
    methods: {
      fetchBooks() {
        let vm = this;
        let config = {
          headers: {'Authorization': `Bearer ${localStorage.token}`},
        }
        axios.get(`${vm.apiPath}${localStorage.userId}/books`, config).then(function(response) {
          // console.log(response.data);
          vm.books = response.data
        })
      },
      filterBy(list, value) {
        return list.filter(function(book) {
          return book.author.indexOf(value) > -1;
        })
      }
    },
    created: function() {
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchBooks();
    },
    updated: function() {
      // this.fetchBooks();
    },
    components: {
      Alert
    }
  }
</script>

<style scoped>
</style>
