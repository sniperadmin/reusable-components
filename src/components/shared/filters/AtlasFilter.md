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
      opts: ['is-contacts', 'is-staff-schedule', 'is-note-category'],
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
