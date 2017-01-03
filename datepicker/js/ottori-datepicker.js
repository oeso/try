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
function floating(data){
    var floatBox = appendCreateEl(document.body, "div");
        floatBox.className = "float-memo";
        floatBox.id = "float";

    var floatTitle = appendCreateEl( floatBox ,"h2");
        floatTitle.className = "float-memo-title";//플로팅 레이어 제목
        floatTitle.innerHTML = "Schedule"

    var contents = appendCreateEl( floatBox ,"div")
        contents.className = "float-content";
        contents.innerHTML = data;//메모한 내용

    var floatBoxContent = appendCreateEl( floatBox ,"div");
        floatBoxContent.className = "text-right";//버튼 박스

    var floatBoxButton1 = appendCreateEl(floatBoxContent, "button");
        floatBoxButton1.className = "btn btn-default" //
        floatBoxButton1.innerHTML = "Edit"

    var floatBoxButton2 = appendCreateEl(floatBoxContent, "button");
        floatBoxButton2.className = "btn btn-primary" //
        floatBoxButton2.innerHTML = "Save"

    var floatBoxClose = appendCreateEl( floatBox ,"button");
        floatBoxClose.className = "btn btn-default";
        floatBoxClose.id = "float-close"
    var floatBoxCloseText = appendCreateEl( floatBoxClose ,"span");
        floatBoxCloseText.className = "glyphicon glyphicon-remove";
};



//본질이 무엇인지 파악하면서 짤 것.
var calendar = {
    //calendar DOM 구조 만드는 함수
    action : function(obj, date){
        this.calendarBox = getElId(obj.id);
        this.lang = (obj.lang != "en") ? ["일","월","화","수","목","금","토"] : ["sun","mon","tue","wed","thu","fri","sat"];

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
        var calendarTitle = appendCreateEl(this.calendarBox,"h2");
        calendarTitle.className = "text-center";
        calendarTitle.id = "yearTitle";

        var table = document.createElement("table");//table 엘리먼트 생성

        this.calendarBox.appendChild(table).setAttribute("id","table");//생성한 table을 div#calendar에 꽂아넣고 id="table" 부여함
        this.table = getElId("table");//this.table에 꽂아넣은 table 엘리먼트를 담음.
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

        //tbody의 tr에 td 생성
        for(var i=0; i<7; i++){
            var cell = tbodyRow.insertCell();
            appendCreateEl(cell,"a");
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
    //만든 DOM 구조에 날짜를 뿌려주는 함수
    slider : function(obj, date){

        var date = ( typeof date == "undefined" )? new Date() : date;
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.today = date.getDate();
            this.obj = obj;

        var calendarTd = this.calendarBox.getElementsByTagName("td")
        ,   calendarLink = this.calendarBox.getElementsByTagName("a")
        ,   endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31)
        ,   lastDate//이 달의 마지막날짜. (마지막날을 모아둔 배열에서 현재 달 넘버에 해당하는 값)
        ,   start = date;
            start.setDate(1);//1일 세팅

        var startDayOfWeek = start.getDay()//1일의 요일
        ,   formStart = getElId("startDay")
        ,   formEnd = getElId("endDay")
        ,   title = getElId("yearTitle");

        var prevYearBtn = getElId("prevYear")
        ,   prevMonthBtn = getElId("prevMonth")
        ,   nextMonthBtn = getElId("nextMonth")
        ,   nextYearBtn = getElId("nextYear")
        ,   todayLink = getElId("today")
        ,   thisCalendar = this
        ,   monthCount = this.month
        ,   prevMonth = thisCalendar.month -1
        ,   nextMonth = thisCalendar.month +1

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
        lastDate = endDate[this.month];

        var days = 1;

        //td에 a 엘리먼트 세팅 날짜 삽입
        for(var i=0; i<42; i++){
            if( i < startDayOfWeek || i >= lastDate + startDayOfWeek ){
                calendarTd[i].innerHTML = "";
            }else{
                if( !calendarTd[i].hasChildNodes() ){
                    addCreateTxtNode( appendCreateEl(calendarTd[i],"a"), days );
                }else{
                    var linkText = calendarTd[i].children[0].childNodes[0];//td > a > Text 노드.
                    calendarTd[i].children[0].classList.remove("today");
                    if( linkText != null ){
                        linkText.remove();//Text 노드 있으면 제거 후 아랫줄에서 days(날짜)를 새로 뿌려줌.
                    };
                    addCreateTxtNode( calendarTd[i].children[0], days );
                };
                days++;
            };
        };

        //today 표시
        calendarLink[this.today-1].className="today";

        //선택날짜 색상변경
        for(var i=0, length=calendarLink.length; i<length;i++){
            calendarLink[i].onclick = function(){
                for(var k=0; k<length;k++){
                    calendarLink[k].classList.remove("on");
                };
                this.classList.add("on");
                //선택날짜 하단 폼에 입력
                formStart.value = thisCalendar.year+"-"+(thisCalendar.month+1)+"-"+this.innerHTML;//이건 걍 innerHTML로 두겠음
            };
        };

        //현재 연도와 월 표시
        title.innerHTML = this.year + " " + (this.month+1);//이건 걍 innerHTML로 두겠음

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
                calendar.slider(obj, date)
            };
        };
        function call(ControlButtonObjectName){
            for(var i=0;i<arguments.length;i++){
                controlBtnEvent(arguments[i]);
            };
        };
        call( prevYearBtn, prevMonthBtn, nextMonthBtn, nextYearBtn, todayLink);



        floating("오후 2시에 레드티 미팅");
    }
};