import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import AtlasTable from '~/components/shared/table/AtlasTable.vue'

let wrapper;

describe('Card component', () => {
  Vue.use(BootstrapVue)

  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = mount(AtlasTable, {
      localVue,
      propsData: {
        items: [],
        fields: []
      },
      slots: {},
      scopedSlots: {
        empty: '<div class="empty">There are no records to show</div>'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should load', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should load main table component', () => {
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
  })

  it('should display no items', () => {
    const emptydiv = wrapper.find('.empty')
    expect(emptydiv.text()).toBe('There are no records to show')
  })

  it('should load busy state', async () => {
    await wrapper.setProps({
      isBusy: true
    })

    const spinner = await wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
  })

  it('should load pagination', () => {
    const pagination = wrapper.find('.pagination')

    expect(pagination.exists()).toBe(true)
  })

  it('should load per page and pagination', () => {
    const perpage = wrapper.find('select')
    const perpageOptions = perpage.findAll('option')
    const label = wrapper.find('label')

    expect(perpage.exists()).toBe(true)
    expect(label.exists()).toBe(true)
    expect(label.text()).toEqual('show')
    expect(perpageOptions.length).toEqual(3)
  })

  it('should sort a list of options', () => {
    wrapper.setProps({
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'age', label: 'Age', sortable: true },
        { key: 'active', label: 'Active', sortable: false },
      ]
    })
    expect(wrapper.vm.sortOptions).toEqual([
      { text: 'Name', value: 'name' },
      { text: 'Age', value: 'age' }
    ])
  })

  it('should test onFiltered method', async () => {
    const mockedFilterEvent = jest.spyOn(wrapper.vm, 'onFiltered')

    wrapper.vm.onFiltered([{ text: 'Name', value: 'name' }])
    expect(mockedFilterEvent).toHaveBeenCalledWith([{ text: 'Name', value: 'name' }])
  })

  it('should test emitted events for row selection', () => {
    wrapper.vm.onRowSelected({ text: 'Name', value: 'name' })
    expect(wrapper.emitted()['selected-rows']).toHaveLength(1)
    expect(wrapper.emitted()['selected-rows'][0]).toEqual([{ text: 'Name', value: 'name' }])
  })

  it('should select all rows', () => {
    wrapper.setProps({
      items: [
        { name: 'jest', test: 'jest' },
        { name: 'mocha', test: 'mocha' },
        { name: 'chai', test: 'chai' },
        { name: 'jasmine', test: 'jasmine' },
        { name: 'cypress', test: 'cypress' }
      ],
    })

    const mockSelectAll = jest.spyOn(wrapper.vm.$refs.selectableTable, 'selectAllRows')

    wrapper.setData({
      selectedAll: 'accepted'
    })
    
    wrapper.vm.$nextTick(() => {
      expect(mockSelectAll).toHaveBeenCalled()
    })

    mockSelectAll.mockClear()
  })

  it('should clear all selected rows', () => {
    wrapper.setProps({
      items: [
        { name: 'jest', test: 'jest' },
        { name: 'mocha', test: 'mocha' },
        { name: 'chai', test: 'chai' },
        { name: 'jasmine', test: 'jasmine' },
        { name: 'cypress', test: 'cypress' }
      ],
    })
    const mockClearAll = jest.spyOn(wrapper.vm.$refs.selectableTable, 'clearSelected')

    wrapper.setData({
      selectedAll: 'not_accepted'
    })
    
    wrapper.vm.$nextTick(() => {
      expect(mockClearAll).toHaveBeenCalled()
    })

    mockClearAll.mockClear()
  })

})
