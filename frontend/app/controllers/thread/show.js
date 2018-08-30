import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

export default Controller.extend({
  thread: alias('model.fetchThread'),
  apollo: service(),
  postContent: '',

  actions: {
    post() {
      const createPostQuery = gql`
      mutation AddPost($content: String!, $userId: Int!, $threadId: Int!) 
      {
        addPost(content: $content, userId: $userId, threadId: $threadId) {
          id
          content
          user {
            firstName
            lastName
          }
        }
      }
      `;


      this.apollo.mutate({
        mutation: createPostQuery,
        variables: {
          content: this.postContent,
          userId: 1,
          threadId: this.thread.id,
        }
      }, "addPost").then(newPost => {
        this.thread.posts.pushObject(newPost);
        this.set('postContent', '');
      });
    },
  }
});
