import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customersComponent from './customers.component';
import ngMaterial from 'angular-material';
import ngResource from 'angular-resource';
let customersModule = angular.module('app.customers', [
  uiRouter,
  ngMaterial
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
