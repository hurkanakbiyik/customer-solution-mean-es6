let ApiFactory = function ($resource) {
  "ngInject";
  let api = {};

  api.baseUrl = "http://localhost:8080";

  /**
   * TODO - @hürkan - *naming
   */

  api.COMPANY = {
    CUSTOMER : {
      create: $resource(api.baseUrl + '/company/customer/create', {obj: '@obj'}, {get: {method: 'POST'}}),
      update: $resource(api.baseUrl + '/company/customer/update', {obj: '@obj'}, {get: {method: 'POST'}}),
      bulkCreate: $resource(api.baseUrl + '/company/customer/bulkCreate', {obj: '@obj'}, {get: {method: 'POST'}}),
      find: $resource(api.baseUrl + '/company/customer/find', {obj: '@obj'}, {get: {method: 'POST'}}),
      findByFilter: $resource(api.baseUrl + '/company/customer/findByFilter', {obj: '@obj'}, {get: {method: 'POST'}}),
      remove: $resource(api.baseUrl + '/company/customer/remove', {obj: '@obj'}, {get: {method: 'POST'}}),
      findItemCount: $resource(api.baseUrl + '/company/customer/findItemCount', {obj: '@obj'}, {get: {method: 'POST'}})
    }
  };
  return api;
};

export default ApiFactory;
