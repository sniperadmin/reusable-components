### Simple form Validation

```vue
<template>
  <AtlasValidationForm @form-submit="onSubmit">
    <AtlasInput v-model="name" :rules="{required: true, min: 5}" text label="Name" />
    <AtlasInput v-model="selected" :select-options="['1', '2']" :rules="{required: true}" select label="select" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      selected: null,
      date: null
    }
  },
  methods: {
    onSubmit() {
      alert("Form submitted!")
    },
  }
}
</script>
```
### Bug Noticed (help needed!) location => `AtlasInput`

For the `datepicker`, validation has some bugs:
```vue
<template>
  <AtlasInput v-model="date" :rules="{required: true}" datepicker label="select date" />
</template>
<script>
export default {
  data () {
    return {
      date: null,
    }
  }
}
</script>
```
