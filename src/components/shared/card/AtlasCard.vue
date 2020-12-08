<template>
  <b-card>
    <h4 v-if="title" class="m-0 pt-0">
      <i class="mdi mdi-format-list-bulleted mr-1 text-primary" />
      {{ title }}
    </h4>
    <!--
      @slot global slot
    -->
    <slot />
  </b-card>
</template>

<script>
  export default {
    name: 'AtlasCard',
    props: {
      title: {
        type: String,
        default: null
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>