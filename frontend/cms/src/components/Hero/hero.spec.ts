import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HeroVue from './Hero.vue';

describe('Hero component', () => {
  it('renders without errors', () => {
    const wrapper = mount(HeroVue);
    expect(wrapper.exists()).toBe(true);
  });

  describe('template tests', () => {
    it('displays the title', () => {
      const wrapper = mount(HeroVue);
      expect(wrapper.text()).toContain('ATRA');
    });

    it('displays the subtitle', () => {
      const wrapper = mount(HeroVue);
      expect(wrapper.text()).toContain(
        'Asistència tècnica en rehabilitació i arquitectura'
      );
    });

    it('displays the author name', () => {
      const wrapper = mount(HeroVue);
      expect(wrapper.text()).toContain('Jaume Perez Llopis');
    });

    it('renders an image', () => {
      const wrapper = mount(HeroVue);
      expect(wrapper.find('img').exists()).toBe(true);
    });

    it('renders the image with a valid src', () => {
      const wrapper = mount(HeroVue);
      const imgSrc = wrapper.find('img').attributes('src');
      expect(imgSrc).toBeTruthy();
    });

    it('renders the image with an alt attribute', () => {
      const wrapper = mount(HeroVue);
      const altText = wrapper.find('img').attributes('alt');

      expect(altText).toBe('imatge destacada de projecte');
    });
  });
});
