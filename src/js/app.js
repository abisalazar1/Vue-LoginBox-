import Vue from 'vue';
window.axios = require('axios');

Vue.component('login_box', require('./components/LoginBox.vue'));
Vue.component('login_content', require('./components/LoginContent.vue'));
Vue.component('login_registration_content', require('./components/LoginRegistrationContent.vue'));


window.Event = new Vue();
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})