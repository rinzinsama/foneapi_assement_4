<template>
  <div class="row q-pa-md">
  <div class="q-pa-md col-md-4 offset-md-4" style="max-width: 400px">
    <div class="text-h3 text-center text-blue "> Register</div>
    <q-form class=" q-mt-lg">
      <q-input filled dense v-model="formData.displayname" class="q-pa-sm" label="Display Name" lazy-rules />
      <q-input filled dense v-model="formData.username" class="q-pa-sm" label="username" lazy-rules />
      <q-input filled dense v-model="formData.password"  type="password" class="q-pa-sm" label="Password" lazy-rules />
      
      <q-input filled dense v-model="name" class="q-pa-sm" label="Confirm Password" type="password" lazy-rules />

      <div class="q-pa-md">
        <q-btn label="Sign Up " size="sm" @click="register" color="primary" />
        <q-btn label="Login Now" class="float-right" size="sm" flat to="/login" color="primary" />
      </div>
    </q-form>

  </div>
</div>
</template>
  
  <script>
  import axios from 'axios';
  console.log(process.env.API_URL)
  
  export default {
    data() {
      return {
        formData: {
          displayname: '',
          username: '',
          password: '',
          cpassword: '',
        },
      };
    },
    methods: {
      async register() {
        try {
          const response = await this.$axios.post('/api/register', this.formData);
          // Handle successful registration response
          if(response){
            this.$q.notify(response.data.message)
            this.$router.push('/login')
          }
          console.log(response.data); // You can customize the handling of the response
        } catch (error) {
          // Handle error
          console.error(error);
        }
      },
    },
  };
  </script>
  