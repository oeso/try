function appendCreateEl(el, elName){
    return el.appendChild(document.createElement(elName));
};
function addCreateTxtNode(el, elName){
    return el.appendChild(document.createTextNode(elName));
};
function getElId(v){
    return document.getElementById(v);
};
function calendarSize( el, target ){
    target.style.height = el.offsetWidth + "px";
};

var floatBox, floatEl;

function firstObjectSetting(){
    floatBox = appendCreateEl(document.body, "div");
    floatBox.className = "float-memo";
    floatBox.id = "float";
};
function settingElement( el, elAttr, callAgainObjArray ){
    //인자 없이 호출되는 경우에 대한 방어코딩은 하지 않았음.
    //el : 부모 엘리먼트, elName : 생성해서 붙일 엘리먼트명, clsName, idName : 생성한 노트에 붙일 클래스네임, inText, attr, attrValue
    var element = appendCreateEl(el, elAttr.elName );
    for(var i in elAttr){
        switch(i){
            case "clsName" :
                element.className = elAttr.clsName;
                break;
            case "idName" :
                element.id = elAttr.idName;
                break;
            case "inText" :
                element.innerHTML = elAttr.inText;
                break;
            case "attr" :
                element.setAttribute(elAttr.attr, elAttr.attrValue);
                break;
            case "names" :
                element.name = elAttr.names;
                break;
        };
    };
    if(!callAgainObjArray){
    }else{
        for(var i=0;i<callAgainObjArray.length;i++){
            settingElement( element, callAgainObjArray[i]);
        };
    };
};
function memoBoxRemove(el){
    if(el){ el.remove(); };
};
//floating 요소를 만듦
function makeFloatMemo(dataMemo,dataTime,x,y){
    memoBoxRemove( getElId("float") );
    firstObjectSetting();
    settingElement(floatBox, {elName : "h2", clsName : "float-memo-title", inText : "Schedule"});
    settingElement(floatBox, {elName : "div", clsName : "float-content", idName :"floatLabel", inText : dataMemo, attr : "title", attrValue : "클릭하여 수정" });
    settingElement(floatBox, {elName : "span", inText : "time"});
    settingElement(floatBox, {elName : "span", clsName : "text-danger", inText : dataTime});
    settingElement(floatBox, {elName : "div", clsName : "text-right"},[{elName : "button", idName:"btnEdit", clsName : "btn btn-default", inText : "Edit"},{elName : "button", idName : "btnSave", clsName : "btn btn-primary", inText : "Save"}]);
    settingElement(floatBox, {elName : "button", clsName : "btn btn-default", idName : "memoClose"}, [{elName : "span", clsName : "glyphicon glyphicon-remove"}]);
    positionFloat( getElId("float") );

    floatEl = getElId("float");
    var floatLabel = getElId("floatLabel");

    getElId("memoClose").addEventListener("click",function(){
        closeFloatBox(window.floatEl);
    });
    getElId("floatLabel").addEventListener("dblclick",function(){
        editMemo(floatLabel);
    });
    getElId("btnEdit").addEventListener("click",function(){
        editMemo(floatLabel);
    });
    getElId("btnSave").addEventListener("click",function(){
        if( !floatLabel.children[0] ){
            return false;
        }else{
            var target = floatLabel.children[0];
        };
        saveMemo(floatLabel, target.value);
    });
};
function positionFloat(el){
    var maxWidth = document.body.offsetWidth-float.offsetWidth-5;
    x = x > (maxWidth) ? x = maxWidth : x;
    y = ( y-230 <= 0) ? 10 : y-230;
    el.style.left = x + "px";
    el.style.top = y + "px";
};
function closeFloatBox(el){
    el.remove();
};

function editMemo(el){
    var newInput = appendCreateEl(el,"input");
    newInput.setAttribute("type","text");
    newInput.focus();
    newInput.addEventListener("blur",function(){//fodusout 은 불가.
        saveMemo(el, newInput.value);
    });
};
function saveMemo(target, targetValue){
    targetValue =  (targetValue == "" || !targetValue) ? "No Schedule" : targetValue;
    target.innerHTML = targetValue;
};

