/**
 * Title : File Name Editor developed AngularJS
 * Date : 2017 04 28
 **/

'use strict';

/* body */
angular.module( 'app', []).controller('All', [ '$scope' , function( $scope ) {
    $scope.layerState = false;
}]);

/* file open */
var navBtns // 왼쪽메뉴버튼
    , openMessage
    , fileNameList = [] //open한 file 네임 리스트

window.onload = function(){ //두 개 이상의함수에서 쓰는 변수들은 onload시 초기화.
    navBtns       =  document.getElementById("nav").getElementsByTagName("button"); // 왼쪽메뉴버튼
    openMessage   =  document.getElementById("openMessage"); // 레이어 확인 버튼
    //navButtonDisable(); //새로고침시 왼쪽 메뉴 버튼 초기화(비활성화);
};
//
// function fileOpenStart(input){
//     //fileObj = input; // Fire Base로 넘길 객체에 file 정보를 담아둔다.나중에 설명
//     navButtonEnable(); // left menu 버튼 활성화 한다.
//     if( input.files ){ // IE9 이상 , 그 외 브라우저
//         for(var i=0; i<input.files.length;i++){ // 불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
//             fileNameList.push(input.files[i].name);
//         };
//     }else{ // IE9 이하( File List 객체가 없음 )
//         fileNameList = nameSort( input.value );
//     };
//     //writeInTable( input ); // Table에 삽입하는 함수 호출
// };

/* 현재 리스트에 파일이 없을 경우 왼쪽 메뉴 비활성화 */
// function navButtonDisable(){
//     for (var i = 0; i < navBtns.length; i++) {
//         navBtns[i].setAttribute( "disabled", "disabled" );
//     };
//     openMessage.style.display = "block";
// };

/* 현재 리스트에 파일이 하나 이상일 경우 왼쪽 메뉴 활성화 함수 */
// function navButtonEnable(){
//     for (var i = 0; i < navBtns.length; i++) {
//         navBtns[i].removeAttribute( "disabled" );
//     };
//     openMessage.style.display = "none";
// };


var app = angular.module( 'app', [])

    .controller('editor', [ '$rootScope', '$scope', function( $rootScope, $scope ){
        $scope.theFile = null;
        $scope.checkedList = [];
            console.log($scope.theFile);

        // 전체 삭제
        $scope.resetFile = function () {
            $scope.theFile = null;
        };

        // 선택 삭제
        $scope.deleteRows = function(){
            // 선택된 checkbox가 해당하는 tr을 소팅, 일괄 remove
            //$scope.checkedList.
        };

        // checkbox를 클릭할 때마다 해당상위 tr 요소들을 리스팅 해 둠
        $scope.checkedSorting = function(checkbox){
            $scope.checkedList.push(checkbox);

            console.log($scope.checkedList[0].item)
        };


        // file 불러오기 후 event
        $scope.fileOpenStart = function(files) {

            // 1. input file 요소의 값이 변경되면(ng-change 지시어는 input file 요소에서 동작하지 않으므로) pureJS onChange 이벤트를 사용하여 컨트롤러 함수호출.
            // 1번의 방법이 작동 불가. ng 이벤트를 통해서만 양방향 바인딩이 이루어지므로

            // 2. left menu button 모두 활성화

            $scope.fileList = files; // 3. 원래의 파일명 리스트는 별도 저장해둠(원복기능)
            var cnt = 0;

            if (files.files) { /* IE10 이상 , 그 외 */
                var repeat = files.files.length;
            } else { //IE9 이하
                var repeat = 1;
            }
            ;
            for (var i = 0; i < repeat; i++) { //input file로 불러온 file 갯수만큼 루프
                var row = document.getElementById("fileListTable").tBodies[0].insertRow(); // tr 생성
                //noinspection JSAnnotator
                function setElement(el, cls) {
                    var td = row.insertCell();
                    var cell = td.appendChild(document.createElement(el));
                    cell.className = cls;
                    return cell;
                };
                var selector1 = setElement("input");
                selector1.setAttribute("type", "checkbox"); // type을 checkbox로 명시
                selector1.setAttribute("id", "checkbox" + cnt); // id값을 명시하는 이유 : checkbox의 id와 연결된 label의 for값 매칭 필.

                var selector2 = setElement("label", "oldName");
                var f_name = files.files[i].name /* 파일명 */, f_size = Math.ceil(input.files[i].size / 1024) + "kb"; // 파일 사이즈(소수점 올림)
                selector2.setAttribute("for", "checkbox" + cnt); // for값은 바로 전 td에 속한 checkbox의 id와 동일하게 명시함.
                selector2.addEventListener("contextmenu", function (e) {
                    rightClick(f_name, f_size); // Mouse right click Event ( 파일 명, 사이즈를 인자로 넘김)
                    e.preventDefault(); // 이벤트 버블링 해제
                });
                if (files.files) { //IE10 이상 , 그 외
                    selector2.innerHTML = input.files[i].name; //label text로 file명 삽입
                } else { //IE9 이하
                    selector2.innerHTML = fileNameList;
                }
                ;

                var selector3 = setElement("div", "newName");
                if (files.files) { //IE10 이상 , 그 외 label text로 file명 삽입
                    selector3.innerHTML = input.files[i].name;
                } else { //IE9 이하
                    selector3.innerHTML = fileNameList;
                }
                ;
                cnt++;
            }
            ;
        };
    }])
    // input file 요소 onChange 발생시 파일객체를 가져오는 directive 등록
    .directive('bindFile', [function () {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, el, attrs, ngModel) {
                el.bind('change', function (event) {
                    ngModel.$setViewValue(event.target.files);
                    console.log( event.target.files );
                    $scope.$apply();
                });

                $scope.$watch(function () {
                    return ngModel.$viewValue;
                }, function (value) {
                    if (!value) {
                        el.val("");
                    }
                });
            }
        };
    }]);







/* left menu */
// 현재 리스트에 파일이 없을 경우 왼쪽 메뉴 비활성화 - 부모 요소인 nav의 하위 button 태그들에 disabled 추가/제거
// app.controller('leftMenu', [ '$scope' , function( $scope ){
//         a();
//
// }]);

//
// /* content */
// app.controller('content', [ '$scope' , function( $scope ){
//
// }]);

