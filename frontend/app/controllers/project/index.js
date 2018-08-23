import Controller from '@ember/controller';
import { inject as service } from "@ember/service";
import gql from "graphql-tag";

export default Controller.extend({
  apollo: service(),
  isShowingModal: false,
  selectedProject: null,

  actions: {
    showModal() {
      this.set('isShowingModal', true);
    },

    onClose() {
      this.set('isShowingModal', false);
    },

    createProject(title, description) {
      const createProjectQuery = gql`
      mutation AddProject($title: String!, $description: String!, $status: String!) 
        {
          addProject(title: $title, description: $description, status: $status) {
            id,
            title,
            status
          }
        }
      `;

      this.apollo.mutate({
        mutation: createProjectQuery,
        variables: {
          title,
          description,
          status: 'In Progress',
        }
      }).then(response => {
        const newProject = {
          id: response.addProject.id,
          title: response.addProject.title,
          description: response.addProject.description,
          status: response.addProject.status,
        };
      });

      this.set('isShowingModal', false);
    },
  }
});
