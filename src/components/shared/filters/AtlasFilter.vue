<template>
  <b-container>
    <!-- staff schedule -->
    <b-row v-if="isStaffSchedule">
      <AtlasInput
        select
        label="District"
        v-model="staffSchedule.district"
        value-field="value"
        text-field="text"
        :select-options="districts"
      />
      <AtlasInput
        select
        label="Site"
        v-model="staffSchedule.site"
        value-field="value"
        text-field="text"
        :select-options="sites"
      />
      <AtlasInput
        select
        label="Staff"
        v-model="staffSchedule.staff"
        value-field="value"
        text-field="text"
        :select-options="staffs"
      />
    </b-row>

    <!-- Note category options -->
    <b-row v-if="isNoteCategory">
      <AtlasInput
        select
        label="Category"
        v-model="noteCategory.category"
        value-field="value"
        text-field="text"
        :select-options="categories"
      />
      <AtlasInput
        select
        label="Sub Category"
        v-model="noteCategory.subCategory"
        value-field="value"
        text-field="text"
        :select-options="subCategories"
      />
      <AtlasInput
        select
        label="Active"
        v-model="noteCategory.active"
        value-field="value"
        text-field="text"
        :select-options="statuses"
      />
      <AtlasInput
        select
        label="Descriptor"
        v-model="noteCategory.descriptor"
        value-field="value"
        text-field="text"
        :select-options="descriptors"
      />
      <AtlasInput
        select
        label="Action"
        v-model="noteCategory.action"
        value-field="value"
        text-field="text"
        :select-options="actions"
      />
    </b-row>

    <!-- Contacts filter -->
    <b-row v-if="isContacts">
      <AtlasInput v-model="contacts.firstName" text label="First Name" />
      <AtlasInput v-model="contacts.lastName" text label="Last Name" />
      <AtlasInput v-model="contacts.academyId" text label="Academy Id" />
      <AtlasInput
        v-model="contacts.phase"
        label="Phase"
        placeholder="Choose Phase"
        :selectOptions="initialData.phases"
        valueField="id"
        textField="name"
        select
        @input="phaseChanged($event)"
      />
      <AtlasInput
        v-model="contacts.status"
        label="Status"
        placeholder="Choose Status"
        :selectOptions="statuses"
        valueField="id"
        textField="name"
        select
      />
      <AtlasInput
        select
        v-model="contacts.district"
        label="Choose a District"
        :selectOptions="initialData.districts"
        placeholder="Select a district"
        valueField="id"
        textField="name"
        @input="getSitesByDistrict"
      />
      <AtlasInput
        v-model="contacts.site"
        label="Site"
        placeholder="Choose a Site"
        :select-options="sites"
        valueField="id"
        textField="name"
        select
      />
      <AtlasInput v-model="contacts.districtId" text label="District Id" />
      <AtlasInput
        v-model="contacts.createdFrom"
        text
        label="Created Date(From)"
      />
      <AtlasInput v-model="contacts.createdTo" text label="Created Date(To)" />
      <AtlasInput
        select
        label="Outreach Resource Advocate"
        v-model="contacts.outReach"
        :selectOptions="initialData.advocates"
        valueField="id"
        textField="full_name"
        placeholder="Choose User"
      />
      <AtlasInput
        v-model="contacts.enrollmentCoach"
        select
        label="Enrollment Coach"
        :selectOptions="initialData.communityAdvocates"
        valueField="id"
        textField="full_name"
        placeholder="Choose User"
      />
      <!-- <AtlasInput
        v-model="contacts.source"
        select
        :select-options="sources"
        label="Source" 
      /> -->
    </b-row>

    <b-btn @click="generateFilter">filter</b-btn>
  </b-container>
