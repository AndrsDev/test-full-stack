import User from "models/user.model";
import { API, graphqlOperation } from 'aws-amplify';

function listUsers(limit: number, nextToken: string | null) {
  return `
    query list {
      listUsers (limit: ${limit}, nextToken: ${nextToken ? `"${nextToken}"` : null}) {
        items {
          id name address dob description
        }
        nextToken
      }
    }
  `
}

class UsersService {
  async getUsersList(limit: number, nextToken: string | null) : Promise<{ items: Array<User>, token: string}> {
    const response: any = await API.graphql(graphqlOperation(listUsers(limit, nextToken)));
    const items = response.data.listUsers.items;
    const token = response.data.listUsers.nextToken;
    return {
      items,
      token,
    };
  }

}

export default UsersService;