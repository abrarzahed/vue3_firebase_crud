<template>
  <div class="todo">
    <div class="title has-text-centered">Vue Todo</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model.trim="newTodoContent"
            class="input"
            type="text"
            placeholder="add a todo"
          />
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="todo in todos" :key="todo.id">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              <span> {{ todo.content }} </span>
            </div>
            <div class="column is-5 has-text-right">
              <button class="button is-light">&check;</button>
              <button
                class="button is-danger ml-2"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* 
   import
*/
import { ref } from "@vue/reactivity";
import { v4 as uuidv4 } from "uuid";

// todos

const newTodoContent = ref("");

const todos = ref([
  {
    id: 1,
    content: "Shopping for kids",
    done: false,
  },
  {
    id: 2,
    content: "Collect the necessary books",
    done: true,
  },
  {
    id: 3,
    content: "Code for office",
    done: false,
  },
]);

/* 
   add todo 
*/
const addTodo = function () {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false,
  };
  todos.value.unshift(newTodo);
  newTodoContent.value = "";
};

/* 
   Delete todo
*/
const deleteTodo = (id) => {
  let index;
  todos.value.forEach((item) => {
    if (item.value === id) index = todos.indexOf(id);
  });
  todos.value.splice(index, 1);
};
</script>

<style>
@import "bulma\css\bulma.min.css";

.todo {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
}
</style>
