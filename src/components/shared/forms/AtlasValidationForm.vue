<template>
  <b-container>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form ref="form" @submit.stop.prevent="handleSubmit(onSubmit)">
        <!--
          @slot accepts any content in the form
        -->
        <slot />
        <b-form-group class="mt-3">
          <b-button type="submit" variant="primary" :disabled="btnDisabled">
            {{ submitBtnName }}
          </b-button>
        </b-form-group>
      </b-form>
    </ValidationObserver>
  </b-container>
</template>

<script>
export default {
  name: 'AtlasValidationForm',
  props: {
    /**
     * sets submit button label
     */
    submitBtnName: {
      type: String,
      default: 'Submit',
    },
    btnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    onSubmit($event) {
      /**
       * Triggers when clicking submit
       * @property {any} $event
       */
      this.$emit('form-submit', $event)
      this.$refs.form.reset()
    },
  },
}
</script>
