<template>
  <ul class="navbar-ul">
    <li>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    </li>    
    <li>
      <RouterLink :to="{ name: 'directors' }">Directors</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'movies' }">Movies</RouterLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>

<style lang="scss" scoped>
.navbar-ul {
    display: flex;
    height: 50px;
    margin-bottom: 20px;
    gap: 15px;

    li {
        list-style: none;
        a.router-link-active {
            color: gold;
        }
    }
}
</style>
