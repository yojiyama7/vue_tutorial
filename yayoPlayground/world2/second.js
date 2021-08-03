var app = new Vue({
  el: "#app",
  data: {
    inputText: null,
    todos: []
  },
  mounted() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
        for (todo of this.todos) {
          todo.time = new Date(todo.time)
        }
      } catch(e) {
        localStorage.removeItem('todos');
      }
    }
  },
  computed: {
    // sortedTodos: function() {
    //   this.todos.sort(function(a, b) {
    //     return a.checked - b.checked
    //   })
    //   return this.todos
    // }
  },
  methods: {
    addTodo: function() {
      if (!this.inputText) {
        return
      }
      this.todos.push({
        text: this.inputText,
        time: new Date(),
        checked: false,
      })
      this.inputText = ""
      this.saveTodos()
    },
    removeTodo: function(i) {
      this.todos.splice(i, 1)
      this.saveTodos()
    },
    saveTodos: function() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', parsed);
    },
  },
})
