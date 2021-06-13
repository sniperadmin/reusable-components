import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue';
import AtlasFilter from '~/components/shared/filters/AtlasFilter.vue'

let wrapper;

describe('Card component', () => {
  Vue.use(BootstrapVue)

  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(AtlasFilter, {
      localVue,
      propsData: {
        isStaffSchedule: true,
        initialData: {}
      },
      stubs: ['AtlasInput']
    })
  })

  
  afterEach(() => {
    wrapper.destroy()
  })
  

  it('should load', () => {
    wrapper = shallowMount(AtlasFilter)
    expect(wrapper.vm).toBeTruthy()
  })

  
  it('should load the staff schedule filter', () => {
    const rows = wrapper.findAll('b-row-stub')
    const inputsFound = wrapper.findAll('AtlasInput-stub')
    
    expect(rows.length).toEqual(1)
    expect(inputsFound.length).toEqual(3)
  })
  
  
  it('should load exact labels given to staff schedule inputs', () => {
    const inputsFound = wrapper.findAll('AtlasInput-stub')

    expect(inputsFound.at(0).attributes().label).toEqual('District')
    expect(inputsFound.at(0).attributes().select).toBe('')
    expect(inputsFound.at(1).attributes().label).toEqual('Site')
    expect(inputsFound.at(1).attributes().select).toBe('')
    expect(inputsFound.at(2).attributes().label).toEqual('Staff')
    expect(inputsFound.at(2).attributes().select).toBe('')
  })

  it('should load the note categories filter', async () => {
    wrapper.setProps({
      isStaffSchedule: false,
      isNoteCategory: true
    })

    const rows = await wrapper.findAll('b-row-stub')
    const inputsFound = await wrapper.findAll('AtlasInput-stub')

    expect(rows.length).toEqual(1)
    expect(inputsFound.length).toEqual(5)
  })

  xit('should load the contacts filter', async () => {
    wrapper.setProps({
      isStaffSchedule: false,
      isNoteCategory: false,
      isContacts: true
    })

    const rows = await wrapper.findAll('b-row-stub')
    const inputsFound = await wrapper.findAll('AtlasInput-stub')

    expect(rows.length).toEqual(1)
    expect(inputsFound.length).toEqual(12)
  })

  
  it('should call the generateFilter once filter is clicked', async () => {
    const mockedFilterGenerate = jest.spyOn(wrapper.vm, 'generateFilter')

    const btn = wrapper.find('b-btn-stub')
    
    wrapper.vm.$on('click', mockedFilterGenerate)

    await btn.trigger('click')
    await wrapper.vm.$emit('click')

    expect(mockedFilterGenerate).toHaveBeenCalled()
    mockedFilterGenerate.mockClear()
  })

  
  it('should call helper', () => {
    const mockedHelper = jest.spyOn(wrapper.vm, 'filtrationHelper')
    wrapper.vm.generateFilter()

    expect(mockedHelper).toHaveBeenCalled()
    mockedHelper.mockClear()
  })
  
  
  it('should test filtration helper', () => {
    wrapper.setData({
      staffSchedule: {
        district: '123',
        site: 'cairo',
        staff: 'none'
      },
      noteCategory: {
        category: 'cat1',
        subCategory: 'subcat1',
        active: 0,
        descriptor: 'desc',
        action: 'none'
      }
    })
    wrapper.vm.filtrationHelper(wrapper.vm.staffSchedule)
    expect(wrapper.emitted('filter-submit')).toEqual([['?filter[district]=123&filter[site]=cairo&none']])
  })
})
