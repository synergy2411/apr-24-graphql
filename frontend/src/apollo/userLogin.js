import { gql } from "@apollo/client";

const USER_LOGIN = gql`
  mutation mutationUserLogin($email: String!, $password: String!) {
    userLogin(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export default USER_LOGIN;
