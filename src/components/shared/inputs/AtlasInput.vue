<template>
  <b-col :cols="cols" :sm="mobileCols" :md="tabletCols" :lg="pcCols">
    <validation-provider
      :name="label"
      :rules="rules"
      v-slot="validationContext"
      :vid="confirmation ? 'confirmation' : ''"
    >
      <b-form-group :label="label">
        <template #label>
          {{ label }}
          <span class="text-danger">
            {{ rules === 'required' ? '*' : '' }}
            {{ rules.required ? '*' : '' }}
          </span>
        </template>
        <!-- text -->
        <b-form-input
          v-if="text"
          :type="inputType"
          :value="value"
          :size="small ? 'sm' : large ? 'lg' : medium ? 'md' : ''"
          :placeholder="placeholder"
          :state="getValidationState(validationContext)"
          @input="$emit('input', $event)"
          trim
          aria-describedby="text"
        ></b-form-input>

        <!-- 
          date picker
        -->
        <b-input-group v-if="datepicker">
          <b-form-input
            id="date"
            :value="value"
            :state="getValidationState(validationContext)"
            placeholder="click button to choose"
            autocomplete="off"
          ></b-form-input>
          <b-input-group-append>
            <b-form-datepicker
              v-if="datepicker"
              :value="value"
              :date-disabled-fn="disableDates"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              :min="min"
              :max="max"
              aria-controls="date"
              button-only
              locale="en"
              @input="$emit('input', $event)"
              @context="onContext"
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>

        <!-- select -->
        <b-form-select
          v-if="select"
          :value="value"
          :options="selectOptions"
          :size="small ? 'sm' : large ? 'lg' : medium ? 'md' : ''"
          :state="getValidationState(validationContext)"
          :value-field="valueField"
          :text-field="textField"
          @input="$emit('input', $event)"
          aria-describedby="select"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              --select an option--
            </b-form-select-option>
            <slot name="select-options" />
          </template>
        </b-form-select>

        <!-- file -->
        <b-form-file
          v-if="file"
          :plain="plain"
          :value="value"
          @input="$emit('input', $event)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          :size="small ? 'sm' : large ? 'lg' : medium ? 'md' : ''"
          :state="getValidationState(validationContext)"
          aria-describedby="file"
        ></b-form-file>

        <b-form-textarea
          v-if="textarea"
          :placeholder="placeholder"
          :value="value"
          :size="small ? 'sm' : large ? 'lg' : medium ? 'md' : ''"
          :state="getValidationState(validationContext)"
          rows="3"
          max-rows="8"
          @input="$emit('input', $event)"
        ></b-form-textarea>

        <!-- <b-form-checkbox-group
          v-if="checkbox"
          id="exampleChecks"
          :value="value"
          :options="checkboxOptions"
          :value-field="valueField"
          :text-field="textField"
          :state="getValidationState(validationContext)"
          :size="small ? 'sm' : large ? 'lg' : medium ? 'md' : ''"
          @input="$emit('input', $event)"
        >
        </b-form-checkbox-group> -->

        <b-form-invalid-feedback>
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
  </b-col>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'AtlasInput',
  components: { ValidationProvider },
  props: {
    /**
     * adjusts grid width
     */
    cols: {
      type: [String, Number],
      default: 4,
    },
    /**
     * adds label
     */
    label: {
      type: String,
      value: 'label here',
    },
    /**
     * @ignore
     */
    value: {
      type: [String, Array, Object, File, Boolean],
      default: null,
    },
    /**
     * enables text input
     */
    text: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    /**
     * sets input type
     */
    inputType: {
      type: String,
      default: 'text',
    },
    mobileCols: {
      type: [String, Number],
      default: null,
    },
    tabletCols: {
      type: [String, Number],
      default: null,
    },
    pcCols: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * enables datepicker
     */
    datepicker: {
      type: Boolean,
      default: false,
    },
    /**
     * min allowed range starting date
     */
    min: {
      type: String,
      default: null,
    },
    /**
     * min allowed range ending date
     */
    max: {
      type: String,
      default: null,
    },
    /**
     * enables file input
     */
    file: {
      type: Boolean,
      default: false,
    },
    /**
     * enables plain mode for file input
     */
    plain: {
      type: Boolean,
      default: false,
    },
    /**
     * enables select input
     */
    select: {
      type: Boolean,
      default: false,
    },
    /**
     * let's select focus on the correct value in obj
     */
    valueField: {
      type: String,
      default: null,
    },
    /**
     * let's select focus on the correct text in obj
     * to be displayed
     */
    textField: {
      type: String,
      default: null,
    },
    /**
     * passes array of select options
     */
    selectOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * makes input small
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * makes input medium
     */
    medium: {
      type: Boolean,
      default: false,
    },
    /**
     * makes input large
     */
    large: {
      type: Boolean,
      default: false,
    },
    /**
     * specifies rules
     */
    rules: {
      type: [Object, String],
      default: '',
    },
    /**
     * @ignore
     */
    confirmation: {
      type: Boolean,
      default: false,
    },
    /**
     * @deprecated
     */
    checkbox: {
      type: Boolean,
      default: false,
    },
    /**
     * @deprecated
     */
    checkboxOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      test: this.value,
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    disableDates($event) {
      /**
       * Triggers to disable some random dates
       * @property {object} $event
       */
      this.$emit('disable-dates', $event)
    },
    onContext(ctx) {
      /**
       * Triggers with the formatted date accepted by our API
       * @property {string} date formatted date
       */
      this.$emit(
        'formatted-date',
        this.$moment(ctx.selectedYMD).format('MM-DD-YYYY')
      )
    },
  },
}
</script>

<style scoped></style>
