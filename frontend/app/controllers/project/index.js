import Controller from '@ember/controller';
import gql from "graphql-tag";
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  isShowingModal: false,
  selectedProject: null,
  projects: alias('model.allProjects'),
  apollo: service(),

  actions: {
    updateProject(project) {
      const updateProjectQuery = gql`
      mutation UpdateProject($id: Int!, $title: String!, $description: String!, $status: String!) 
      {
        updateProject(id: $id, title: $title, description: $description, status: $status) {
          id,
          title,
          description,
          status
        }
      }
      `;

      this.apollo.mutate({
        mutation: updateProjectQuery,
        variables: {
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
        }
      });
    },

    editProject(project) {
      this.set('selectedProject', project);
      this.set('isShowingModal', true);
    },

    deleteProject(project) {
      const deleteProjectQuery = gql`
      mutation DeleteProject($id: Int!) 
      {
        deleteProject(id: $id)
      }
      `;


      this.apollo.mutate({
        mutation: deleteProjectQuery,
        variables: { id: project.id }
      }).then(() => {
        this.projects.removeObject(project);
      });
    },

    createProject(project) {
      const createProjectQuery = gql`
      mutation AddProject($title: String!, $description: String!, $status: String!) 
      {
        addProject(title: $title, description: $description, status: $status) {
          id,
          title,
          description,
          status
        }
      }
      `;

      this.apollo.mutate({
        mutation: createProjectQuery,
        variables: {
          title: project.title,
          description: project.description,
          status: project.status,
        }
      }).then(response => {
        const newProject = {
          id: response.addProject.id,
          title: response.addProject.title,
          description: response.addProject.description,
          status: response.addProject.status,
        };

        this.projects.pushObject(newProject);
      });

      this.set('isShowingModal', false);
    },

    showModal() {
      this.set('selectedProject', { title: '', description: '', status: 'In Progress'});
      this.set('isShowingModal', true);
    },

    onClose() {
      this.set('isShowingModal', false);
    },
  }
});
