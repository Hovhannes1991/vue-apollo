<template>
  <div class="directors-page">
    <h1>Directors</h1>
    <label
      >Search Director
      <input type="text" v-model="search" />
    </label>
    <ul>
      <li v-for="director in directors" :key="director.id">
        <span>{{ "name: " + director.name }}</span>
        <span>{{ "age: " + director.age }}</span>
      </li>
    </ul>
    <input type="text" v-model="director_name" />
    <input type="number" v-model="director_age" />
    <button @click="addDirector">Add Director</button>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "DirectorsPage",

  data() {
    return {
      search: "",
      directors: [],
      director_name: "",
      director_age: 0,
    };
  },

  apollo: {
    directors: {
      query: gql`
        query ($name: String!) {
          directors(name: $name) {
            id
            age
            name
          }
        }
      `,
      // Reactive variables
      variables() {
        return {
          name: this.search,
        };
      },
    },
  },

  methods: {
    addDirector() {
      if (!this.director_name || !this.director_age) return;
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation ($name: String!, $age: Int!) {
              addDirector(name: $name, age: $age) {
                name
                age
              }
            }
          `,
          // Parameters
          variables: {
            name: this.director_name,
            age: this.director_age,
          },
        })
        .then((data) => {
          this.director_name = "";
          this.director_age = 0;
          this.$apollo.queries.directors.refetch();
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.directors-page {
  ul {
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;

    li {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
