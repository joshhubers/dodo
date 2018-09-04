import Component from '@ember/component';

export default Component.extend({
  classNames: ['tile', 'tile__inline', 'tile__post'],
  post: null,

  actions: {
    editPost() {
      this.editPost(this.post);
    },
    deletePost() {
      this.deletePost(this.post);
    }
  }
});
