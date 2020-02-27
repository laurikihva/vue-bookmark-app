import { shallowMount } from '@vue/test-utils';
import Search from '@/components/Search.vue';

describe('<Search />', () => {
  it('renders props.label when passed', () => {
    const label = 'My search';
    const wrapper = shallowMount(Search, {
      propsData: { label }
    });

    expect(wrapper.text()).toMatch(label);
  });

  it('emits correct value', async () => {
    const value = 'Test value';
    const wrapper = shallowMount(Search);

    wrapper.vm.$emit('myValue');
    wrapper.vm.$emit('myValue', value);

    // wait until $emits have been handled
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().myValue[1]).toEqual([value]);
  });
});
