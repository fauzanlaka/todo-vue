<template>
  <div id="app" class="container">

    <img src="./assets/logo.png" class="logo">

    <todo-list></todo-list>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->


  </div>
</template>

<script>
  import TodoList from "./components/TodoList";

  export default {
      components:{
        TodoList,
      }
  }
</script>

<style>

  *{
    box-sizing: border-box;
  }

  .container{
    max-width: 600px;
    margin: 0 auto;
  }

  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 17px;
  } */

  .logo{
    display: block;
    margin: 20px auto;
    height: 75px;
  }

/* 
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
