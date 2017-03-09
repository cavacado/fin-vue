<template>
  <div class='add container'>
    <Alert v-if='alert' :message='alert' />
    <h1 class='page-header'>Add Book</h1>
    <form @submit='addBook'>
      <div class='well'>
        <div class='form-group'>
          <label>Book Title</label>
          <input type='text' class='form-control' placeholder='Title' v-model='book.title'>
        </div>

        <div class='form-group'>
          <label>Book Author</label>
          <input type='text' class='form-control' placeholder='Author' v-model='book.author'>
        </div>

        <div class='form-group'>
          <label>Book Description</label>
          <textarea class='form-control' placeholder='Description' rows='3' v-model='book.description'></textarea>
        </div>

        <div class='checkbox'>
          <label><input type='checkbox' v-model='book.read'> Read? </label>
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
    name: 'add',
    data() {
      return {
        book: {},
        apiPath: process.env.API_PATH || 'http://localhost:8080/',
        alert: '',
      }
    },
    methods: {
      addBook(e){
        let vm = this;
        if (!this.book.title && !this.book.author) {
          this.alert = 'Please fill in all required fields';
        } else {
          let newBook = {
            title: this.book.title,
            author: this.book.author,
            description: this.book.description,
            read: this.book.read,
            userId: 1
          }
          let config = {
            headers: {'Authorization': `Bearer ${localStorage.token}`},
          }
          axios.post(`${vm.apiPath}${localStorage.userId}/books`, newBook, config).then(function(response) {
            console.log(response);
            vm.$router.push({ path: '/list', query: {alert: 'Book added successfully' }});
          }).catch(function(error) {
            console.log(error);
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

<style scoped>
</style>
