<template>
    <div>
        <div class="name-container">
            Welcome : {{name}}
        </div>
        <input type="text" v-model="newTodo" class="todo-input" placeholder="what need to be done" @keyup.enter="addTodo()" v-focus>
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <!-- <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining" @removeTodo="removeTodo" @finishedEdit="finishedEdit"></todo-item> -->
            <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining"></todo-item>
        </transition-group>

        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-item-remaining></todo-item-remaining>
        </div>

        <div class="extra-container">

            <todo-filtered></todo-filtered>                

            <div>
                <transition name="fade">
                    <todo-clear-completed :showClearCompleteButton="showClearCompleteButton"></todo-clear-completed>
                </transition>
            </div>

        </div>
        
    </div>
</template>

<script>
    import TodoItem from './TodoItem'
    import TodoItemRemaining from './TodoItemRemaining'
    import TodoCheckAll from './TodoCheckAll'
    import TodoFiltered from "./TodoFiltered";
    import TodoClearCompleted from './TodoClearCompleted'
    //import {eventBus} from '../main'

    export default {
        name: 'todo-list',
        components:{
            TodoItem,
            TodoItemRemaining,
            TodoCheckAll,
            TodoFiltered,
            TodoClearCompleted
        },
        mounted(){
            //this.anyRemaining
        },
        data(){
            return{
                newTodo: '',
                idForTodo: 3,
                beforeEditCache: '',
                name: 'Fauzan'
                //filter: 'all',
                // todos: [
                //     {
                //         'id': 1,
                //         'title': 'Finish vue screencast',
                //         'completed': false,
                //         'editing': false,
                //     },
                //     {
                //         'id': 2,
                //         'title': 'Take over world',
                //         'completed': false,
                //         'editing': false,
                //     }
                // ],
            }
        },
        directives: {
            focus: {
                // directive definition
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        created(){
            this.$store.dispatch('retrieveTodos')
            this.$store.dispatch('retrieveName')
                .then(response => {
                    this.name = response.data.name
                })
            //console.log(localStorage.getItem('access_token'))
        },
        // created(){
        //     eventBus.$on('removeTodo', (index) => this.removeTodo(index))
        //     eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
        //     eventBus.$on('checkAllTodos', (checked) => this.checkAllTodos(checked))
        //     eventBus.$on('filterChanged', (filter) => this.filter = filter)
        //     eventBus.$on('clearCompletedTodos', () => this.clearComplete())
        // },
        // beforeDestroy(){
        //     eventBus.$off('removeTodo', (index) => this.removeTodo(index))
        //     eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
        //     eventBus.$off('checkAllTodos', (checked) => this.checkAllTodos(checked))
        //     eventBus.$off('filterChanged', (filter) => this.filter = filter)
        //     eventBus.$off ('clearCompletedTodos', () => this.clearComplete())
        // },
        computed:{
            // remaining() {
            //     return this.$store.getters.remaining
            // },
            anyRemaining() {
                return this.$store.getters.anyRemaining
            },
            todosFiltered() {
                return this.$store.getters.todosFiltered
            },
            showClearCompleteButton() {
                return this.$store.getters.showClearCompleteButton
            },
        },
        methods:{
            addTodo(){
                if(this.newTodo.trim().length == 0){
                    return
                }

                this.$store.dispatch('addTodo', {
                    id: this.idForTodo,
                    title: this.newTodo
                })

                this.newTodo = '';
                this.idForTodo++;
                
            },
            // editTodo(todo){
            //     this.beforeEditCache = todo.title;
            //     todo.editing = true;
            // },
            // doneEdit(todo){
            //     if(todo.title.trim() == ''){
            //         todo.title = this.beforeEditCache;
            //     }
            //     todo.editing = false;
            // },
            // cancelEdit(todo){
            //     todo.title = this.beforeEditCache;
            //     todo.editing = false;
            // },
            // removeTodo(index){
            //     this.$store.state.todos.splice(index);
            // },
            // checkAllTodos(checked){
            //     this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
            // },
            // clearComplete(){
            //     this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
            // },
            // finishedEdit(data){
            //     //const index = this.$store.state.todos.findIndex(item => item.id == data.id);
            //     this.$store.state.todos.splice(data.index, 1, data.todo);
            // }
        }


    }
</script>

<style lang="scss">

    

    .todo-input{
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }  

    // &:focus{
    //     outline: 0;
    // }

    .todo-item{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item{
        cursor: pointer;
        margin-left: 14px;
        &:hover{
            color: red;
        }
    }

    .todo-item-left{
        display: flex;
        align-items: center;
    }

    .todo-item-label{
        //padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit{
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc; //overide default
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus{
            outline: none;
        }
    }

    .completed{
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;

        &:hover {
        background: lightgreen;
        }

        &:focus {
        outline: none;
        }
    }

    .active {
        background: lightgreen;
    }

    // CSS Transitions
    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .name-container{
        margin-bottom: 16px;
    }

    
</style>