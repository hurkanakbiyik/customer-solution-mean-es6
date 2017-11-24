import CustomersModule from './customers'
import ApiFactory from "../../api.factory";
import ToastService from "../../toast.service";
import ngResource from 'angular-resource';
describe('Customers', () => {
  let $rootScope, $state, $location, $componentController, $compile,$mdSidenav,$mdToast,$resource;
  window.module.sharedInjector();
  beforeEach(window.module(CustomersModule));
  beforeEach(window.module(ApiFactory));
  beforeEach(window.module(ToastService));
  beforeEach(window.module(ngResource));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $mdSidenav = $injector.get('$mdSidenav');
    $mdToast = $injector.get('$mdToast');
    $resource = $injector.get('$resource');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be customers', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).to.eq('customers');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('customers', {
        $scope: $rootScope.$new()
      });
    });

    it('has a user property', () => {
      expect(controller).to.have.property('vm.user');
    });

    it('has a customers property', () => {
      expect(controller).to.have.property('vm.customers');
    });

  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<customers></customers>')(scope);
      scope.$apply();
    });

    it('has name in template', () => {
      expect(template.find('h1').html()).to.eq('Found in customers.html');
    });

  });
});
