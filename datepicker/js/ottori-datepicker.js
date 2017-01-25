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

//자식요소를 모두 삭제하는 함수
function removeChildAll(el){
  if(el){
    while( el.hasChildNodes() ){
        el.removeChild(el.lastChild)
    }
  }
}

var floatBox, floatEl;

//메모박스 세팅
function firstObjectSetting(){
    floatBox = appendCreateEl(document.body, "div");
    floatBox.className = "float-memo";
    floatBox.id = "float";
};
function settingElement( el, elAttr, callAgainObjArray ){
    //인자 없이 호출되는 경우에 대한 방어코딩은 하지 않았습니다.
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
  if(el){
    var removeItem = el;
    el.parentNode.removeChild(removeItem)
  };
};

//floating 요소를 만듦
function makeFloatMemo(dataMemo,x,y,targetA,target){
    memoBoxRemove( getElId("float") );
    firstObjectSetting();
    settingElement(floatBox, {elName : "h2", clsName : "float-memo-title", inText : "Schedule"});
    settingElement(floatBox, {elName : "div", clsName : "float-content", idName :"floatLabel", inText : dataMemo, attr : "title", attrValue : "클릭하여 수정" });
    settingElement(floatBox, {elName : "div", clsName : "text-right"},[{elName : "button", idName:"btnEdit", clsName : "btn btn-default", inText : "Edit"},{elName : "button", idName : "btnSave", clsName : "btn btn-primary", inText : "Save"}]);
    settingElement(floatBox, {elName : "button", clsName : "btn btn-default", idName : "memoClose"}, [{elName : "span", clsName : "glyphicon glyphicon-remove"}]);
    positionFloat( getElId("float") );

    floatEl = getElId("float");
    var floatLabel = getElId("floatLabel");

    getElId("memoClose").addEventListener("click",function(){
        memoBoxRemove(getElId("float"));
    });
    getElId("floatLabel").addEventListener("click",function(){
        editMemo(floatLabel,targetA);
    });
    getElId("btnEdit").addEventListener("click",function(){
        editMemo(floatLabel,targetA);
    });
    getElId("btnSave").addEventListener("click",function(){
        //target : 클릭한 요소
        if( target.classList.contains("schedule")){//기존 스케줄 수정
          calendar.makeScheduleEditTag(target, targetA, calendar.memo)
          calendar.saveMemoEditForm(target, targetA, calendar.memo)
        }else{//새 스케줄 등록
          calendar.makeScheduleTag( targetA, calendar.memo);
          calendar.saveMemoForm( targetA, calendar.memo)
        }
    });
    if(dataMemo == ""){
        editMemo(floatLabel,targetA);
    }
};
function positionFloat(el){
    var maxWidth = document.body.offsetWidth-float.offsetWidth-5;
    x = x > (maxWidth) ? x = maxWidth : x;
    y = ( y-230 <= 0) ? 10 : y-230;
    el.style.left = x + "px";
    el.style.top = y + "px";
};
function editMemo(el,targetA){
    var newInput = appendCreateEl(el,"input");
    newInput.setAttribute("type","text");
    newInput.focus();
    newInput.addEventListener("blur",function(){//focusout 은 불가.
        calendar.memo = newInput.value;
        saveMemo(el, newInput.value, targetA);
    });
};
var memoTxt = {
  cnt : 0
};
function saveMemo(target, targetValue){
    targetValue =  (targetValue == "" || !targetValue) ? "No Schedule" : targetValue;
    target.innerHTML = targetValue;
};
var calendar = {
    //calendar.init() -> calendar DOM 구조 만드는 함수
    init : function(obj, date){
        this.calendarBox = getElId(obj.id);

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

        //thead의 th 요일명 세팅
        calendar.theadWriting(obj)

        //thead의 tr > th 생성하고 class 부여
        for(var i=0; i<7; i++){
            var dayNameLink = appendCreateEl(row,"th");
            dayNameLink.className = "text-center";
            addCreateTxtNode(dayNameLink,this.lang[i]);
        };

        //table에 tbody 꽂아넣음
        appendCreateEl(this.table,"tbody");
        var tbodyEl= this.table.getElementsByTagName("tbody")[0];
        var tbodyRow = tbodyEl.insertRow();//tbody에 tr 생성

        //tbody의 tr에 td > div > a > span 생성
        for(var i=0; i<7; i++){
            var cell = tbodyRow.insertCell();
            var cellDiv = appendCreateEl(cell,"div");//td > div
            var dayNumber = appendCreateEl(cellDiv, "a");// td > div > a.txt-day
            cellDiv.className = "link-wrap";
            dayNumber.className = "txt-day";
            appendCreateEl(dayNumber,"span");
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
        calendar.writingDate(obj, date);
    },
    //data AJAX로 가져오기
    dataJson : function(){
        if(window.XMLHttpRequest){
            var jsonhttp =  new XMLHttpRequest();
            jsonhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status ==  200){
                    this.userData = JSON.parse(this.responseText);
                    calendar.dataJsonBind(this.userData)
                }
            };
            jsonhttp.open("GET", "https://oeso.github.io/try/datepicker/data/events.json", true);
            jsonhttp.send();
        }
    },
    //달 이동시 AJAX로 가져온 일정 + 수정/삭제한 일정 화면에서 제거
    deleteDataJsonBind : function(){//해당 jsonData obj 내 약속된 프로퍼티명을 가져와서 for돌려서 뿌림.
        if( !document.getElementsByClassName("schedule") ){
        }else{
            for(var i=0; i<this.schedule.length;i++){
                this.schedule[i].parentNode.id = "removeItem" + i;
                var parentId = getElId("removeItem" + i);
                var removetems = parentId.getElementsByClassName("schedule")[0];
                parentId.removeChild( removetems );
                parentId.removeAttribute("id");
            };
        };
    },
    //AJAX로 가져온 data 뿌리기
    dataJsonBind : function(jsonData){//해당 jsonData obj 내 약속된 프로퍼티명을 가져와서 for돌려서 뿌림.
        this.schedule = [];
        for(var k=0; k<jsonData.length;k++){
            //var obj = JSON.stringify(jsonData[k].start)
            var obj = jsonData[k].start;
            var jonId = jsonData[k].id;
            for(var i=0; i<this.tdInDivEl.length;i++){
                var n = 1;
                var day = this.tdInDivEl[i].children[0].getAttribute("data-date");
                if( obj == day ){
                    this.tdInDivEl[i].setAttribute("key",n)
                    calendar.makeScheduleTag(this.tdInDivEl[i], jsonData[k].title, jonId);
                    n++;
                }
            };
        };
    },
    //SAVE 클릭시 스케줄 등록( 최초 로드시, 신규 등록시)
    makeScheduleTag : function(el, data, jsonId){
        if( data == "" ){ return false };

        if( el.getElementsByClassName("schedule").length >= 3 ){
          var omitTag = appendCreateEl(el, "a");
          omitTag.className = "omit";
          omitTag.innerHTML = "more";
          omitTag.href = "http://www.google.com"//임시
          omitTag.setAttribute("target","_blank")
        }else{
            var schedule = appendCreateEl(el, "a");
            schedule.className = "schedule label-primary";
            schedule.innerHTML = data;//JSON의 title 값 또는 팝업 메모에서 작성한 값
            if(jsonId){
            schedule.id = jsonId;//JSON에 있는 id 값
            }else{
            schedule.id = "newMemo" + (memoTxt.cnt);//추가로 만든 id 값
            };
            schedule.addEventListener("click",function(e){
                floatMemoEditEvent(e, data, this.parentNode, this);
            });
        }
        this.schedule.push(schedule)
    },
    //SAVE 클릭시 스케쥴 수정
    makeScheduleEditTag : function(el, elParent, data){
        if( data == "" ){ return false };
        el.innerHTML = data;
        el.id = "newMemo" + (memoTxt.cnt);//추가로 만든 id 값
        this.schedule.push(schedule)
        el.addEventListener("click",function(e){
            floatMemoEditEvent(e, data, this.parentNode, this);
        });
    },
    //SAVE 클릭하여 등록된 스케쥴을 form에 저장하여 넘김
    saveMemoForm : function(targetA, memo ){
      var txtDay = targetA.getElementsByClassName("txt-day")[0];
      var dataDate = txtDay.getAttribute("data-date");
      var newput = appendCreateEl(getElId("saveActionForm"), "input");
      var ids = "newMemo" + (memoTxt.cnt);
      calendar.newInputMake( newput, "hidden", ids , memo, dataDate ); //FORM에 등록 사항 추가
      memoTxt.cnt++;
      getElId("saveActionForm").onsubmit();
      calendar.result();//전송결과 가져오는 함수
      memoBoxRemove(getElId("float"));
    },
    //SAVE 클릭하여 수정된 스케쥴을 form에 저장하여 넘김
    saveMemoEditForm : function(target, targetA, memo ){
      var dataDate = target.getAttribute("data-date");
      var inputExist = document.getElementsByName(target.id)[0];
      var newput = inputExist ? inputExist : appendCreateEl(getElId("saveActionForm"), "input");
      calendar.newInputMake( newput, "hidden", target.id, memo, dataDate ); //FORM에 변경 사항 반영
      target.innerHTML = memo;

      if( memo == "" ){
        targetA.removeChild(getElId(target.id));//빈 내용으로 수정시 해당하는 스케쥴 삭제
        for( var i =0; i<this.schedule.length;i++){//스케쥴리스트 중 해당 스케줄 삭제
          if(this.schedule[i].id == target.id){
            this.schedule.splice(i,1)
          }
        }
      };
      getElId("saveActionForm").onsubmit();
      calendar.result();//전송결과 가져오는 함수
      memoBoxRemove(getElId("float"));
    },
    result : function(){//전송결과 가져오는 함수
    //   ajax 로 전송결과 (Y 혹은 N 값 - 이 값은 Y/N 또는 1/0으로 할 지 협의) 요청
    //   if(window.XMLHttpRequest){
    //       var anwserHttp =  new XMLHttpRequest();
    //       anwserHttp.onreadystatechange = function(){
    //           if(this.readyState == 4 && this.status ==  200){
                    //성공
    //           }else{
    //             alert("스케줄 등록이 실패하였습니다.");
    //           };
    //       };
    //       anwserHttp.open("GET", "전송결과가 담긴 URL", true);
    //       anwserHttp.send();
    //   }
    },
    //form 세팅
    newInputMake : function(el,type,name,value,dataDate){
      el.setAttribute("type", type )
      el.setAttribute("name", name )
      el.setAttribute("value", value )
      el.setAttribute("data-date", dataDate)
    },
    //요일명 세팅
    theadWriting : function(obj){
        if(obj.direction == "right"){
            this.lang = ["mon","tue","wed","thu","fri","sat","sun"];
            this.calendarBox.classList.add("right");
        }else{
            this.lang = ["sun","mon","tue","wed","thu","fri","sat"];
        };
    },
    //calendar.writingDate() -> calendar.action()에서 만든 DOM 구조에 날짜를 뿌려주는 함수
    writingDate : function(obj, date){
        var date = ( typeof date == "undefined" )? new Date() : date;
        this.date = date;
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.today = date.getDate();
        this.obj = obj;
        this.tdInDivEl = getElId("tableElBox").getElementsByClassName("link-wrap")
        this.calendarLink = getElId("tableElBox").getElementsByClassName("txt-day")
        this.calendarTag = getElId("tableElBox").getElementsByClassName("schedule")

        var endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31)
        ,   start = date;
            start.setDate(1);//1일 세팅
        var startDayOfWeek = start.getDay()//1일의 요일
        ,   formStart = getElId("startDay")
        ,   formEnd = getElId("endDay")
        ,   title = getElId("yearTitle");

        if(obj.direction == "right"){//일요일이 우측에 오게 뿌리기 위하여 1일을 앞으로 한칸 당김
            startDayOfWeek = (startDayOfWeek == 0 ) ? 6 : startDayOfWeek-1
        };
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
        var prevMonthDayList = [], monthCounts = calendar.month -1;

        if( monthCounts == -1){
            monthCounts = 11;
        }else if( monthCounts == 12 ){
            monthCounts = 0;
        };
        var prevEndDate = endDate[monthCounts];

        for( var i=0; i< startDayOfWeek; i++){
            prevMonthDayList.push(prevEndDate - i);
        };

        var markYear = this.year
        var dateValue;
        //현재 달력 각 날짜영역에 클래스 세팅 & 날짜 삽입
        for(var i=0; i<42; i++){
            var txtDays = this.tdInDivEl[i].getElementsByClassName("txt-day")[0];
            txtDays.children[0].innerHTML = "";
            this.tdInDivEl[i].classList.remove("today");

            if( i < startDayOfWeek ){//이전 달 날짜 뿌림
                txtDays.className = "txt-day before-month-day";
                txtDays.children[0].innerHTML = prevMonthDayList.pop();
                if( this.month == 0 ){
                    var markYear = this.year - 1
                    var markMonth = 12
                }else{
                    var markMonth = this.month;
                };
            }else if( i >= lastDate+startDayOfWeek ){//다음달 날짜 뿌림
                txtDays.className = "txt-day after-month-day";
                txtDays.children[0].innerHTML = afterDay;
                afterDay++;

                if( this.month == 11 ){
                    var markYear = this.year +1
                    var markMonth = 1
                }else{
                    var markMonth = this.month+2
                };
            }else{//현재 달 날짜 뿌림
                addCreateTxtNode( txtDays.children[0], days );
                txtDays.classList.remove("before-month-day", "after-month-day");
                if( days == this.today ){
                    this.tdInDivEl[i].classList.add("today");
                }
                days++;
                var markYear = this.year
                var markMonth = this.month+1;
            };
            dayNumber = txtDays.children[0].innerHTML;

            markMonth = String(markMonth);
            markMonth = (markMonth.length == 1 ) ? ("0"+markMonth) : markMonth;
            dayNumber = (dayNumber.length == 1) ? ("0"+dayNumber) : dayNumber;
            dateValue = markYear+"-"+markMonth+"-"+ dayNumber;
            txtDays.setAttribute("data-date", dateValue);
        };

        //선택날짜 색상변경
        for(var i=0, length=calendar.calendarLink.length; i<length;i++){
            calendar.calendarLink[i].onclick = function(){
                for(var k=0; k<length;k++){
                    calendar.calendarLink[k].classList.remove("on");
                };
                this.classList.add("on");
                formStart.value = this.getAttribute("data-date");//선택날짜 하단 폼에 입력
            };

        };
        calendar.connectAction();
        calendar.buttonControl();
        calendar.settingYearAndMonth(obj.titleOption);
        calendar.dataJson();
    },
    //사용자 옵션을 받아서 연,월 콤보박스(셀렉박스) 구현
    settingYearAndMonth : function(titleOption){
        if( titleOption == "select" ){
            if( !getElId("selectYearEl") ){
                //select, option DOM이 없으면 새로 그림
                var selectOptionYear = settingElement(calendar.calendarTitle, {elName : "select", clsName : "form-control year-control", idName : "selectYearEl", names : "selectYearEl"})
                var selectOptionMonth = settingElement(calendar.calendarTitle, {elName : "select", clsName : "form-control month-control", idName : "selectMonthEl", names : "selectMonthEl"})

            }else{
                //select, option DOM이 있으면 값만 바꿈
                getElId("selectYearEl").value = this.year;
                getElId("selectMonthEl").value = this.month+1;
            };
            //중앙상단 연,월 셀렉박스를 수동으로 변경할 경우 해당 함수 호출
            calendar.selectingDate();
            calendar.selectCalculate();
        }else{
            //사용자 옵션이 없을 경우 현재 연도와 월을 텍스트로 표시
            calendar.calendarTitle.innerHTML = this.year + " " + (this.month+1);//이건 걍 innerHTML로 두겠음
        }
    },
    //셀렉박스 내용 계산하여 뿌림
    selectCalculate : function(){
        var y = calendar.year - 10;
        this.yearSelect = new Array();
        for( var i=0;i<21;i++ ){
            this.yearSelect[i] = y
            y++;
        };
        this.monthSelect = new Array(1,2,3,4,5,6,7,8,9,10,11,12);
        if(getElId("selectYearEl").options.length == 0){
            for(var i=0;i<this.yearSelect.length; i++){
                var setYear = appendCreateEl(getElId("selectYearEl"),"option");
                setYear.text = this.yearSelect[i];
                setYear.value = this.yearSelect[i];
                if(this.yearSelect[i] == this.year){
                    setYear.selected = "selected"
                };
            };
        }else{
            var setYear = getElId("selectYearEl").options;
            for(var i=0;i<setYear.length; i++){
                setYear[i].text = this.yearSelect[i];
                setYear[i].value = this.yearSelect[i];
                if(this.yearSelect[i] == this.year){
                    setYear[i].selected = "selected"
                };
            };
        };
        if(getElId("selectMonthEl").options.length == 0){
            for(var i=0;i<this.monthSelect.length; i++){
                var setMonth = appendCreateEl(getElId("selectMonthEl"), "option");
                setMonth.text = this.monthSelect[i];
                setMonth.value = this.monthSelect[i];
                if(i == this.month){
                    setMonth.selected = "selected"
                }
            };
        };
    },
    //중앙상단 연,월 셀렉박스 수동 변경시 액션
    selectingDate : function(){
        getElId("selectYearEl").onchange = function(){
            var date = new Date(this.value, calendar.month, calendar.today );
            calendar.writingDate(calendar.obj, date);
            calendar.deleteDataJsonBind();
        };
        getElId("selectMonthEl").onchange = function(){
            var date = new Date(calendar.year, this.value-1, calendar.today );
            calendar.writingDate(calendar.obj, date);
            calendar.deleteDataJsonBind();
        };
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
              removeChildAll(getElId("saveActionForm"));
              calendar.deleteDataJsonBind();
                switch( btnEl.id ){
                    case "prevYear" :
                        var date = new Date(thisCalendar.year -1, thisCalendar.month, thisCalendar.today);
                        break;
                    case "prevMonth" :
                        monthCount--;
                        if( monthCount === -1){
                            thisCalendar.year = thisCalendar.year - 1;//이전달 클릭시 현재 달이 1월인경우 전년 12월로 세팅
                            prevMonth = 11;
                            monthCount = 11;
                        };
                        var date = new Date(thisCalendar.year, prevMonth, thisCalendar.today);
                        break;
                    case "nextMonth" :
                        monthCount++;
                        if( monthCount === 12 ){
                            thisCalendar.year = thisCalendar.year + 1;//다음달 클릭시 현재 달이 12월인경우 내년 1월로 세팅
                            nextMonth = 0;
                            monthCount = 0;
                        };
                        var date = new Date(thisCalendar.year, nextMonth, thisCalendar.today)
                        break;
                    case "nextYear" :
                        var date = new Date(thisCalendar.year +1, thisCalendar.month, thisCalendar.today);
                        break;
                    case "today" :
                        var date = new Date();
                };
                calendar.writingDate(calendar.obj, date)
            };
        };
        controlBtnEvent(getElId("prevYear"));
        controlBtnEvent(getElId("prevMonth"));
        controlBtnEvent(getElId("nextMonth"));
        controlBtnEvent(getElId("nextYear"));
        controlBtnEvent(getElId("today"));
    },
    //날짜 클릭시 새 메모창 팝업 또는 등록하기 페이지 이동
    connectAction : function(){
        //날짜가 아닌 곳 찍으면 메모 닫힘
        document.body.addEventListener("click",function(e){
          ectClick(e);
        }, true );
        function ectClick(e){
            var event = e || window.event;
            var target = event.target;
            if( floatEl && parents(target , "id", "tableElBox").length == 0 ){
                if(target.id == "float" || parents(target , "id", "float").length > 0){
                }else{
                  memoBoxRemove(getElId("float"));
                };
            };
        };
        for(var i=0, length=calendar.calendarLink.length; i<length;i++){
            calendar.calendarLink[i].addEventListener("click",function(e){
                dataTxt ="";
                floatMemoEvent(e, dataTxt, this.parentNode, this);
            });
            calendar.calendarLink[i].addEventListener("dblclick",function(){
                if( !this.href ){
                    window.open("schedule_regist.html","Regist Schedule","");
                }else{
                    window.open(this.href,"View Schedule","");
                };
            });
        };
    }
};

var thisCalendar = calendar;
function floatMemoEvent(e, dataTxt, targetA, target){
    x = e.pageX;
    y = e.pageY;
    makeFloatMemo(dataTxt, x, y, targetA, target);
};
function floatMemoEditEvent(e, dataTxt, targetA, target){
    x = e.pageX;
    y = e.pageY;
    makeFloatMemo(dataTxt, x, y, targetA, target);
};
function search( el,elAttr,elAtrName,orderNode ) {
	var matched = [];
	while ( (el = el[orderNode]) && el.nodeType !== 9 ) {
		if ( el.nodeType === 1 ) {
        if( elAttr == "class" ){
          if( el.classList.contains( elAtrName ) ){
            matched.push(el);
          };
        }else{
          var atrname = el.getAttribute(elAttr);
          if(!atrname){
          }else{
            if( atrname == elAtrName ){
              matched.push(el);
            };
          };
      };
		}
	};
	return matched;
};
function parents(el,elAttr,elAtrName){//element 의 attribute 속성이  targetAtrName인 부모 Element를 리턴하는 함수
    return search(el,elAttr,elAtrName,"parentNode")
};
