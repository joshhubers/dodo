import Component from '@ember/component';

export default Component.extend({
  isLoading: true,
  projects: null,

  didInsertElement() {
    this.set('isLoading', false);

    const projects = [
      { name: 'foo', description: 'Test description 1'},
      { name: 'bar', description: 'Test description 2'},
      { name: 'fizz', description: 'Test description 3'},
      { name: 'buzz', description: 'Test description 4'},
    ];

    this.set('projects', projects);
  }
});
