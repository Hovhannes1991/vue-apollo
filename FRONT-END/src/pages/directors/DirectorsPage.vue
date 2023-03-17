<template>
  <div class="directors-page">
    <h1>Directors</h1>
    <v-text-field label="Search Director" v-model="search" />

    <div class="add-director-fields">
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field v-model="director_name" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field v-model="director_age" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-btn @click="addDirector" variant="flat" color="secondary">
            Add Director
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <BaseTable :col-names="['name', 'age']" :table-data="directors" :field-names="['name', 'age']"/>
  </div>
</template>

<script>
import gql from "graphql-tag";
import BaseTable from "../../components/BaseTable.vue";
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
            age: +this.director_age,
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
  components: { BaseTable },
};
</script>

<style lang="scss" scoped>
.directors-page {
  h1 {
    margin-bottom: 20px;
  }

  .add-director-fields {
    margin: 25px auto;
  }
}
</style>
