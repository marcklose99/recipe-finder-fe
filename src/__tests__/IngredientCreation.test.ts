import { shallowMount } from '@vue/test-utils';
import IngredientCreation from "@/components/IngredientCreation.vue";

describe('IngredientCreation', () => {
  it('renders ingredient list correctly', () => {
    // Mount the component
    const wrapper = shallowMount(IngredientCreation);

    // Assert that the component renders correctly
    expect(wrapper.exists()).toBe(true);

    // Add your additional assertions as needed
    // For example, you can check if certain elements are present or if specific methods are called correctly.
  });
});
