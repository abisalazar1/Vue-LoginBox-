<template>
    <div>
        <div class="primary_color_header">
            <h3>{{ header }}</h3>
        </div>
        <div class="form_container" >
            <login_content v-if="! registerBox"></login_content>
            <login_registration_content v-if="registerBox"></login_registration_content>
        </div>
    </div>
</template>
<style>


</style>
<script>

    export default {

        data(){
            return{
                registerBox: false
            }
        },
        computed : {
           header () {
                return (this.registerBox)? 'Sign up today' : 'Log in';
           }
        },
        created () {
            Event.$on('RegistrationBoxToggle', (response) => {
                this.registerBox = response.registrationBox;
            });

        }

    }


</script>
