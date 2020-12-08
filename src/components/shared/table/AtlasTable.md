### Table Title
you can add a title for the table card:

```vue
<template>
  <AtlasTable title="title here" :items="[]" />
</template>
<script>
export default{}
</script>
```
Note: title will be auto styled

---

### Create data table 
You can simply create table by adding the tag:

```vue
<template>
  <AtlasTable :items="[]" :fields="[]" />
</template>
<script>
export default{}
</script>
```
---

### pass items in the table
you can pass items easily by adding some data:

```vue
<template>
  <b-container>
    <AtlasTable :items="items" />
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>
```
---
### Fields as a simple array
Fields can be a simple array, for defining the order of the columns, and which columns to display:

```vue
<template>
  <b-container>
    <AtlasTable hoverable :items="items" :fields="fields" />
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>
```
---
### Busy Mode (loading) For our SSR
To enable this feature, you can use `fetch()` instead of `asyncData()`:

```vue
<template>
  <b-container>
    <AtlasTable isBusy :items="[]" :fields="[]" />
  </b-container>
</template>
<script>
  export default {
    fetch () {
      // your logic here
    }
  }
</script>
```
---
### Custom templates
if you want to do specific iteration over data to display in a certain field, you can follow this example:

```vue
<template>
  <b-container>
    <AtlasTable :items="items" :fields="fields">
      <template v-slot:cell(fullName)="row">
        {{ row.value.first_name }} {{ row.value.last_name }}
      </template>

      <!-- customize index per each row -->
      <template v-slot:cell(index)="row">
        {{ row.index + 1 }}
      </template>
    </AtlasTable>
  </b-container>
</template>
<script>
  export default {
    data () {
      return {
        fields: [
          // add index field
          'index',
          {
            /** the specific key in item object */
            key: 'fullName',
            /** Your custom label */
            label: 'Full Name'
          }
        ],
         items: [
          { 
            age: 40,
            fullName: {
              first_name: 'Dickerson',
              last_name: 'Macdonald'
            }
          },
          { age: 21,
            fullName: {
              first_name: 'Larsen',
              last_name: 'Shaw'
            }
          },
          { age: 89,
            fullName: {
              first_name: 'Geneva',
              last_name: 'Wilson'
            }
          },
          { age: 38,
            fullName: {
              first_name: 'Jami',
              last_name: 'Carney'
            }
          }
        ]
      }
    }
  }
</script>
```
---

### Actions
This example shows hanling all the available actions
note: in the fields array, you must add `actions`
hint => icons are not rendering in the docs

```vue
<template>
  <b-containter>
    <AtlasTable
      :items="items"
      :fields="fields"
      edit-btn
      export-btn
      @delete-entry="handleDelete"
    />
  </b-containter>
</template>
<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age', 'actions'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
    methods: {
      handleDelete(item) {
        this.items.splice(this.items.indexOf(item), 1)
      }
    }
  }
</script>
```
---
