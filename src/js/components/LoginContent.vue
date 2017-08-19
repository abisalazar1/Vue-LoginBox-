<template>
    <div>
        <div class="row">
            <input type="text" class="form-control" v-model="username" placeholder="Username">
            <span class="error">{{ username_verify }}</span>
        </div>
        <div class="row">
            <input type="password" class="form-control" v-model="password"
                   placeholder="Password">
            <span class="error">{{ password_verify }}</span>
        </div>
        <div class="row">
            <div class="container_left">
                <button class="btn btn-primary primary_btn_color" @click="sendData">
                    Log in
                </button>
            </div>

            <div class="container_left">
                <button class="btn btn-primary btn-blank" @click="formSwap">
                    Register
                </button>
            </div>
            <div v-show="message" class="error">{{ message }}</div>

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
                username: '',
                password : '',
                display_errors : false,
                message : '',
            }
        },
        computed : {
            password_verify () {
                if(this.password.length == 0 && this.display_errors == false){
                    return;
                }
               return ( ! this.checkLength(this.password , 5))?  'Password has be more than 5 characters.' : '';
            },
            username_verify () {
                 if(this.username.length == 0 && this.display_errors == false){
                    return;
                }
               return ( ! this.validateEmail(this.username))? 'Username has to be valid email.' : '';
            },
             verify_all () {
                return ( this.checkLength(this.password , 5) && this.validateEmail(this.username))? true : false;
            }

        },
        methods: {
             sendData () {
                    this.display_errors = true;
                  if(this.verify_all){
                      axios.post('https://airfinity-front-end-test.herokuapp.com/api/auth/login', {
                            username: this.username,
                            password: this.password,
                      })
                      .then( (response) => {
                        this.message = response.data.message;

                        if (Object.keys(response.data.data).length != 0 && response.data.data.constructor === Object){
                            setTimeout ( () => {
                                window.location.replace(response.data.data.redirectUrl);
                            }, 1000);
                        }
                      })
                      .catch( (error) => {
                        console.log(error);

                      });
                    }

                return false;
            },
            formSwap () {
                 Event.$emit('RegistrationBoxToggle', {
                    registrationBox : true
                });
            }

        }

    }


</script>
