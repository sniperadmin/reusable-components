### This component generates a filter query:
This query param(s) will be used latewr if you would like to
inject them into your ajax request

```vue
<template>
  <b-container>
    <AtlasInput v-model="type" select :select-options="opts" label="choose a filter" />
    <AtlasFilter v-bind="returnType" @filter-submit="yourevent" />
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      opts: ['is-staff-schedule', 'is-note-category'],
      type: ''
    }
  },
  computed: {
    returnType() {
      if (this.type.length) {
          return {
            [`${this.type}`]: ''
          }
        }
    }
  },
  methods: {
    yourevent(s) {
      alert(s)
    }
  }
}
</script>
```
---
