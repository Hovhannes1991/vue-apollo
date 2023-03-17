<template>
  <div class="movies-page">
    <h1>Movies</h1>
    <v-text-field label="Search Director" v-model="search" />

    <div class="add-director-fields">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="movie_name" />
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn @click="addMovie" variant="flat" color="secondary">
            Add Movie
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <BaseTable
      :col-names="['name', 'director name']"
      :table-data="movies"
      :field-names="['name', 'director.name']"
    />
  </div>
</template>

<script>
import gql from "graphql-tag";
import BaseTable from "../../components/BaseTable.vue";
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
  components: { BaseTable },
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
