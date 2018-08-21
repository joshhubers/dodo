import Component from '@ember/component';

export default Component.extend({
  actions: {
    onClose() {
      this.onClose();
    }
  }
});
