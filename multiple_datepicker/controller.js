
var app = angular.module("app",['ngRoute']);
    app.config(['$httpProvider', function($httpProvider){
        console.log("이기 모꼬!!!? ", $httpProvider);
    }]);
    app.controller('view',['$scope','$rootScope','$timeout','$http', function($scope,$rootScope,$timeout,$http){
        /* api 리턴값은 가장 최근 월부터 나온다고 가정 */

        //현재 월
        $scope.year = new Date().getFullYear();
        $scope.targetDate = new Date(); // load start

        //좌우 카운터
        $scope.count = $scope.results ? $scope.results.length : 0;
        $scope.cnt = $scope.count-2;

        $scope.$watch('results', function(newValue, oldValue){
            $scope.count = newValue ? (newValue.length ? newValue.length : 0) : 0;
        },true);

        function apiMonthCheck(o, dir){
            $scope.results = o;
            $scope.cnt = o.length;

            /* 임시 data random 처리 */
            var exam = Math.floor(Math.random()*10);
            if( exam < 6 ){
                o[exam].month = String(exam+1);
            }
            /* //임시 data random 처리 */

            var n = o.length, arr = [];
            $scope.defaultValue = [];

            // 아니 가장 최근의 년도를 파라미터로 넘겨야 하는데 어케 앎? 일단 현재 연도로 호출하고 없으면 이전 연도로 자동호출되게 한다 이 말?

            for(var i=0; i< n; i++){
                $scope.defaultValue.push(Number($scope.results[i].month));
            };
            $scope.defaultValue.sort(function(a,b){ return a-b; });
console.log($scope.defaultValue);


            //누른버튼의 화살표 방향에 따라 표시할 날짜 정함
            if( dir === "next"){
                $scope.targetMonth = $scope.defaultValue[n-1];
            }else{
                $scope.targetMonth = $scope.defaultValue[0];
            }

            for(var i = 1; i< 13; i++){
                var obj = {};
                    obj.list = i;
                if( $scope.defaultValue.indexOf(i) > -1 ){
                    obj.month = i;
                }
                arr.push(obj);
            }
            $scope.month = arr;
        }

        function apiCall(year, dir){
            var req = {
                method : "GET",
                url : "http://oeso.com:3333/api.js",
                param : year
            }
            $http(req).then(function successCallback(response){
                try{
                    if( !response.data || !response.data.length ){
                        noData($scope.count);
                    }
                    apiMonthCheck(response.data, dir);
                }catch(e){
                    console.log(e);
                }
            }, function errorCallback(o){
                console.log("error!", o);
            })
        }
        apiCall(new Date().getFullYear(), "next");

        $scope.today = new Date();
        $scope.calanderOpen = function(){
            $scope.calanderStatus = $scope.calanderStatus ? false : true;
            $scope.dimmed = $scope.dimmed ? false : true;
            calanderSet();
        }

        function noData(count){
            if(count <= 0){
                alert("이전 데이터 없음");
            }else{
                alert("다음 데이터 없음");
            }
        }

        $scope.setDate = function(dir){

            if( dir === "prev" ){
                $scope.cnt--;
                if( $scope.cnt === $scope.count ){
                    $scope.year--;
                    apiCall($scope.year);
                }
            }else if( dir === "next" ){
                $scope.cnt++;
                if( $scope.cnt === $scope.count ){
                    $scope.year++;
                    apiCall($scope.year);
                }
            }
            $scope.targetMonth = $scope.defaultValue[$scope.cnt];
            console.log($scope.defaultValue[$scope.cnt]);
            console.log("cnt", $scope.cnt);
            console.log("count", $scope.count);
            console.log("year", $scope.year);

        }
        var calanderSet = function(){
            api.getDrivingPracticeDateList(function(err, o){
                $scope.highlightDays = [];
                    var cnt = o.results.count;
                    $scope.month = moment($scope.date);
                    for(var i=0;i<cnt;i++){
                        if($scope.today == o.results.entitys[i].statDate){
                            $scope.highlightDays.push({
                                date:moment(o.results.entitys[i].statDate).date($filter('date')($scope.today,'d')),
                                css:'cell-select',
                                selectable: true,
                                title:"date_"+i
                            })   	        	   	        					
                        }else{
                            $scope.highlightDays.push({
                                date:moment(o.results.entitys[i].statDate).date($filter('date')(o.results.entitys[i].statDate,'d')),
                                css:'cell-selected',
                                selectable: true,
                                title:"date_"+i
                            });   	        					
                        }
                    }
            },{
                size:0,
                yearMonth:$filter('date')(new Date($scope.date),'yyyy-MM')
            });
        }

        
        var clearData = function(){

        }
        
        var loadData = function(){

        };
        
        // function getFindPracticeDate(){
        //     $scope.preDate = o.results.entity.preDate==undefined?'':o.results.entity.preDate;
        //     $scope.today = o.results.entity.today;
        //     $scope.nextDate = o.results.entity.nextDate==undefined?'':o.results.entity.nextDate;
        // }
    }]);

    app.directive('monthPicker', monthPicker);