var calendar = {
    //calendar.action() -> calendar DOM 구조 만드는 함수
    action : function(obj, date){
        this.calendarBox = getElId(obj.id);
        this.lang = (obj.lang != "en") ? ["일","월","화","수","목","금","토"] : ["sun","mon","tue","wed","thu","fri","sat"];
        (obj.sundayDir== "right")

        //컨트롤 버튼과 년도월 표시 엘리먼트 생성하여 뿌림. 사용자 옵션을 다양하게 받아 구현할 수 있도록 수정 예정.
        function buttonSetting(btnId, btnClass, btnChildClass){
            var ControlBtn = appendCreateEl(calendar.calendarBox,"button");
            var ControlBtnFont = appendCreateEl(ControlBtn,"span");
            ControlBtn.id = btnId;
            ControlBtn.className = btnClass;
            ControlBtnFont.className = btnChildClass;
        };
        buttonSetting("prevYear", "btn btn-primary first", "glyphicon glyphicon-backward");
        buttonSetting("prevMonth", "btn btn-info prev", "glyphicon glyphicon-chevron-left");
        buttonSetting("nextMonth", "btn btn-info next", "glyphicon glyphicon-chevron-right");
        buttonSetting("nextYear", "btn btn-primary last", "glyphicon glyphicon-forward");

        //캘린더 연도와 월 표시할 엘리먼트 생성, 클래스 붙임. 사용자 옵션을 다양하게 받아 구현할 수 있도로 따로 함수로 뺄 예정.
        this.calendarTitle = appendCreateEl(this.calendarBox,"div");
        this.calendarTitle.id = "yearTitle";
        this.calendarTitle.className = "date-title form-group form-inline text-center";

        var tableEl = document.createElement("table");//table 엘리먼트 생성

        this.calendarBox.appendChild(tableEl).setAttribute("id","tableElBox");//생성한 table을 div#calendar에 꽂아넣고 id="table" 부여함
        this.table = getElId("tableElBox");//this.table에 꽂아넣은 table 엘리먼트를 담음.
        this.table.className = "table table-bordered";//this.table의 클래스 붙임.
        var head = this.table.createTHead();//table에 <head>생성하여 변수 head에 담음
        var row =  head.insertRow();//<head>에 <tr> 생성하여 변수 row에 담음

        //thead의 tr에 th 생성하고 class 부여.
        for(var i=0; i<7; i++){
            var dayNameLink = appendCreateEl(row,"th");
            dayNameLink.className = "text-center";
            addCreateTxtNode(dayNameLink,this.lang[i]);//요일명은 임시
            //이 위치에 사용자 옵션선택에 따른 요일을 한글 또는 영문으로 뿌려주는 함수 호출 예정.
        };

        //table에 tbody 꽂아넣음
        appendCreateEl(this.table,"tbody");
        var tbodyEl= this.table.getElementsByTagName("tbody")[0];
        var tbodyRow = tbodyEl.insertRow();//tbody에 tr 생성

        //tbody의 tr에 td 생성.하면서 데이터도 같이 뿌림
        for(var i=0; i<7; i++){
            var cell = tbodyRow.insertCell();
            var cellDiv = appendCreateEl(cell,"div");//td > div
            var dayNumber = appendCreateEl(cellDiv, "a");// td > div > a.txt-day
            dayNumber.className = "txt-day";
            appendCreateEl(dayNumber,"span")

            //var schdule = appendCreateEl(cellDiv, "a");
            //schdule.className = "schedule label-primary";// td > div > a.schedule className
            //schdule.innerHTML = "Workshop 07:00"//임시 데이터

            //var weatherEl = appendCreateEl(cellDiv, "a");
            //data에 관련된 클래스가 뿌려져야 함 - 날씨 관련 클래스 : fa fa-sun-o : 맑음, fa fa-umbrella : 비옴, fa fa-snowflake-o : 눈, fa fa-cloud : 구름, fa fa-bolt : 천둥
            //weatherEl.className = "weather fa fa-umbrella";
            //var weatherIco = appendCreateEl(weatherEl, "span");
            //weatherIco.innerHTML = "clody"//임시. 실제 날씨에 관련된 data가 뿌려져야 함
            //weatherIco.className = "hide"
        };

        //해당 tr을 5번 복제하여 tbody에 꽂아넣음
        for(var i=0; i<5;i++){
            tbodyEl.appendChild(tbodyRow.cloneNode(true));
        };

        var todayBtn = appendCreateEl(this.calendarBox,"button");
        todayBtn.id = "today";
        todayBtn.className = "btn btn-danger btn-today";
        todayBtn.innerHTML = "TODAY";

        calendarSize(this.calendarBox, this.table);
        window.onresize = function(){
            calendarSize(calendar.calendarBox, calendar.table);
        };

        calendar.slider(obj, date);
    },
    //calendar.slider() -> calendar.action()에서 만든 DOM 구조에 날짜를 뿌려주는 함수
    slider : function(obj, date){
        var date = ( typeof date == "undefined" )? new Date() : date;
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.today = date.getDate();
        this.obj = obj;
        this.tdInDivEl = getElId("tableElBox").getElementsByTagName("div")
        this.calendarLink = getElId("tableElBox").getElementsByClassName("txt-day")

        var endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31)
        ,   start = date;
            start.setDate(1);//1일 세팅
        var startDayOfWeek = start.getDay()//1일의 요일
        ,   formStart = getElId("startDay")
        ,   formEnd = getElId("endDay")
        ,   title = getElId("yearTitle")

        //윤년계산 ( 서력 기원 연수가 4로 나누어 떨어지는 해는 윤년. 이 중 100으로 나 누어 떨어지는 해는 평년이며, 그 중 400으로 나누어 떨어지는 해는 윤년 )
        if( this.year % 4 === 0 ){
            if(this.year % 100 === 0){
                if(this.year % 400 === 0){
                    endDate[1] = 29;
                };
            }else{
                endDate[1] = 29;
            };
        };

        var lastDate;
        var end = date;
            lastDate = endDate[this.month];//이 달의 마지막날짜. (마지막날을 모아둔 배열에서 현재 달 넘버에 해당하는 값)
            end.setDate(lastDate);
        var endDayOfweek = end.getDay()//마지막날짜(31일 또는 30일)의 요일
        var days = 1, afterDay=1;

        //현재 달력에 뿌려질 이전 달 날짜 구하기
        var prevMonthDayList = []
        ,   monthCounts = calendar.month -1;

        if( monthCounts == -1){
            monthCounts = 11;
        }else if( monthCounts == 12 ){
            monthCounts = 0;
        }
        var prevEndDate = endDate[monthCounts];

        for( var i=0; i< startDayOfWeek; i++){
            prevMonthDayList.push(prevEndDate - i);
        };

        //현재 달력 각 날짜영역에 클래스 세팅 & 날짜 삽입
        for(var i=0; i<42; i++){
            var txtDays = this.tdInDivEl[i].getElementsByClassName("txt-day")[0];
            txtDays.children[0].innerHTML = "";
            if( i < startDayOfWeek ){//이전 달 날짜 뿌림
                txtDays.className = "txt-day before-month-day";
                txtDays.children[0].innerHTML = prevMonthDayList.pop();
            }else if( i >= lastDate+startDayOfWeek ){//다음달 날짜 뿌림
                txtDays.className = "txt-day after-month-day";
                txtDays.children[0].innerHTML = afterDay;
                afterDay++
            }else{//현재 달 날짜 뿌림
                addCreateTxtNode( txtDays.children[0], days );
                txtDays.classList.remove("before-month-day", "after-month-day");
                days++;
            };
        };

        //today 표시
        this.tdInDivEl[this.today-1].className="today";

        //선택날짜 색상변경
        for(var i=0, length=calendar.calendarLink.length; i<length;i++){
            calendar.calendarLink[i].onclick = function(){
                for(var k=0; k<length;k++){
                    calendar.calendarLink[k].classList.remove("on");
                };
                this.classList.add("on");
                formStart.value = thisCalendar.year+"-"+(thisCalendar.month+1)+"-"+this.innerHTML;//선택날짜 하단 폼에 입력. 이건 걍 innerHTML로 두겠음
            };
        };
        calendar.connectAction();
        calendar.buttonControl();
        calendar.settingYearAndMonth(obj.titleOption);
    },
    //사용자 옵션을 받아서 연,월 콤보박스(셀렉박스) 구현. 일단 사용자 옵션은 한 종류로 정해놓고 구현.
    settingYearAndMonth : function(titleOption){
        if( titleOption == "select" ){
            if( !getElId("selectYearEl") ){
                //select, option DOM이 없으면 새로 그림
                var selectOptionYear = settingElement(calendar.calendarTitle, {elName : "select", clsName : "form-control year-control", idName : "selectYearEl", names : "selectYearEl"})
                var selectOptionMonth = settingElement(calendar.calendarTitle, {elName : "select", clsName : "form-control month-control", idName : "selectMonthEl", names : "selectMonthEl"})

                var y = calendar.year - 10
                var selectYearCollection = new Array();
                for( var i=0;i<21;i++ ){
                    selectYearCollection.push(y);
                    y++;
                };
                var selectMonthCollection = new Array(1,2,3,4,5,6,7,8,9,10,11,12);
                for(var i=0;i<selectYearCollection.length; i++){
                    var setYear = appendCreateEl(getElId("selectYearEl"),"option")
                    setYear.text = selectYearCollection[i];
                    setYear.value = selectYearCollection[i];
                    if(selectYearCollection[i] == this.year){
                        setYear.selected = "selected"
                    }
                }
                for(var i=0;i<selectMonthCollection.length; i++){
                    var setMonth = appendCreateEl(getElId("selectMonthEl"), "option");
                    setMonth.text = selectMonthCollection[i];
                    setMonth.value = selectMonthCollection[i];
                    if(i == this.month){
                        setMonth.selected = "selected"
                    }
                }
            }else{
                //select, option DOM이 있으면 값만 바꿈
                getElId("selectYearEl").value = this.year;
                getElId("selectMonthEl").value = this.month+1;
            };
            //중앙상단 연,월 셀렉박스를 수동으로 변경할 경우 해당 함수 호출
            calendar.handOpratedSelecttingDate();
        }else{
            //사용자 옵션이 없을 경우 현재 연도와 월을 텍스트로 표시
            calendar.calendarTitle.innerHTML = this.year + " " + (this.month+1);//이건 걍 innerHTML로 두겠음
        }
    },
    //중앙상단 연,월 셀렉박스 수동 변경시 액션
    handOpratedSelecttingDate : function(){
        getElId("selectYearEl").onchange = function(){
            date = new Date(this.value, calendar.month, calendar.today )
            calendar.slider(calendar.obj, date);
        };
        getElId("selectMonthEl").onchange = function(){
            date = new Date(calendar.year, this.value-1, calendar.today )
            console.log(calendar.today)
            calendar.slider(calendar.obj, date);
        }
    },
    //양쪽상단 전년,전월,다음월,다음년 컨트롤 버튼
    buttonControl : function(){
        memoBoxRemove( getElId("float") );//memo 떠있으면 제거.
        var prevMonth = thisCalendar.month -1
        ,   nextMonth = thisCalendar.month +1
        ,   monthCount = thisCalendar.month;
        //이전다음 컨트롤 버튼 클릭 이벤트
        function controlBtnEvent(btnEl){
            btnEl.onclick = function(){
                switch( btnEl.id ){
                    case "prevYear" :
                        date = new Date(thisCalendar.year -1, thisCalendar.month, thisCalendar.today);
                        break;
                    case "prevMonth" :
                        monthCount--;
                        if( monthCount === -1){
                            thisCalendar.year = thisCalendar.year - 1;//이전달 클릭시 현재 달이 1월인경우 전년 12월로 세팅
                            prevMonth = 11;
                            monthCount = 11;
                        };
                        date = new Date(thisCalendar.year, prevMonth, thisCalendar.today);
                        break;
                    case "nextMonth" :
                        monthCount++;
                        if( monthCount === 12 ){
                            thisCalendar.year = thisCalendar.year + 1;//다음달 클릭시 현재 달이 12월인경우 내년 1월로 세팅
                            nextMonth = 0;
                            monthCount = 0;
                        };
                        date = new Date(thisCalendar.year, nextMonth, thisCalendar.today)
                        break;
                    case "nextYear" :
                        date = new Date(thisCalendar.year +1, thisCalendar.month, thisCalendar.today);
                        break;
                    case "today" :
                        date = new Date();
                };
                calendar.slider(calendar.obj, date)
            };
        };
        controlBtnEvent(getElId("prevYear"));
        controlBtnEvent(getElId("prevMonth"));
        controlBtnEvent(getElId("nextMonth"));
        controlBtnEvent(getElId("nextYear"));
        controlBtnEvent(getElId("today"));
    },
    //날짜 클릭시 메모창 팝업 또는 등록하기 페이지 이동
    connectAction : function(){
        for(var i=0, length=calendar.calendarLink.length; i<length;i++){
            calendar.calendarLink[i].addEventListener("click",floatMemoEvent);
            calendar.calendarLink[i].addEventListener("dblclick",function(){
                if( !this.href ){
                    window.open("schedule_regist.html","Regist Schedule","");
                }else{
                    window.open(this.href,"View Schedule","");
                }
            });
        };
    }
};

var thisCalendar =  calendar;
function floatMemoEvent(e){
    x = e.pageX;
    y = e.pageY;
    makeFloatMemo(datamemo, datatime, x, y );
};

var datamemo = "오후 2시에 리베라 호텔 7층 레드티 세미나 개최예정"; //임시 DATA
var datatime = "2016-07-6 18:00"; //임시 DATA







