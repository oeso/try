/*
 @author : O Eunsun
 @version: 1.0.0

 @description:  monthPicker is an Angular directive to show a simple calendar allowing user to select month.
 
 Demo page : http://...
 */

'use strict';
var monthPicker = function () {
        return {
            restrict: 'AE',
            scope: {
                result : '=',
                ngModel: '=?',
                thisMonth : '='
            },
            template:   '<div class="month-picker">' +
                            '<ul>' +
                                '<li ng-repeat="list in result"><button type="button" class="pick" ng-class="{\'on\':list.month,\'current\':list.list==targetMonth}" ng-disabled="!list.month">{{list.list}}</button></li>' +
                            '</ul>' +
                        '</div>',
            link: function (scope, element, attr) {
                scope.ngModel = scope.ngModel || [];
                var item = scope.month

                scope.$watch('result', function(){
                    console.log(scope.result);
                },true)


            }
        };
    };



