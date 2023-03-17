<template>
  <div class="base-table">
    <v-table theme="dark">
      <thead>
        <tr>
          <th v-for="col_name in colNames" class="text-left" :key="col_name">
            {{ col_name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in normalizedTableData" :key="item">
          <td v-for="label in fieldNames" class="text-left" :key="label">
            {{ item[label] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: ["colNames", "tableData", 'fieldNames'],

  computed: {
    normalizedTableData() {
      if (!this.tableData?.length) return [];
      let table_data = [...this.tableData];

      //get nested fields, seperated by '.' example: user.country.code
      let deep_fields = this.fieldNames.filter(col_name => col_name.includes('.'));    

      table_data.forEach((item, index) => {
        let item_copy = {...item}
        deep_fields.forEach(field_name => {
          //example: user.country.code => ['user', 'county', 'code']
          let fields = field_name.split('.');
          //example: item['user.country.code'] -> item.user
          item_copy[field_name] = item[fields[0]];
          for(let i = 1; i < fields.length; i++) {
            //example: item['user.country.code'] from item.user
            //to -> item.user.country -> item.user.country.code
            item_copy[field_name] = item_copy[field_name][fields[i]];
          }
        })
        table_data[index] = item_copy;
      });
      return table_data;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-table {
  min-width: 500px;

  tr {
    th {
      text-transform: capitalize;
    }
  }
}
</style>
