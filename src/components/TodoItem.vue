<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed : completed }">{{title}}</div>
            <input type="text"  class="todo-item-edit" 
                v-else 
                v-model="title" 
                v-focus
                @blur="doneEdit" 
                @keyup.enter="doneEdit" 
                @keyup.esc="cancelEdit"
            >
        </div>
        
        <div>
            <button @click="pluralize">plural</button>
            <span class="remove-item" @click="removeTodo(todo.id)">
                &times;
            </span>
        </div>
        
    </div>
</template>

<script>
    import {eventBus} from '../main'

    export default {
        name: 'todo-item',
        props: {
            todo: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
            checkAll:{
                type: Boolean,
                required: true,
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
        watch:{
            checkAll() {
                // if(this.checkAll){
                //     this.completed = true;
                // }else{
                //     this.completed = this.todo.completed;
                // }
                this.completed = this.checkAll ? true : this.todo.completed;
            }
        },
        data(){
            return{
                'id': this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'editing': this.todo.editing,
                'beforeEditCache': '',
            }
        },
        created(){
            eventBus.$on('pluralize', this.handlePluralize)
        },
        beforeDestroy(){
            eventBus.$off('pluralize', this.handlePluralize) 
        },
        methods:{
            removeTodo(id){
                //eventBus.$emit('removeTodo', index)
                //const index = this.$store.state.todos.findIndex(item => item.id == id);
                //this.$store.state.todos.splice(id, 1)
                //console.log(index)
                this.$store.dispatch('deleteTodo', id)
            },
            editTodo(){
                this.beforeEditCache = this.title;
                this.editing = true;
            },
            doneEdit(){ 
                if(this.title.trim() == ''){
                    this.title = this.beforeEditCache;
                }
                this.editing = false;

                this.$store.dispatch('updateTodo', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,    
                })

                // const index = this.$store.state.todos.findIndex(item => item.id == this.id)
                // this.$store.state.todos.splice(index ,1 ,{
                //     'id': this.id,
                //     'title': this.title,
                //     'completed': this.completed,
                //     'editing': this.editing,
                // })
            },
            cancelEdit(){
                this.title = this.beforeEditCache;
                this.editing = false;
            },
            pluralize() {
                eventBus.$emit('pluralize');
            },
            handlePluralize(){
                this.title = this.title + 's';
                const index = this.$store.state.todos.findIndex(item => item.id == this.id)
                this.$store.state.todos.splice(index ,1 ,{
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                })
            }
        }
    }
</script>