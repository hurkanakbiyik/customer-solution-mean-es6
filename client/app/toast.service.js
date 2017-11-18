let ToastService = function ($mdToast) {
  "ngInject";
  let service = {
    error: error,
    success: success,
    info : info
  };

  return service;

  //////////

  function success(text) {
    $mdToast.show(
      $mdToast.simple()
        .toastClass("toast-success")
        .textContent(text)
    );
  }

  function info(text) {
    $mdToast.show(
      $mdToast.simple()
        .toastClass("toast-info")
        .textContent(text)
    );
  }

  function error(text) {
    $mdToast.show(
      $mdToast.simple()
        .toastClass("toast-error")
        .textContent(text)
    );
  }
};

export default ToastService;
