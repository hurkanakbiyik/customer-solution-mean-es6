import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import ngMaterial from 'angular-material';
import AppComponent from './app.component';
import ngResource from 'angular-resource';
import angularTranslate from 'angular-translate';
import angularSanitize from 'angular-sanitize';
import angularTranslatePartialLoader from 'angular-translate-loader-partial';
import 'angular-material/angular-material.css';
import ApiFactory from './api.factory';
import ToastService from './toast.service';
import moment from 'moment';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngMaterial,
    ngResource,
    angularSanitize,
    angularTranslate,
    angularTranslatePartialLoader
  ])
  .config(($locationProvider,$translateProvider,$translatePartialLoaderProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translatePartialLoaderProvider.addPart('app/components/customers');
  })

  .component('app', AppComponent)
  .factory('Api', ApiFactory)
  .factory('ToastService', ToastService)
  .filter('altDate', altDate);

/** @ngInject */
function altDate()
{
  return function (value)
  {
    var diff = Date.now() - new Date(value);

    /**
     * If in a hour
     * e.g. "2 minutes ago"
     */
    if ( diff < (60 * 60 * 1000) )
    {
      return moment(value).fromNow();
    }
    /*
	 * If in the day
	 * e.g. "11:23"
	 */
    else if ( diff < (60 * 60 * 24 * 1000) )
    {
      return moment(value).format('HH:mm');
    }
    /*
	 * If in week
	 * e.g "Tuesday"
	 */
    else if ( diff < (60 * 60 * 24 * 7 * 1000) )
    {
      return moment(value).format('dddd');
    }
    /*
	 * If more than a week
	 * e.g. 03/29/2016
	 */
    else
    {
      return moment(value).calendar();
    }

  };
}
