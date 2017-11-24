import './customer-dialog.scss';

class CustomerDialogController {
  constructor($mdDialog, Customer, Customers, User,ApiFactory,ToastService) {
    "ngInject";
    let vm = this;
    vm.title = 'Edit Customer';
    vm.customer = angular.copy(Customer);
    vm.customers = Customers;
    vm.user = User;
    vm.newCustomer = false;
    vm.allFields = false;

    if ( !vm.customer )
    {
      vm.customer = {
        'avatar'  : 'assets/images/avatars/profile.jpg'
      };

      vm.title = 'New Customer';
      vm.newCustomer = true;
      vm.customer.tags = [];
    }

    // Methods
    vm.addNewCustomer = addNewCustomer;
    vm.saveCustomer = saveCustomer;
    vm.deleteCustomerConfirm = deleteCustomerConfirm;
    vm.closeDialog = closeDialog;


    function addNewCustomer() {
      let query = {
        data : vm.customer,
        auth : {

        }
      };

      ApiFactory.COMPANY.CUSTOMER.create.get(query,
        function(response){
          if(response.error){
            ToastService.error(response.error.data.message);
          }else{
            vm.customer = response.data;
            ToastService.info("Successful create");
            $mdDialog.hide(vm.customer);
          }
          vm.loading = false;
        },
        function(error){
          ToastService.error(error.data.message);
          vm.loading = false;
        }
      );
    }


    function saveCustomer() {
      let query = {
        data : vm.customer,
        auth : {

        }
      };

      ApiFactory.COMPANY.CUSTOMER.update.get(query,
        function(response){
          if(response.error){
            ToastService.error(response.error.data.message);
          }else{
            vm.customer = response.data;
            ToastService.info("Successful update");
            $mdDialog.hide(vm.customer);
          }
          vm.loading = false;
        },
        function(error){
          ToastService.error(error.data.message);
          vm.loading = false;
        }
      );
    }

    vm.toggleInArray = function toggleInArray(item, array)
    {
      if ( array.indexOf(item) === -1 )
      {
        array.push(item);
      }
      else
      {
        array.splice(array.indexOf(item), 1);
      }
    };
    vm.exists = function exists(item, list)
    {
      return list.indexOf(item) > -1;
    };

    //////////

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
     * Close dialog
     */
    function closeDialog()
    {
      $mdDialog.hide();
    }

  }
}
export default CustomerDialogController ;
