<template>
    <!-- <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos()">check all</label></div> -->
    <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos()">check all</label></div>
</template>

<script>
//import { eventBus } from "../main";
export default {
    name: 'todo-check-all',
    computed:{
        anyRemaining(){
            return  this.$store.getters.anyRemaining
        }
    },
    methods:{
        checkAllTodos(){
            //eventBus.$emit('checkAllTodos', this.anyRemaining)
            //this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
            this.$store.dispatch('checkAll', event.target.checked)
        }
    }
}
</script>