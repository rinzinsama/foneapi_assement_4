<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section v-if="avatar" avatar>
      <!-- <q-icon :name="icon" /> -->
      <q-avatar>
        <img :src="avatar">
      </q-avatar>
    </q-item-section>
    <q-item-section v-if="!avatar" avatar>
      <!-- <q-icon :name="icon" /> -->
      <q-avatar color="primary">
        {{ name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label class="text-grey-6" email>{{ email }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    avatar: {
      type: String,
      default: ''
    }
  }
})
</script>
