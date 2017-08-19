
<script>

    export default{

        methods : {
           validateEmail(username) {
                let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regExp.test(username);
            },
            checkLength (item, length) {

                return (item.length > length)? true : false;
            }
        }
    }
</script>
