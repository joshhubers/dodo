import Component from '@ember/component';

export default Component.extend({
  post: null,

  actions: {
    post(postContent) {
      this.updatePost(postContent);
    },
    onClose() {
      this.onClose(this.post);
    }
  }
});
