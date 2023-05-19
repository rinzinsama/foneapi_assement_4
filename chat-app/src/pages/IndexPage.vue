<template>
  <div class="row q-pa-sm">
    <div class="col-12 bg-grey-2 q-pa-md">
      <div v-for="message in messages" :key="message._id">
        <q-chat-message :name="message.name" :text="[message.message]" :stamp="hoursPast(new Date(message.timestamp))"
          :sent="message.isSent" />
      </div>

      <!-- <q-chat-message name="Jane" avatar="https://cdn.quasar.dev/img/avatar5.jpg" :text="['doing fine, how r you?']"
        stamp="4 minutes ago" text-color="white" bg-color="blue-2" /> -->

    </div>
    <div class="q-pa-xs col-12">
      <q-input v-model="text_message" dense filled>
        <template v-slot:after>
          <q-btn round dense flat color="primary" icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
// import io from 'socket.io-client';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      text_message: '',
      messages: []

    }
  },
  mounted() {

    if (!this.$q.localStorage.getItem('LOGIN_USER')) {
      this.$router.push('/login')

    }

    console.log(this.$q.localStorage.getItem('LOGIN_USER'))
    // console.log(this.hoursPast(new Date('2023-05-19T09:13:18')))

    this.getMessages()

    setInterval(() => { this.getMessages() }, 3000);

    // Establish WebSocket connection
    // this.socket = io('http://localhost:3000'); // Update the server URL with the correct port

    // Listen for chat messages
    // this.socket.on('chatMessage', (message) => {
    //   // Update the messages array with the new message
    //   message.isSent = this.$q.localStorge.gaetItem('LOGIN_USER')._id === message.sender;
    //   this.messages.push(message);
    // });
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post('/api/message', {
          message: this.text_message,
          sender: this.$q.localStorage.getItem('LOGIN_USER')._id,
          name: this.$q.localStorage.getItem('LOGIN_USER').displayname
        });
        // Handle successful login response
        if (response) {
          this.text_message = ''
          this.getMessages()
          // console.log("sent")
          // this.socket.emit('chatMessage', {
          //   message: this.text_message,
          //   sender: this.$q.localStorage.getItem('LOGIN_USER')._id,
          //   name: this.$q.localStorage.getItem('LOGIN_USER').displayname,
          // });
        }

        console.log(response.data); // You can customize the handling of the response
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
    hoursPast(givenDate) {

      const now = new Date();
      const timeDiff = now.getTime() - givenDate.getTime();
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (hours > 0) {
        return `${hours} hour(s) ago`;
      } else if (minutes > 0) {
        return `${minutes} minute(s) ago`;
      } else {
        return `${seconds} second(s) ago`;
      }
    },

    async getMessages() {
      try {
        const response = await axios.get('/api/message');
        // Handle successful login response
        if (response) {
          response.data.map(x => {
            x.isSent = this.$q.localStorage.getItem('LOGIN_USER')._id == x.sender ? true : false
          })
          this.messages = response.data
        }

        // console.log(response.data); // You can customize the handling of the response
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
  }
})
</script>
