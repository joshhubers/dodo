import Component from '@ember/component';

export default Component.extend({
  classNames: ['tile', 'tile__inline'],
  thread: null,
  isOwner: false,

  actions: {
    deleteThread() {
      this.deleteThread(this.thread);
    },
    editThread() {
      this.editThread(this.thread);
    }
  }
});
