import Component from '@ember/component';

export default Component.extend({
  project: null,

  save() {
    if(this.project.id) {
      this.updateProject(this.project);
    } else {
      this.createProject(this.project);
    }
  },

  actions: {
    onClose() {
      this.save();
      this.onClose();
    },
    saveProject() {
      this.save();
    },
  }
});