</template>
/** * @requires ./AtlasInput.vue */
<script>
export default {
  name: 'AtlasFilter',
  props: {
    /**
     * Use Staff filtering
     */
    isStaffSchedule: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Note Filters
     */
    isNoteCategory: {
      type: Boolean,
      default: false,
    },
    /**
     * use contact filters
     */
    isContacts: {
      type: Boolean,
      default: false,
    },
    /**
     * intial Data
     */ initialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      /**
       * fake test data
       * TODO: remove them once connecting to API
       */
      districts: [
        { text: 'dist1', value: '1' },
        { text: 'dist2', value: '2' },
      ],
      sites: [],
      staffs: [
        { text: 'staff1', value: '1' },
        { text: 'staff2', value: '2' },
      ],
      categories: [
        { text: 'cat1', value: '1' },
        { text: 'cat2', value: '2' },
      ],
      subCategories: [
        { text: 'sub1', value: '1' },
        { text: 'sub2', value: '2' },
      ],
      descriptors: [
        { text: 'desc1', value: '1' },
        { text: 'desc2', value: '2' },
      ],
      actions: [
        { text: 'action1', value: '2' },
        { text: 'action2', value: '2' },
      ],
      phases: [
        { text: 'phase1', value: '1' },
        { text: 'phase2', value: '2' },
      ],
      statuses: [],
      outReachAdvocates: [
        { text: 'out1', value: '1' },
        { text: 'out2', value: '2' },
      ],
      enrollmentCoaches: [
        { text: 'coach1', value: '1' },
        { text: 'coach2', value: '2' },
      ],
      sources: [
        { text: 'source1', value: '1' },
        { text: 'source2', value: '2' },
      ],
      // forms
      /**
       * this {staffSchedule} is not handled yet
       */
      staffSchedule: {},
      noteCategory: {},
      contacts: {},
      // combine all filter strings on here
      allFilters: {
        category: 'filter[type]=category',
        action: 'filter[type]=action',
        descriptor: 'filter[type]=descriptor',
        subCategory: 'filter[sub-category]=',
        contact: 'filter[contact]=',
        firstName: 'filter[first-name]=',
        lastName: 'filter[last-name]=',
        academyId: 'filter[academy-id]=',
        districtId: 'filter[district-id]=',
        createdFrom: 'filter[created-from]=',
        createdTo: 'filter[created-to]=',
        badAdress: 'filter[bad-address]=',
        badPhone: 'filter[bad-phone]=',
        none: 'filter[none]=',
        phase: 'filter[phase]=',
        status: 'filter[status]=',
        district: 'filter[district]=',
        site: 'filter[site]=',
        /**
         * not ready in BE
         * TODO: add missing filter strings
         */
        outReach: '',
        enrollmentCoach: '',
        source: '',
        staff: '',
      },
    }
  },
  mounted() {
    this.resetData()
  },
  methods: {
    filtrationHelper(obj) {
      const chosenForm = { ...obj }
      const chosenFilters = []

      for (const item in chosenForm) {
        // check if the value is not null
        if (chosenForm[item]) {
          // get corresponding filter string
          if (this.allFilters[item].includes('type')) {
            chosenFilters.push(this.allFilters[item])
          } else {
            console.log(item, 'not type', chosenForm[item])
            chosenFilters.push(this.allFilters[item] + chosenForm[item])
          }
        }
      }

      const string = chosenFilters.join('&')
      /**
       * Triggers at clicking filter button
       * @property {string} string the resulted string after processing
       */
      this.$emit('filter-submit', '?' + string)
      this.resetData()
    },
    /**
     * called when clicking filter
     *
     */
    generateFilter() {
      /**
       * This approach gets selected filters by user and uses the corresponding string
       * Current version works on note category filter
       * first case applies when enabling isNoteCategory prop
       * @param {isNoteCategory} if the desired filter component shows note category
       * @returns {string}
       */
      if (this.isNoteCategory) {
        this.filtrationHelper(this.noteCategory)
      } else if (this.isContacts) {
        this.filtrationHelper(this.contacts)
      } else if (this.isStaffSchedule) {
        this.filtrationHelper(this.staffSchedule)
      }
    },
    resetData() {
      this.staffSchedule = {
        district: null,
        site: null,
        staff: null,
      }

      this.noteCategory = {
        category: null,
        subCategory: null,
        active: null,
        descriptor: null,
        action: null,
      }

      this.contacts = {
        firstName: null,
        lastName: null,
        academyId: null,
        phase: null,
        status: null,
        district: null,
        site: null,
        districtId: null,
        createdFrom: null,
        createdTo: null,
        outReach: null,
        enrollmentCoach: null,
        source: null,
        badAdress: null,
        badPhone: null,
        none: null,
      }
    },
  },
}
</script>
