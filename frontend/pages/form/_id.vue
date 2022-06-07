<template>
  <v-form
    ref="form"
    v-model="todo"
    valid
    lazy-validation
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="title"
      :counter="50"
      label="Title"
      required
    />

    <v-text-field
      v-model="description"
      label="Description"
      required
    />
    <v-checkbox
      v-model="completed"
      label="Completed"
      default-value="false"
      required
    />

    <v-btn
      color="success"
      class="mr-4"
      type="submit"
    >
      {{ type === 'edit' ? "Edit" : "Create" }}
    </v-btn>
  <v-snackbar
  v-model="snackbar">
  {{ text }}

  <template v-slot:action="{ attrs }">
    <v-btn
      color="pink"
      text
      v-bind="attrs"
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </template>
</v-snackbar>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'formPage',
  data () {
    return {
      title: '',
      description: '',
      completed: false,
      type: 'create',
      snackbar: false,
      text: ''
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      this.type = 'edit'
    }
    if (this.type === 'edit') {
      try {
        const response = await axios.get(`http://localhost:5000/todos/${this.$route.params.id}`)
        const data = response.data
        this.title = data.data.title
        this.description = data.data.description
        this.completed = data.data.completed
      } catch (error) {
        console.log('error: ', error)
      }
    }
  },
  methods: {
    async submit () {
      try {
        if (this.type === 'edit') {
          await axios.put('http://localhost:5000/todos/' + this.$route.params.id, { title: this.title, description: this.description, completed: this.completed })
          this.text = 'Succesfully updated Todo.'
          this.snackbar = true
        } else {
          await axios.post('http://localhost:5000/todos/', { title: this.title, description: this.description, completed: this.completed })
          this.text = 'Succesfully created Todo. Redirecting back to list...'
          this.snackbar = true
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        };
      } catch (error) {
        this.text = 'There was an error while ' + this.type + 'ing todo'
        this.snackbar = true
        console.log('error: ', error)
      }
    }
  }
})
</script>
