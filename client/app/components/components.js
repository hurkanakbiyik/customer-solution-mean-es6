import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Customers from './customers/customers';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Customers
])

.name;

export default componentModule;
