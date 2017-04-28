/**
 * Title : File Name Editor developed AngularJS
 * Date : 2017 04 28
 **/
'use strict';

//var app = angular.module( 'fileNamer', []);

// /* body */
// app.controller('All', [ '$scope' , function( $scope ) {
//     $scope.layerState = false;
// }]);

/* file open */
angular.module( 'fileNamer',[] )
    .controller('callArea', [ '$scope', function( $scope ){
        $scope.fileOpenStart = function(){
            alert(123);
        }
}]);
//
// /* left menu */
// app.controller('leftMenu', [ '$scope' , function( $scope ){
//
// }]);
//
// /* content */
// app.controller('content', [ '$scope' , function( $scope ){
//
// }]);

