import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import { ValidationObserver } from "vee-validate"
import AtlasValidationForm from '~/components/shared/forms/AtlasValidationForm.vue'

let wrapper;

describe('Card component', () => {
  Vue.use(BootstrapVue)
  Vue.component("ValidationObserver", ValidationObserver)
  
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = mount(AtlasValidationForm, {
      localVue,
      propsData: {
        submitBtnName: 'jest test'
      },
      slots: {
        default: `<h2 class"jest">hello from form</h2>`
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should load', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render slot', () => {
    const slot = wrapper.find('.container')
    expect(slot.text()).toContain('hello from form')
  })

  it('should emit event on submit', () => {
    wrapper.vm.onSubmit({ test: 'jest' })
    expect(wrapper.emitted('form-submit')).toEqual([[{test: 'jest'}]])
  })
})
