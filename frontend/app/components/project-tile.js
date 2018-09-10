import Component from '@ember/component';

export default Component.extend({
  classNames: ['tile', 'tile__block'],
  project: null,

  actions: {
    deleteProject() {
      this.deleteProject(this.project);
    },
    editProject() {
      this.editProject(this.project);
    }
  }
});
