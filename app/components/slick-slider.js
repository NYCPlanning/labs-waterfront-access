import SlickSliderComponent from 'ember-cli-slick/components/slick-slider';

export default SlickSliderComponent.extend({
  willDestroyElement() {
    this.$().slick('unslick');
  },
});
