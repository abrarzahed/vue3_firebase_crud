<template>
  <div class="todo">
    <div class="title has-text-centered">Vue3 Todo</div>
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
    <h1 v-if="loading">loading</h1>

    <div
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              <span :class="{ 'has-text-success line-through': todo.done }">
                {{ todo.content }}
              </span>
              <br />
              <span>{{ todo.date }}</span>
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)"
              >
                &check;
              </button>
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
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

/*
   Firebase refs
*/
const todosCollectionRefs = collection(db, "todos");
const todosCollectionsQuery = query(
  todosCollectionRefs,
  orderBy("date", "desc")
);

/*
   Todos & todo
*/
const newTodoContent = ref("");
const todos = ref([]);

/*
   Loading
*/
let loading = ref(true);

/*
  get todos from firebase
*/
onMounted(() => {
  onSnapshot(todosCollectionsQuery, (querySnapshot) => {
    const fbTodos = [];
    if (querySnapshot) {
      loading.value = false;
    }
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        date: new Date(doc.data().date).toLocaleString(),
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

/*
   add todo
*/
const addTodo = function () {
  addDoc(todosCollectionRefs, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = "";
};

/*
   Delete todo
*/
const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRefs, id));
};

/*
   Edit todo
*/
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollectionRefs, id), {
    content: todos.value[index].content,
    done: !todos.value[index].done,
    date: todos.value[index].date,
  });
};
</script>

<style>
@import "bulma\css\bulma.min.css";
body {
  background: #eee;
  min-height: 100vh;
  display: grid;
  place-items: center;
}
.todo {
  width: 600px;
  padding: 40px;
  background: #fff;
  margin: 50px auto;
  border-radius: 8px;
}
.line-through {
  text-decoration: line-through;
}
</style>
