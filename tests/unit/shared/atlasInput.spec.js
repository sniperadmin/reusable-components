import Vue from 'vue'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import AtlasInput from '@/components/shared/inputs/AtlasInput.vue'

// jest.mock('@nuxtjs/moment', () => {
//   return {
//     $moment: jest.fn(() => {
//       return {
//         format: () => '',
//       }
//     }),
//   }
// })

let wrapper
Vue.use(BootstrapVue)
Vue.component('ValidationObserver', ValidationObserver)

describe('AtlasInput component', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(AtlasInput, {
      localVue,
      propsData: {
        label: 'atlas name',
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should load', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render validator', () => {
    const validator = wrapper.find('validation-provider-stub')
    expect(validator.exists()).toBe(true)
    expect(validator.attributes().name).toEqual('atlas name')
  })

  it('should test validation status', () => {
    let validationPayload = {
      dirty: true,
      validated: true,
      valid: false,
    }
    expect(wrapper.vm.getValidationState(validationPayload)).toBe(false)

    validationPayload = {
      dirty: true,
      validated: false,
      valid: true,
    }
    expect(wrapper.vm.getValidationState(validationPayload)).toBe(true)
  })

  it('should emit disabled dates', () => {
    wrapper.vm.disableDates('12-12-2020')
    expect(wrapper.emitted('disable-dates')).toStrictEqual([['12-12-2020']])
  })

  xit('should emit formatted date for api', () => {
    wrapper.vm.onContext({ selectedYMD: '10-21-2020' })
    expect(wrapper.emitted('formatted-date')).toStrictEqual([
      [{ selectedYMD: '10-21-2020' }],
    ])
  })
})

describe('Test reusability for text input', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    const parentComponent = {
      template: `
        <AtlasInput v-model="val" text rules="required" label="text input"></AtlasInput>
      `,
      components: { AtlasInput },
      data() {
        return {
          val: null,
        }
      },
    }
    wrapper = mount(parentComponent, {
      localVue,
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should mount component properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should load label', () => {
    const label = wrapper.find('div')
    expect(label.exists()).toBe(true)
    expect(label.text()).toContain('text input')
  })
})

describe('Test select reusability', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    const parentComponent = {
      template: `
        <AtlasInput v-model="val" select :select-options="opts" label="select input"></AtlasInput>
      `,
      components: { AtlasInput },
      data() {
        return {
          val: null,
          opts: [{ value: '1', text: 'cat' }],
        }
      },
    }
    wrapper = mount(parentComponent, {
      localVue,
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should mount component properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should load label', () => {
    const label = wrapper.find('div')
    expect(label.exists()).toBe(true)
    expect(label.text()).toContain('select input')
  })
})

describe('should call getValidationState', () => {})
