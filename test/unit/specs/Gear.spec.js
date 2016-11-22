import Vue from 'vue'
import Gear from 'src/components/Gear'

function getRenderedElement (Compenent, propsData) {
  const Ctor = Vue.extend(Compenent)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el
}

describe('Gear.vue', () => {
  it('should render correct contents', () => {
    const el = getRenderedElement(Gear, { value: { teeth: 40, count: 3 } })
    expect(el.querySelector('.gear .teeth').textContent).to.equal('40')
    expect(el.querySelector('.gear .count').textContent).to.equal('3')
  })
})
