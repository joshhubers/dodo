import Component from '@ember/component';

export default Component.extend({
  projectName: '',
  projectDescription: '',

  actions: {
    onClose() {
      this.onClose();
    },
    createProject() {
      this.createProject(this.projectName, this.projectDescription);
    },
  }
});
