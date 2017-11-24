import CustomerDialogController from './dialogs/customer/customer-dialog.controller';
class CustomersController {
  constructor($scope, $mdSidenav, $mdDialog, $document,ApiFactory,ToastService) {
    "ngInject";
    // Data
    var vm = this;
    vm.exists = exists;
    vm.detectBrowser = detectBrowser;
    vm.guidGenerator =  guidGenerator;
    vm.isMobile  = isMobile;
    vm.toggleInArray = toggleInArray;
    vm.user = {
      "id": "5725a6802d10e277a0f35724",
      "name": "Hürkan AKBIYIK",
      "avatar": "/assets/images/avatars/profile.jpg",
      "starred": [
        "5725a680ae1ae9a3c960d487",
        "5725a6801146cce777df2a08",
        "5725a680bbcec3cc32a8488a",
        "5725a680bc670af746c435e2",
        "5725a68009e20d0a9e9acf2a"
      ],
      "frequentCustomers": [
        "5725a6809fdd915739187ed5",
        "5725a68031fdbb1db2c1af47",
        "5725a680606588342058356d",
        "5725a680e7eb988a58ddf303",
        "5725a6806acf030f9341e925",
        "5725a68034cb3968e1f79eac",
        "5725a6801146cce777df2a08",
        "5725a680653c265f5c79b5a9"
      ],
      "groups": [
        {
          "id": "5725a6802d10e277a0f35739",
          "name": "Friends",
          "customerIds": [
            "5725a680bbcec3cc32a8488a",
            "5725a680e87cb319bd9bd673",
            "5725a6802d10e277a0f35775"
          ]
        },
        {
          "id": "5725a6802d10e277a0f35749",
          "name": "Clients",
          "customerIds": [
            "5725a680cd7efa56a45aea5d",
            "5725a68018c663044be49cbf",
            "5725a6809413bf8a0a5272b1",
            "5725a6803d87f1b77e17b62b"
          ]
        },
        {
          "id": "5725a6802d10e277a0f35329",
          "name": "Recent Workers",
          "customerIds": [
            "5725a680bbcec3cc32a8488a",
            "5725a680653c265f5c79b5a9",
            "5725a6808a178bfd034d6ecf",
            "5725a6801146cce777df2a08"
          ]
        }
      ]
    };

    vm.filterIds = null;
    vm.listType = 'all';
    vm.listOrder = 'name';
    vm.listOrderAsc = false;
    vm.selectedCustomers = [];
    vm.newGroupName = '';

    // Methods
    vm.filterChange = filterChange;
    vm.openCustomerDialog = openCustomerDialog;
    vm.deleteCustomerConfirm = deleteCustomerConfirm;
    vm.deleteSelectedCustomers = deleteSelectedCustomers;
    vm.toggleSelectCustomer = toggleSelectCustomer;
    vm.deselectCustomers = deselectCustomers;
    vm.selectAllCustomers = selectAllCustomers;
    vm.deleteCustomer = deleteCustomer;
    vm.addNewGroup = addNewGroup;
    vm.deleteGroup = deleteGroup;
    vm.toggleSidenav = toggleSidenav;
    vm.importData = importData;
    vm.remove = remove;
    vm.starCustomer = starCustomer;


    activate();

    function activate() {
      findCustomers();
    }

    function starCustomer(customer) {
      customer.star = !customer.star;
      let query = {
        data : customer,
        auth : {
        }
      };

      ApiFactory.COMPANY.CUSTOMER.update.get(query,
        function(response){
          if(response.error){
          }else{
            ToastService.info("Customer updated");
          }
          vm.loading = false;
        },
        function(error){
          ToastService.error(error.data.message);
          vm.loading = false;
        }
      );
    }

    function remove(customer) {
      let query = {
        data : customer,
        auth : {
        }
      };

      ApiFactory.COMPANY.CUSTOMER.remove.get(query,
        function(response){
          if(response.error){
          }else{
            ToastService.info("Customer deleted");
            findCustomers();
          }
          vm.loading = false;
        },
        function(error){
          ToastService.error(error.data.message);
          vm.loading = false;
        }
      );
    }

    function importData() {
      let testData = [
        {
          name : {
            first : "Abbott",
            last : "Keitch"
          },
          avatar: "assets/images/avatars/Abbott.jpg",
          company : "Saois",
          email : "abbott@example.com",
          phone : "+1-202-555-0175",
          address: "933 8th Street Stamford, CT 06902",
          gender : "w",
          birthday : new Date(80, 5, 24),
          lastContact : new Date(),
          star : true,
          customerLifetimeValue : 102.50
        },
        {
          name : {
            first : "Arnold",
            last : "Matlock"
          },
          avatar: "assets/images/avatars/Arnold.jpg",
          company : "Wanderer",
          email : "arnold@example.com",
          phone : "+1-202-555-0141",
          address: "906 Valley Road Michigan City, IN 46360",
          gender : "m",
          birthday : new Date(82, 10, 21),
          lastContact : new Date(),
          star : false,
          customerLifetimeValue : 65.52
        },
        {
          name : {
            first : "Barrera",
            last : "Bradbury"
          },
          avatar: "assets/images/avatars/Barrera.jpg",
          company : "Unizim",
          email : "barrera@example.com",
          phone : "+1-202-555-0196",
          address: "183 River Street Passaic, NJ 07055",
          gender : "m",
          birthday : new Date(90, 1, 21),
          lastContact : new Date(),
          star : true,
          customerLifetimeValue : 10.11
        }
      ];
      bulkCreate(testData);
    }

    function findCustomers() {
      let query = {
        data : {},
        auth : {

        }
      };
      ApiFactory.COMPANY.CUSTOMER.find.get(query,
        function(response){
          if(response.error){

          }else{
            vm.customers = response.data;
          }
          vm.loading = false;
        },
        function(error){
          vm.loading = false;
        }
      );
    }

    function bulkCreate(testData) {
      let query = {
        data : testData,
        auth : {

        }
      };

      ApiFactory.COMPANY.CUSTOMER.bulkCreate.get(query,
        function(response){
          if(response.error){

          }else{
            findCustomers();
          }
          vm.loading = false;
        },
        function(error){
          vm.loading = false;
        }
      );
    }

    //////////

    /**
     * Change Customers List Filter
     * @param type
     */
    function filterChange(type)
    {

      vm.listType = type;

      if ( type === 'all' )
      {
        vm.filterIds = null;
      }
      else if ( type === 'frequent' )
      {
        vm.filterIds = vm.user.frequentCustomers;
      }
      else if ( type === 'starred' )
      {
        vm.filterIds = vm.user.starred;
      }
      else if ( angular.isObject(type) )
      {
        vm.filterIds = type.customerIds;
      }

      vm.selectedCustomers = [];

    }

    /**
     * Open new customer dialog
     *
     * @param ev
     * @param customer
     */
    function openCustomerDialog(ev, customer)
    {
      $mdDialog.show({
        controller         : CustomerDialogController,
        controllerAs       : 'vm',
        templateUrl        : 'app/components/customers/dialogs/customer/customer-dialog.html',
        parent             : angular.element($document.find('#content-container')),
        targetEvent        : ev,
        clickOutsideToClose: true,
        locals             : {
          Customer : customer,
          User    : vm.user,
          Customers: vm.customers
        }
      }).then(function ()
      {
        findCustomers();
      }, function ()
      {

      });
    }

    /**
     * Delete Customer Confirm Dialog
     */
    function deleteCustomerConfirm(customer, ev)
    {
      let confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the customer?')
        .htmlContent('<b>' + customer.name.first + ' ' + customer.name.last + '</b>' + ' will be deleted.')
        .ariaLabel('delete customer')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        remove(customer);
        vm.selectedCustomers = [];

      }, function ()
      {

      });
    }

    /**
     * Delete Customer
     */
    function deleteCustomer(customer)
    {
      vm.customers.splice(vm.customers.indexOf(customer), 1);
    }

    /**
     * Delete Selected Customers
     */
    function deleteSelectedCustomers(ev)
    {
      let confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the selected customers?')
        .htmlContent('<b>' + vm.selectedCustomers.length + ' selected</b>' + ' will be deleted.')
        .ariaLabel('delete customers')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        vm.selectedCustomers.forEach(function (customer)
        {
          deleteCustomer(customer);
        });

        vm.selectedCustomers = [];

      });

    }

    /**
     * Toggle selected status of the customer
     *
     * @param customer
     * @param event
     */
    function toggleSelectCustomer(customer, event)
    {
      if ( event )
      {
        event.stopPropagation();
      }

      if ( vm.selectedCustomers.indexOf(customer) > -1 )
      {
        vm.selectedCustomers.splice(vm.selectedCustomers.indexOf(customer), 1);
      }
      else
      {
        vm.selectedCustomers.push(customer);
      }
    }

    /**
     * Deselect customers
     */
    function deselectCustomers()
    {
      vm.selectedCustomers = [];
    }

    /**
     * Sselect all customers
     */
    function selectAllCustomers()
    {
      vm.selectedCustomers = $scope.filteredCustomers;
    }

    /**
     *
     */
    function addNewGroup()
    {
      if ( vm.newGroupName === '' )
      {
        return;
      }

      let newGroup = {
        'id'        : '',
        'name'      : vm.newGroupName,
        'customerIds': []
      };

      vm.user.groups.push(newGroup);
      vm.newGroupName = '';
    }

    /**
     * Delete Group
     */
    function deleteGroup(ev)
    {
      let group = vm.listType;

      let confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the group?')
        .htmlContent('<b>' + group.name + '</b>' + ' will be deleted.')
        .ariaLabel('delete group')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        vm.user.groups.splice(vm.user.groups.indexOf(group), 1);

        filterChange('all');
      });

    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId)
    {
      $mdSidenav(sidenavId).toggle();
    }

    /**
     * Check if item exists in a list
     *
     * @param item
     * @param list
     * @returns {boolean}
     */
    function exists(item, list)
    {
      return list.indexOf(item) > -1;
    }

    /**
     * Returns browser information
     * from user agent data
     *
     * Found at http://www.quirksmode.org/js/detect.html
     * but modified and updated to fit for our needs
     */
    function detectBrowser()
    {
      // If we already tested, do not test again
      if ( browserInfo )
      {
        return browserInfo;
      }

      var browserData = [
        {
          string       : $window.navigator.userAgent,
          subString    : 'Edge',
          versionSearch: 'Edge',
          identity     : 'Edge'
        },
        {
          string   : $window.navigator.userAgent,
          subString: 'Chrome',
          identity : 'Chrome'
        },
        {
          string       : $window.navigator.userAgent,
          subString    : 'OmniWeb',
          versionSearch: 'OmniWeb/',
          identity     : 'OmniWeb'
        },
        {
          string       : $window.navigator.vendor,
          subString    : 'Apple',
          versionSearch: 'Version',
          identity     : 'Safari'
        },
        {
          prop    : $window.opera,
          identity: 'Opera'
        },
        {
          string   : $window.navigator.vendor,
          subString: 'iCab',
          identity : 'iCab'
        },
        {
          string   : $window.navigator.vendor,
          subString: 'KDE',
          identity : 'Konqueror'
        },
        {
          string   : $window.navigator.userAgent,
          subString: 'Firefox',
          identity : 'Firefox'
        },
        {
          string   : $window.navigator.vendor,
          subString: 'Camino',
          identity : 'Camino'
        },
        {
          string   : $window.navigator.userAgent,
          subString: 'Netscape',
          identity : 'Netscape'
        },
        {
          string       : $window.navigator.userAgent,
          subString    : 'MSIE',
          identity     : 'Explorer',
          versionSearch: 'MSIE'
        },
        {
          string       : $window.navigator.userAgent,
          subString    : 'Trident/7',
          identity     : 'Explorer',
          versionSearch: 'rv'
        },
        {
          string       : $window.navigator.userAgent,
          subString    : 'Gecko',
          identity     : 'Mozilla',
          versionSearch: 'rv'
        },
        {
          string       : $window.navigator.userAgent,
          subString    : 'Mozilla',
          identity     : 'Netscape',
          versionSearch: 'Mozilla'
        }
      ];

      var osData = [
        {
          string   : $window.navigator.platform,
          subString: 'Win',
          identity : 'Windows'
        },
        {
          string   : $window.navigator.platform,
          subString: 'Mac',
          identity : 'Mac'
        },
        {
          string   : $window.navigator.platform,
          subString: 'Linux',
          identity : 'Linux'
        },
        {
          string   : $window.navigator.platform,
          subString: 'iPhone',
          identity : 'iPhone'
        },
        {
          string   : $window.navigator.platform,
          subString: 'iPod',
          identity : 'iPod'
        },
        {
          string   : $window.navigator.platform,
          subString: 'iPad',
          identity : 'iPad'
        },
        {
          string   : $window.navigator.platform,
          subString: 'Android',
          identity : 'Android'
        }
      ];

      var versionSearchString = '';

      function searchString(data)
      {
        for ( var i = 0; i < data.length; i++ )
        {
          var dataString = data[i].string;
          var dataProp = data[i].prop;

          versionSearchString = data[i].versionSearch || data[i].identity;

          if ( dataString )
          {
            if ( dataString.indexOf(data[i].subString) !== -1 )
            {
              return data[i].identity;

            }
          }
          else if ( dataProp )
          {
            return data[i].identity;
          }
        }
      }

      function searchVersion(dataString)
      {
        var index = dataString.indexOf(versionSearchString);

        if ( index === -1 )
        {
          return;
        }

        return parseInt(dataString.substring(index + versionSearchString.length + 1));
      }

      var browser = searchString(browserData) || 'unknown-browser';
      var version = searchVersion($window.navigator.userAgent) || searchVersion($window.navigator.appVersion) || 'unknown-version';
      var os = searchString(osData) || 'unknown-os';

      // Prepare and store the object
      browser = browser.toLowerCase();
      version = browser + '-' + version;
      os = os.toLowerCase();

      browserInfo = {
        browser: browser,
        version: version,
        os     : os
      };

      return browserInfo;
    }

    /**
     * Generates a globally unique id
     *
     * @returns {*}
     */
    function guidGenerator()
    {
      var S4 = function ()
      {
        return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
      };
      return (S4() + S4() + S4() + S4() + S4() + S4());
    }

    /**
     * Return if current device is a
     * mobile device or not
     */
    function isMobile()
    {
      return mobileDetect.mobile();
    }

    /**
     * Toggle in array (push or splice)
     *
     * @param item
     * @param array
     */
    function toggleInArray(item, array)
    {
      if ( array.indexOf(item) === -1 )
      {
        array.push(item);
      }
      else
      {
        array.splice(array.indexOf(item), 1);
      }
    }
  }
}

export default CustomersController ;
