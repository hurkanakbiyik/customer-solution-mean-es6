import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import customersComponent from './customers.component';

let customersModule = angular.module('app.customers', [
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
