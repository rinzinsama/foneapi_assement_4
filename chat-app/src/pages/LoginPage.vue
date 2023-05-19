<template>
  <div class="row q-pa-md">
  <div class="q-pa-md col-md-4 offset-md-4" style="max-width: 400px">
    <div class="text-h3 text-center text-blue "> Login</div>
    <q-form class=" q-mt-lg">
      <q-input filled dense v-model="formData.username" class="q-pa-sm" label="Username" lazy-rules />
      <q-input filled dense v-model="formData.password" class="q-pa-sm" label="Password" type="password" lazy-rules />

      <div class="q-pa-md">
        <q-btn label="Sign In" size="sm" @click="login" color="primary" />
        <q-btn label="Register" size="sm" flat to="/register" color="primary" />
      </div>
    </q-form>

  </div>
</div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    };
  },
  mounted(){
    if(this.$q.localStorage.getItem('LOGIN_USER')){
      this.$router.push('/')
    }
   
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', this.formData);
        // Handle successful login response
        if(response){
          this.$q.notify(response.data.message)
          this.$q.localStorage.set('LOGIN_USER', response.data.data)
            this.$router.push('/')
        }
        
        console.log(response.data); // You can customize the handling of the response
      } catch (error) {
        // Handle error
        this.$q.notify('failed to login')
        console.error(error);
      }
    },
  },
};
</script>
  