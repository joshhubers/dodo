import Component from '@ember/component';

export default Component.extend({
  classNames: ['info-tile'],
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
