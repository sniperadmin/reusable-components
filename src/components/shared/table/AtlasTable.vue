<template>
  <b-card>
    <h4 v-if="title" class="m-0 pt-0">
      <i class="mdi mdi-format-list-bulleted mr-1 text-primary" />
      {{ title }}
    </h4>

    <!-- table -->
    <b-row>
      <!-- Select all -->
      <b-form-checkbox
        v-if="selectable === true"
        id="checkbox-1"
        v-model="selectedAll"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        Select All
      </b-form-checkbox>

      <!-- perpage -->
      <b-col sm="5" md="4" class="my-1">
        <b-form-group
          label="show"
          label-cols-sm="8"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-md="right"
          label-size="md"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
          />entries
        </b-form-group>
      </b-col>

      <!-- enable search -->
      <b-col v-if="enableSearch" lg="6" class="my-1">
        <b-form-group
          label="Search"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <!--
          Main table element
          @event row-clicked
          @property item
          -->
      <b-table
        ref="selectableTable"
        show-empty
        sort-icon-left
        small
        :responsive="false"
        custom-prop="any"
        stacked="md"
        v-bind="$attrs"
        :items="items"
        :busy="isBusy"
        :fields="fields"
        :select-mode="selectMode"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :selectable="selectable"
        :hover="hoverable"
        v-on="$listeners"
        @filtered="onFiltered"
        @row-clicked="$emit('row-clicked', $event)"
        @row-selected="onRowSelected"
      >
        <!-- <slot v-for="dataTableSlot in $scopedSlots" :slot="dataTableSlot" :name="dataTableSlot" /> -->
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>

        <template
          v-for="dataTableSlot in Object.keys($scopedSlots)"
          v-slot:[dataTableSlot]="slotScope"
        >
          <!-- 
              @slot dataTableSlot to enable using custom templates
            -->
          <slot :name="dataTableSlot" v-bind="slotScope" />
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>

        <!-- Selection mechanics -->
        <template v-slot:cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&#x2611;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&#x2610;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>

        <template v-slot:cell(actions)="row">
          <!--
              view
              @event view-entry
              @property item
            -->
          <b-button
            v-if="viewBtn"
            v-b-popover.hover.left="'view'"
            variant="outline-primary"
            size="sm"
            @click="$emit('view-entry', row.item)"
          >
            <i class="fas fa-eye fa-sm" />
          </b-button>

          <!--
              edit
              @event edit-entry
              @property item
            -->
          <b-button
            v-if="editBtn"
            v-b-popover.hover.left="'edit'"
            variant="outline-primary"
            size="sm"
            @click="$emit('edit-entry', row.item)"
          >
            <i class="fas fa-edit fa-sm" />
          </b-button>
          <!-- ./edit -->

          <!--
              activate
              @event activate-entry
              @property item
            -->
          <b-button
            v-if="row.item.active === 0"
            v-b-popover.hover.left="'activate'"
            variant="outline-primary"
            size="sm"
            @click="$emit('activate-entry', row.item)"
          >
            <i class="fas fa-lock-open fa-sm" />
          </b-button>
          <!-- ./activate -->

          <!--
              deactivate
              @event deactivate-entry
              @property item
            -->
          <b-button
            v-if="row.item.active === 1"
            v-b-popover.hover.top="'deactivate (under construction!)'"
            variant="outline-primary"
            size="sm"
            @click="$emit('deactivate-entry', row.item)"
          >
            <i class="fas fa-lock fa-sm" />
          </b-button>
          <!-- ./deactivate -->

          <!--
              download
              @event download-entry
              @property item
            -->
          <b-button
            v-if="downloadBtn"
            v-b-popover.hover.top="'download'"
            variant="outline-primary"
            size="sm"
            @click="$emit('download-entry', row.item)"
          >
            <i class="fas fa-download fa-sm" />
          </b-button>

          <!--
              export
              @event export-entry
              @property item
            -->
          <b-button
            v-if="exportBtn"
            v-b-popover.hover.top="'export'"
            variant="outline-primary"
            size="sm"
            @click="$emit('export-entry', row.item)"
          >
            <i class="fas fa-file-export fa-sm" />
          </b-button>

          <!-- customBtn -->
          <b-button
            v-if="customActionBtnTitle"
            v-b-popover.hover.top="`${customActionBtnTitle}`"
            variant="outline-primary"
            size="sm"
          >
            {{ customActionBtnTitle }}
          </b-button>

          <!--
              delete entry
              @event delete-entry
              @property {object} item
            -->
          <b-button
            v-if="disableDeleteBtn == false"
            v-b-popover.hover.right="'delete!'"
            variant="outline-danger"
            size="sm"
            @click="$emit('delete-entry', row.item)"
          >
            <i class="fas fa-trash fa-sm" />
          </b-button>
        </template>
      </b-table>
    </b-row>

    <!-- Table Footer -->
    <b-row>
      <b-col lg="6" class="my-1">
        <!-- Notify user -->
        Showing {{ perPage > items.length ? items.length : perPage }} to
        {{ items.length }} of {{ items.length }} entries (filtered from
        {{ items.length }} total entries)
      </b-col>

      <b-col lg="6" class="my-1">
        <!-- pagination -->
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="perPage"
          pills
          align="right"
          class="my-3 heavy-rain-gradient"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'AtlasTable',
  props: {
    /**
     * card title for the table
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * enables/disables loading state
     */
    isBusy: {
      type: Boolean,
      default: false,
    },
    /**
     * items to be shown in table
     */
    items: {
      type: Array,
      default: null,
    },
    /**
     * custom table headers object
     * accepts { key, label }
     */
    fields: {
      type: Array,
      default: null,
    },
    /**
     * enables row clicking events
     */
    clickableRow: {
      type: Boolean,
      default: false,
    },
    /**
     * enables search
     */
    enableSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * enables mouse hover effects
     */
    hoverable: {
      type: Boolean,
      default: false,
    },
    /**
     * activate edit student plan button
     * this is for plans only
     * (plans only!)
     */
    activeEditBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * activate view action button
     */
    viewBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * activate edit action button
     */
    editBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * activate download action button
     */
    downloadBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * disables delete action button
     */
    disableDeleteBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * enables user Activation action button
     * (users only!)
     */
    activateBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * enables user deactivation action button
     * (users only!)
     */
    deactivateBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * enables export action button
     */
    exportBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * title for a custom action button
     */
    customActionBtnTitle: {
      type: String,
      default: '',
    },
    /**
     * enables row selection
     */
    selectable: {
      type: Boolean,
      default: false,
    },
    /**
     * chooses between multi/single/range
     * @default multi
     */
    selectMode: {
      type: String,
      default: 'multi',
    },
    /**
     * Accepts a field name to sort by
     */
    sortBy: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      selectedRows: [],
      selectedAll: '',
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
  },
  watch: {
    selectedAll(val) {
      val === 'accepted'
        ? this.$refs.selectableTable.selectAllRows()
        : this.$refs.selectableTable.clearSelected()
    },
  },
  mounted() {
    // Set the initial number of items
    // if (this.items.length) {
    this.totalRows = this.items.length
    // }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onRowSelected(item) {
      this.selectedRows = item
      /**
       * triggers at selecting a row if selected option is true
       * @property {object} selectedRows an internal array that saves selections
       */
      this.$emit('selected-rows', this.selectedRows)
    },
  },
}
</script>

<style scoped>
#perPageSelect {
  width: 70px;
}
</style>
