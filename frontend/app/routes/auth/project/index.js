import Route from "@ember/routing/route";
import { RouteQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Route.extend(RouteQueryManager, {
  model() {
    const allQuery = gql`
      query {
        allProjects {
          id
          title
          description
          status
        }
      }
    `;

    return this.apollo.watchQuery({ query: allQuery });
  }
});
