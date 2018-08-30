import Route from "@ember/routing/route";
import { RouteQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Route.extend(RouteQueryManager, {
  model(params) {
    const allQuery = gql`
      query thread($id: Int!) {
        fetchThread(id: $id) {
          id
          title
          posts {
            id
            content
            user {
              firstName
              lastName
            }
          }
        }
      }
    `;

    const variables = { id: params.id };

    return this.get('apollo').watchQuery({ query: allQuery, variables });
  }
});
