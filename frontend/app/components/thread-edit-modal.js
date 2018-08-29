import Component from '@ember/component';

export default Component.extend({
  thread: null,

  save() {
    if(this.thread.id) {
      this.updateThread(this.thread);
    } else {
      this.createThread(this.thread);
    }
  },

  actions: {
    onClose() {
      this.save();
      this.onClose();
    },
    saveThread() {
      this.save();
    },
  }
});
