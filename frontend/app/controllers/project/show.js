import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

export default Controller.extend({
  threads: alias('model.fetchProject.threads'),
  projectTitle: alias('model.fetchProject.title'),
  projectId: alias('model.fetchProject.id'),
  isShowingModal: false,
  selectedThread: null,
  apollo: service(),

  actions: {
    editThread(thread) {
      this.set('selectedThread', thread);
      this.set('isShowingModal', true);
    },
    deleteThread(thread) {
      const deleteThreadQuery = gql`
      mutation DeleteThread($id: Int!) 
      {
        deleteThread(id: $id)
      }
      `;

      this.apollo.mutate({
        mutation: deleteThreadQuery,
        variables: { id: thread.id }
      }).then(() => {
        this.threads.removeObject(thread);
      });
    },
    showModal() {
      this.set('selectedThread', { title: '' });
      this.set('isShowingModal', true);
    },
    onClose() {
      this.set('isShowingModal', false);
    },
    createThread(thread) {
      const createThreadQuery = gql`
      mutation AddThread($title: String!, $projectId: Int!) 
      {
        addThread(title: $title, projectId: $projectId) {
          id,
          title,
        }
      }
      `;

      this.apollo.mutate({
        mutation: createThreadQuery,
        variables: {
          title: thread.title,
          projectId: this.projectId
        }
      }).then(response => {
        const newThread = {
          id: response.addThread.id,
          title: response.addThread.title,
        };

        this.threads.pushObject(newThread);
      });

      this.set('isShowingModal', false);
    },
    updateThread(thread) {
      const updateThreadQuery = gql`
      mutation UpdateThread($id: Int!, $title: String!) 
      {
        updateThread(id: $id, title: $title) {
          id,
          title,
        }
      }
      `;

      this.apollo.mutate({
        mutation: updateThreadQuery,
        variables: {
          id: thread.id,
          title: thread.title,
        }
      });
    },
  }
});
