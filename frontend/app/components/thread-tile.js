import Component from '@ember/component';

export default Component.extend({
  classNames: ['tile', 'tile--inline'],
  thread: null,

  actions: {
    deleteThread() {
      this.deleteThread(this.thread);
    },
    editThread() {
      this.editThread(this.thread);
    }
  }
});
