import CustomersModule from './customers'

describe('Customers', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(CustomersModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
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
