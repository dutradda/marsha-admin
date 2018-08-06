// import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    // GET_ONE,
    // GET_MANY,
    // GET_MANY_REFERENCE,
    // CREATE,
    // UPDATE,
    // UPDATE_MANY,
    // DELETE,
    // DELETE_MANY,
} from 'react-admin';

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = apiUrl;
    const options = {};

    switch (type) {
      case GET_LIST: {
        options.body = JSON.stringify({
          query: `
            query($query: String) {
              search(query: $query) {
                ... on Media {
                  id
                  title
                }
              }
            }
          `,
          variables: {
            query: 'test'
          }
        });
        options.method = 'POST';
        options.headers = new Headers();
        options.headers.set('Content-Type', 'application/json')
        break;
      }
      // case GET_ONE: {}
      // case GET_MANY: {}
      // case GET_MANY_REFERENCE: {}
      // case CREATE: {}
      // case UPDATE: {}
      // case UPDATE_MANY: {}
      // case DELETE: {}
      // case DELETE_MANY: {}
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }

    return { url, options };
  };

  const convertHTTPResponse = (response, type, resource, params) => {
    switch (type) {
      case GET_LIST: {
        // console.log(response, type, resource, params);
        return {
          data: response.json.data.search,
          total: response.json.data.search.length
        };
      }
      // case GET_ONE: {}
      // case GET_MANY: {}
      // case GET_MANY_REFERENCE: {}
      // case CREATE: {}
      // case UPDATE: {}
      // case UPDATE_MANY: {}
      // case DELETE: {}
      // case DELETE_MANY: {}
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  return (type, resource, params) => {
    const { url, options } = convertDataRequestToHTTP(
        type,
        resource,
        params
    );

    return httpClient(url, options).then(response =>
        convertHTTPResponse(response, type, resource, params)
    ).catch(error => {
      console.log(error)
    });
  }
}
