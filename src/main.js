import Vue from 'vue'
import App from './App.vue'
import Title from './Title.vue'
import Chat from './Chat.vue'

Vue.component('shat-title', Title);
Vue.component('shat-chat', Chat);

new Vue({
  el: '#app',
  render: h => h(App)
});
