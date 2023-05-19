<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-yellow-7 text-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
       
        <q-toolbar-title>

          <q-btn class="float-right" flat label="logout" @click="logout"></q-btn>
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Contacts <q-btn flat class="float-right" size="sm" icon="person_add" @click="addContact = true" />
        </q-item-label>

        <q-separator />

        <EssentialLink v-for="contact in ContactList" :key="contact.name" v-bind="contact" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog v-model="addContact">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Contacts</div>

      </q-card-section>
      <q-card-section>
        <q-form class=" ">
          <q-input filled dense v-model="formData.name" class="q-pa-sm" label="name" lazy-rules />
          <q-input filled dense v-model="formData.email" class="q-pa-sm" label="email" lazy-rules />


          <q-btn label="Save Contact" size="sm" @click="saveContact" color="primary" />

        </q-form>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

// const ContactList = [
//   {
//     title: 'Rica Babe',
//     avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
//     caption: 'Online',
//     link: '/?id=2'
//   },

//   {
//     title: 'Hanna Mae',
//     avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
//     caption: 'Offline',
//     link: '/?id=3'
//   },

// ]

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      addContact: false,
      formData: {
        name: '',
        email: ''
      },
      ContactList: [],
    };
  },

  components: {
    EssentialLink
  },
  mounted() {
    this.getContacts()
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    async saveContact() {
      try {
        const response = await this.$axios.post('/api/contact', this.formData);
        // Handle successful registration response
        if (response) {
          this.$q.notify(response.data.message)
          this.addContact = false
          this.getContacts()
        }
        console.log(response.data); // You can customize the handling of the response
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
    async getContacts() {
      try {
        const response = await this.$axios.get('/api/contact', this.formData);
        // Handle successful registration response

        console.log(response.data, "contacts"); // You can customize the handling of the response
        this.ContactList = response.data
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
    logout() {
      this.$q.localStorage.remove('LOGIN_USER')
      this.$router.push('/login')
    }
  }
})
</script>
