import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue';
import AtlasCard from '~/components/shared/card/AtlasCard.vue'

let wrapper;

describe('Card component', () => {
  Vue.use(BootstrapVue)

  
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(AtlasCard, {
      localVue,
      propsData: {
        title: 'atlas card'
      },
      slots: {
        default: `<div>hello from card</div>`
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should load', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render title', () => {
    const title = wrapper.find('h4')
    expect(title.text()).toBe('atlas card')
  })

  it('should render slot', () => {
    const slot = wrapper.find('div')
    expect(slot.text()).toBe('hello from card')
  })
})
