import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

export default Controller.extend({
  thread: alias('model.fetchThread'),
  apollo: service(),
  isEditingPost: false,
  editingPost: null,

  actions: {
    post(postContent) {
      const createPostQuery = gql`
      mutation AddPost($content: String!, $userId: Int!, $threadId: Int!) 
      {
        addPost(content: $content, userId: $userId, threadId: $threadId) {
          id
          content
          updatedAt
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
          content: postContent,
          userId: 1,
          threadId: this.thread.id,
        }
      }, "addPost").then(newPost => {
        this.thread.posts.pushObject(newPost);
      });
    },

    deletePost(post) {
      const deletePostQuery = gql`
      mutation DeletePost($id: Int!) 
      {
        deletePost(id: $id)
      }
      `;

      this.apollo.mutate({
        mutation: deletePostQuery,
        variables: { id: post.id }
      }).then(() => {
        this.thread.posts.removeObject(post);
      });
      
    },

    editPost(post) {
      this.set('isEditingPost', true);
      this.set('editingPost', post);

    },

    updatePost(postContent) {
      this.set('editingPost.content', postContent);
      this.set('isEditingPost', false);
    },

    onClose(post) {
      this.set('isEditingPost', false);
    },
  }
});
