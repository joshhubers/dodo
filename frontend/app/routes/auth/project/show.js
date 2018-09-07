import Route from "@ember/routing/route";
import { RouteQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Route.extend(RouteQueryManager, {
  model(params) {
    const allQuery = gql`
      query threadsForProject($id: Int!) {
        fetchProject(id: $id) {
          id
          title
          threads {
            id
            title
          }
        }
      }
    `;

    const variables = { id: params.id };

    return this.get('apollo').watchQuery({ query: allQuery, variables });
  }
});
