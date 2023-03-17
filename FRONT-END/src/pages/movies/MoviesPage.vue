<template>
  <div class="movies-page">
    <label
      >Search Movie
      <input type="text" v-model="search" />
    </label>

    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <span>{{ "name: " + movie.name }}</span>
        <span>{{ "director: " + movie.director.name }}</span>
      </li>
    </ul>
    <input type="text" v-model="movie_name" />
    <button @click="addMovie">Add Movie</button>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "MoviesPage",

  data() {
    return {
      search: "",
      movies: [],
      movie_name: "",
    };
  },

  methods: {
    addMovie() {
      if (!this.movie_name) return;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation (
              $name: String!
              $genre: String!
              $directorId: ID!
              $watched: Boolean!
              $rate: Int!
            ) {
              addMovie(
                name: $name
                genre: $genre
                directorId: $directorId
                watched: $watched
                rate: $rate
              ) {
                director {
                  name
                }
                name
                genre
                watched
                rate
              }
            }
          `,
          variables: {
            directorId: "64141dac1303560bf494ff2f",
            name: this.movie_name,
            genre: "Horror",
            watched: false,
            rate: 5,
          },
        })
        .then(() => this.$apollo.queries.movies.refetch())
        .catch((err) => console.log(err));
    },
  },

  apollo: {
    movies: {
      query: gql`
        query ($name: String!) {
          movies(name: $name) {
            name
            director {
              name
            }
          }
        }
      `,
      variables() {
        return { name: this.search };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.movies-page {
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
