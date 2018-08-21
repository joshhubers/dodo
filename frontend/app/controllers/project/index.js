import Controller from '@ember/controller';

export default Controller.extend({
  isShowingModal: false,
  selectedProject: null,

  actions: {
    showModal() {
      this.set('isShowingModal', true);
    },

    onClose() {
      this.set('isShowingModal', false);
    },
  }
});
