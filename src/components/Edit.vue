<template>
  <div class='add container'>
    <Alert v-if='alert' :message='alert' />
    <h1 class='page-header'>Edit Book</h1>
    <form @submit='updateBook'>
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
  </div>
</template>

<script>
  import axios from 'axios';
  import Alert from './Alert.vue';
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
      fetchBook(id) {
        let vm = this;
        let config = {
          headers: {'Authorization': `Bearer ${localStorage.token}`},
        }
        axios.get(`${vm.apiPath}books/${id}`, config).then(function(response) {
          console.log(response.data);
          vm.book = response.data;
        })
      },
      updateBook(e){
        let vm = this;
        if (!this.book.title && !this.book.author) {
          this.alert = 'Please fill in all required fields';
        } else {
          let updateBook = {
            title: this.book.title,
            author: this.book.author,
            description: this.book.description,
            read: this.book.read,
          }
          let config = {
            headers: {'Authorization': `Bearer ${localStorage.token}`},
          }
          axios.put(`${vm.apiPath}books/${this.$route.params.id}`, updateBook, config).then(function(response) {
            console.log(response);
            vm.$router.push({ path: '/list', query: {alert: 'Book updated successfully' }});
          }).catch(function(error) {
            console.log(error);
          })
          e.preventDefault();
        }
        e.preventDefault();
      }
    },
    created: function(){
      this.fetchBook(this.$route.params.id);
    },
    components: {
      Alert
    }
  }
</script>

<style scoped>
</style>
