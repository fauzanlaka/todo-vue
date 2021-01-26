<template>
    <div>
        <button :class="{ active: filter == 'all' }" @click="changFilter('all')">All</button>
        <button :class="{ active: filter == 'active' }" @click="changFilter('active')">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="changFilter('completed')">Completed</button>
    </div>
</template>

<script>
//import { eventBus } from "../main";
export default {
    name: 'todo-filtered',
    computed:{
        filter(){
            return this.$store.state.filter
        }
    },
    methods:{
        changFilter(filter){
            // this.filter = filter
            // eventBus.$emit('filterChanged', this.filter)
            //this.$store.state.filter = filter;
            this.$store.dispatch('updateFilter', filter)
        }    
    }
}
</script>