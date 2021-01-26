<template>
    
    <button v-if="showClearCompleteButton" @click="clearComplete()">Clear complete</button>
        
</template>

<script>
//import { eventBus } from "../main";
export default {
    name: 'todo-clear-completed',
    props:{
        showClearCompleteButton:{
            type: Boolean,
            required: true,
        }
    },
    methods:{
        clearComplete(){
            //eventBus.$emit('clearCompletedTodos')
            this.$store.dispatch('clearCompleted')
        }
    }
}
</script>