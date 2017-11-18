import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customersComponent from './customers.component';

let customersModule = angular.module('customers', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customers', {
      url: '/',
      component: 'customers'
    });
  // Translation

})

.component('customers', customersComponent)

.name;

export default customersModule;
