// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import Main from './components/Main.vue';
import Books from './components/Books.vue';
import About from './components/About.vue';
import Add from './components/Add.vue';
import BookDetails from './components/BookDetails.vue';
import Edit from './components/Edit.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Alert from './components/Alert.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Main },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/list', component: Books },
    { path: '/about', component: About },
    { path: '/add', component: Add },
    { path: '/book/:id', component: BookDetails },
    { path: '/edit/:id', component: Edit },
  ]
})
/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id='app'>
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li v-show='tokenBoolean' role="presentation" class="active"><router-link to='/list'>Home</router-link></li>
            <li role="presentation"><router-link to='/about'>About</router-link></li>
            <li v-show='tokenBoolean' @click='clearLocalStorage()' role="presentation"><router-link to='/'>Logout</router-link></li>
          </ul>
        </nav>
        <h3 class="text-muted">fin-vue</h3>
      </div>
      <div class='container'>
        <Alert v-if='alert' :message='alert' />
      </div>
      <router-view></router-view>

      <footer class="footer">
        <p>&copy; 2016 fin-vue, Inc.</p>
      </footer>

      </div> <!-- /container -->
    </div>
  `,
  data: {
    tokenBoolean : !!localStorage.token,
    alert: ''
  },
  methods: {
    clearLocalStorage: function() {
      localStorage.clear();
      this.tokenBoolean = false;
      this.alert = 'User successfully logged out';
    },
  },
  components: {
    Alert
  },
}).$mount('#app');
