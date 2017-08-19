<template>
    <div>
        <div class="row">
            <input type="text" class="form-control" v-model="first_name"  placeholder="First Name">
            <span class="error">{{ first_name_verify }}</span>
        </div>
        <div class="row">
            <input type="text" class="form-control" v-model="last_name"  placeholder="Last Name">
            <span class="error">{{ last_name_verify }}</span>
        </div>
        <div class="row">
            <select class="form-control"  v-model="selected" >
                <option disabled value="">Event</option>
                <option v-for="event in events" :value="event.id">{{ event.name }}</option>

            </select>
        </div>
        <div class="row">
            <input type="text" class="form-control" v-model="email" placeholder="Email">
            <span class="error">{{ email_verify }}</span>
        </div>
        <div class="row">
            <input type="password" class="form-control" v-model="password"
                   placeholder="Password">
            <span class="error">{{ password_verify }}</span>
        </div>
        <div class="row">
            <div class="container_left">
                <button class="btn btn-primary primary_btn_color" @click="sendData">
                    Register
                </button>
            </div>
            <div class="container_left">
                <button class="btn btn-success btn-blank" @click="formSwap">
                    Log in
                </button>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
 import Validation from './LoginValidation.vue'
    export default{
        extends: Validation,
        data(){
            return{
                first_name: '',
                last_name: '',
                events:[],
                selected: '',
                email: '',
                password : '',
                display_errors : false,
            }
        },
        computed : {
            first_name_verify () {
                if(this.first_name.length == 0 && this.display_errors == false ){
                    return;
                }
               return ( ! this.checkLength(this.first_name , 2))?  'First Name has be more than 2 characters.' : '';
            },
            last_name_verify () {
                if(this.last_name.length == 0  && this.display_errors == false){
                    return;
                }
               return ( ! this.checkLength(this.last_name , 2))?  'Last Name has be more than 2 characters.' : '';
            },
            email_verify () {
                 if(this.email.length == 0 && this.display_errors == false){
                    return;
                }
               return ( ! this.validateEmail(this.email))? 'Email has to be valid email.' : '';
            },
            password_verify () {
             if(this.password.length == 0 && this.display_errors == false ){
                    return;
                }
               return ( ! this.checkLength(this.password , 5))? 'Password has be more than 5 characters.' : '';
            },
            verify_all () {
                return (this.checkLength(this.first_name , 2) && this.checkLength(this.last_name , 2) && this.checkLength(this.password , 5) && this.checkLength(this.selected , 2) && this.validateEmail(this.email))? true : false;
            }

        },
        methods: {
             sendData () {
                this.display_errors = true;
                    if(this.verify_all){
                          axios.post('https://airfinity-front-end-test.herokuapp.com/api/auth/signup', {
                                username: this.email,
                                password: this.password,
                                firstname: this.first_name,
                                lastname: this.last_name,
                                eventId: this.selected
                          })
                          .then(function (response) {
                            this.first_name = '';
                            this.last_name = '';
                            this.selected = '';
                            this.email = '';
                            this.password = '';
                            console.log(response.data);
                          })
                          .catch(function (error) {
                            console.log(error);

                          });
                    }
            },
            formSwap () {
                 Event.$emit('RegistrationBoxToggle', {
                    registrationBox : false
                });
            }
        },
        created () {
            axios.get('https://airfinity-front-end-test.herokuapp.com/api/events').then( (response) => {
                this.events = response.data.data;
              })
              .catch( (error) => {
                console.log(error);
              });

        }
    }
</script>
