/*globals angular, localStorage */

(function () {

    'use strict';

    angular.module('linkfb', [])

    .constant('MODULE_VERSION', '0.0.1')

    .factory('RESTFactory', ['$http', function ($http) {

        var RESTConfig = {
            'ip_back' : 'http://localhost:5000',
            'ping'    : '/ping',
            'pang'    : '/pang',
            'login'   : '/login',
            'signup'  : '/signup',
            'users'   : '/users'
        },
        dataFactory = {};

        dataFactory.service = function (type, service, id, contents) {

        $http.defaults.headers.common.username = localStorage.getItem('username');
        $http.defaults.headers.common.token = localStorage.getItem('token');

        // PING

        if (type === 'ping') {
            switch (service) {
                case 'GET':
                    return $http.get(RESTConfig.ip_back + RESTConfig.ping);
                default:
                    break;
            }
        }

        // PANG

        if (type === 'pang') {
            switch (service) {
                case 'GET':
                    return $http.get(RESTConfig.ip_back + RESTConfig.pang);
                default:
                    break;
            }
        }

        // LOGIN

        if (type === 'login') {
            switch (service) {
                case 'GET':
                    return $http.get(RESTConfig.ip_back + RESTConfig.login + '?username=' + contents.username + '&password=' + contents.password);
                default:
                    break;
            }
        }

        // SIGNUP

        if (type === 'signup') {
            switch (service) {
                case 'POST':
                    return $http.post(RESTConfig.ip_back + RESTConfig.signup, contents);
                default:
                    break;
            }
        }

        // USERS

        if (type === 'users') {

            switch (service) {
                case 'GET':
                    if (!contents) {
                        return $http.get(RESTConfig.ip_back + RESTConfig.users + (id ? ('/' + id) : ''));
                    } else {
                        if (contents.type === 'name') {
                            return $http.get(RESTConfig.ip_back + RESTConfig.users + '?name=' + id);
                        }
                    }
                case 'POST':
                    return $http.post(RESTConfig.ip_back + RESTConfig.users, contents);
                case 'PUT':
                    return $http.put(RESTConfig.ip_back + RESTConfig.users + '/' + id, contents);
                case 'DELETE':
                    return $http.delete(RESTConfig.ip_back + RESTConfig.users + '/' + id);
                default:
                    break;
                }
            }
        };

        return dataFactory;
    }])

    .service('RESTService', ['$log', 'RESTFactory', function ($log, RESTFactory) {
        return {
            service: function (type, service, id, contents) {
                return RESTFactory.service(type, service, id, contents)
                    .error(function (error) {
                        $log.error('Unable to load data: ' + error.message);
                    }).then(function (response) {
                        return response.data;
                    });
            },
            service_raw: function (type, service, id, contents) {
                return RESTFactory.service(type, service, id, contents);
            }
        };
    }])

    .service('SerializeService', ['$log', function ($log) {
        return {
            serialize: function (object, data, type, direction) {
                if (type === 'users') {
                    if (direction) {
                        $log.info('Client to server!');
                    } else {
                        $log.info('Client from server!');
                    }
                }
            }
        };
    }]);
})();