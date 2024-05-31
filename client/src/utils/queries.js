import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getSingleUser($id: ID, $username: String) {
    getSingleUser(id: $id, username: $username) {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
    }
}`;
