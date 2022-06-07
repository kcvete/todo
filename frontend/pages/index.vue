<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card
              color="#385F73"
              dark
            >
              <v-card-title class="text-h5">
                Todo list
              </v-card-title>
              <v-card-subtitle>Create, edit and check your todos</v-card-subtitle>
              <v-card-actions>
                <v-btn 
                  text
                  @click="$router.push('/form/')"
                >
                  Create a new todo
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="6"
          >
            <v-card
              :color="colors[Math.floor(i % colors.length)]"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="text-h5"
                    v-text="item.title"
                  />

                  <v-card-subtitle v-text="item.description" />

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-btn
                        v-if="item.completed"
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        left
                        width="40px"
                        @click="markCompleted(false, item)"
                      >
                        <v-icon>mdi-checkbox-marked</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        left
                        width="40px"
                        @click="markCompleted(true, item)"
                      >
                        <v-icon mdi-spin>
                          mdi-checkbox-blank-outline
                        </v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        left
                        width="40px"
                        @click="$router.push('/form/' + item.id)"
                      >
                        <v-icon>
                          mdi-pen
                        </v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        left
                        width="40px"
                        @click="removeItem(item, i)"
                      >
                        <v-icon>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
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
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'IndexPage',
  data: () => ({
    items: [],
    colors: ['#f47b00', '#ff0000', '#00ff00', '#ff00ff', '#00ffff'],
    snackbar: false,
    text: ''
  }),
  async fetch () {
    const items = await axios.get('http://localhost:5000/todos')
    this.items = items.data.data
  },
  methods: {
    async removeItem (item: any, index:number) {
      try {
        await axios.delete('http://localhost:5000/todos/' + item.id)
        this.items.splice(index, 1)
        this.text = 'Succesfully removed Todo'
        this.snackbar = true
      } catch (error) {
        this.text = 'There was an error while removing todo'
        this.snackbar = true
        console.log('error: ', error)
      }
    },
    async markCompleted (completed: boolean, item: any) {
      try {
        item.completed = completed
        await axios.put('http://localhost:5000/todos/' + item.id, item)
        this.text = 'Succesfully updated Todo'
        this.snackbar = true
      } catch (error) {
        this.text = 'There was an error while marking todo as complete'
        this.snackbar = true
        console.log('error: ', error)
      }
    }

  }
})
</script>
