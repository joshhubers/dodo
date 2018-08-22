import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import gql from "graphql-tag";

export default Component.extend(ComponentQueryManager, {
  isLoading: true,
  projects: null,

  didInsertElement() {
    this.set('isLoading', false);

    const allQuery = gql`
      query {
        allProjects {
          title
          description
        }
      }
    `
    return this.get('apollo').watchQuery({ query: allQuery }).then(returned => {
      this.set('projects', returned.allProjects);
    });
  }
});
