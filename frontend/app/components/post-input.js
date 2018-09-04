import Component from '@ember/component';

export default Component.extend({
  classNames: ['tile', 'tile__inline', 'tile__post-input'],
  postContent: '',

  actions: {
    post() {
      this.post(this.postContent);
      this.set('postContent', '');
    }
  }
});
