//본질이 무엇인지 파악하면서 짤 것.
var calendar = {
    getElId : function(v){
        return document.getElementById(v);
    },
    //calendar DOM 구조 만드는 함수
    action : function(obj, date){
        this.calendarBox = calendar.getElId(obj.id);
        //컨트롤 버튼과 년도월 표시 엘리먼트 생성하여 뿌림. 사용자 옵션을 다양하게 받아 구현할 수 있도로 따로 함수로 뺄 예정.
        for(var i=0;i<4;i++){
            var calendarControlBtn = this.calendarBox.appendChild(document.createElement("button"));
            var calendarControlBtnFont = calendarControlBtn.appendChild(document.createElement("span"));
            calendarControlBtn.className = "btn btn-primary";

            if(i == 0){
                calendarControlBtn.id = "prevYear";
                calendarControlBtn.className = "btn btn-primary first";
                calendarControlBtnFont.className = "glyphicon glyphicon-backward";
            }else if( i==1 ){
                calendarControlBtn.id = "prevMonth";
                calendarControlBtn.className = "btn btn-info prev";
                calendarControlBtnFont.className = "glyphicon glyphicon-chevron-left";
            }else if( i==2 ){
                calendarControlBtn.id = "nextMonth";
                calendarControlBtn.className = "btn btn-info next";
                calendarControlBtnFont.className = "glyphicon glyphicon-chevron-right";
            }else if( i==3 ){
                calendarControlBtn.id = "nextYear";
                calendarControlBtn.className = "btn btn-primary last";
                calendarControlBtnFont.className = "glyphicon glyphicon-forward";
            };
        };


        //캘린더 연도와 월 표시할 엘리먼트 생성, 클래스 붙임. 사용자 옵션을 다양하게 받아 구현할 수 있도로 따로 함수로 뺄 예정.
        var calendarTitle = this.calendarBox.appendChild(document.createElement("h2"));
        calendarTitle.className = "text-center";
        calendarTitle.id = "yearTitle";


        var table = document.createElement("table");//table 엘리먼트 생성

        this.calendarBox.appendChild(table).setAttribute("id","table");//생성한 table을 div#calendar에 꽂아넣고 id="table" 부여함
        this.table = calendar.getElId("table");//this.table에 꽂아넣은 table 엘리먼트를 담음.
        this.table.className = "table table-bordered";//this.table의 클래스 붙임.
        var head = this.table.createTHead();//table에 <head>생성하여 변수 head에 담음
        var row =  head.insertRow();//<head>에 <tr> 생성하여 변수 row에 담음

        //thead의 tr에 th 생성하고 class 부여.
        for(var i=0; i<7; i++){
            var dayNameLink = row.appendChild(document.createElement("th"));
            dayNameLink.className = "text-center";
            dayNameLink.appendChild(document.createTextNode("day"));//임시.
            //이 위치에 사용자 옵션선택에 따른 요일을 한글 또는 영문으로 뿌려주는 함수 호출 예정.
        };


        //table에 tbody 꽂아넣음
        this.table.appendChild(document.createElement("tbody"));
        var tbodyEl= this.table.getElementsByTagName("tbody")[0];
        var tbodyRow = tbodyEl.insertRow();//tbody에 tr 생성

        //tbody의 tr에 td 생성
        for(var i=0; i<7; i++){
            var cell = tbodyRow.insertCell();
            cell.appendChild(document.createElement("a"));
        };

        //tr에 id 값 부여함
        tbodyRow.setAttribute("id","tableRow")//attribute 를 id가 아닌 class 또는 name 등 id가 아닌 속성을 지정했을 때는 바로 아래 클론이 되지 않는다. 왜 글치?
        //var cloneRow = tableRow.cloneNode(true);//cloneNode의 parameter type은 boolean. default는 false. (true 사용시 속성은 물론 그 자손들까지 복제함.)

        //해당 tr을 5번 복제하여 tbody에 꽂아넣음. id도 같이 복사됨 흑흑. id를 안넣어주면 cloneNode()가 안됨 흑흑. 왜 글치?
        for(var i=0; i<5;i++){
            tbodyEl.appendChild(tableRow.cloneNode(true));
        };


        var todayBtn = this.calendarBox.appendChild(document.createElement("button"));
        todayBtn.id = "today";
        todayBtn.className = "btn btn-danger btn-today";
        todayBtn.innerHTML = "TODAY";

        calendar.slider(obj, date);

        console.log(           todayBtn.nodeName          ) //콘솔 찍어봐 ~



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
        ,   formStart = calendar.getElId("startDay")
        ,   formEnd = calendar.getElId("endDay")
        ,   title = calendar.getElId("yearTitle");

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

        //td 빈값 또는 a 엘리먼트 세팅
        for(var i=0; i<42; i++){
            if( i < startDayOfWeek || i >= lastDate + startDayOfWeek ){
                calendarTd[i].innerHTML = "";
            }else{
                calendarTd[i].innerHTML = "<a href='#none'></a>";
            }
        };

        //삽입한 a에 날짜 삽입
        for(var i=1;i<=lastDate;i++){
            calendarLink[i-1].innerHTML = i;
        };

        //today 표시
        calendarLink[this.today-1].className="today";

        //선택날짜 색상변경
        for(var i=0, length=calendarLink.length; i<length;i++){
            calendarLink[i].onclick = function(){
                for(var k=0; k<length;k++){
                    calendarLink[k].classList.remove("on");
                }
                this.classList.add("on")
                //선택날짜 하단 폼에 입력
                formStart.value = thisCalendar.year+"-"+(thisCalendar.month+1)+"-"+this.innerHTML;
            };
        };

        //현재 연도와 월 표시
        title.innerHTML = this.year + " " + (this.month+1);

        var prevYearBtn = calendar.getElId("prevYear")
        ,   prevMonthBtn = calendar.getElId("prevMonth")
        ,   nextMonthBtn = calendar.getElId("nextMonth")
        ,   nextYearBtn = calendar.getElId("nextYear")
        ,   todayLink = calendar.getElId("today")
        ,   thisCalendar = this
        ,   monthCount = this.month
        ,   prevMonth = thisCalendar.month -1
        ,   nextMonth = thisCalendar.month +1

        //이전년도 클릭
        prevYearBtn.onclick = function(){
            date = new Date(thisCalendar.year -1, thisCalendar.month, thisCalendar.today);
            calendar.slider(obj, date);
        };
        //이전달 클릭
        prevMonthBtn.onclick = function(){
            monthCount--;
            if( monthCount === -1){
                thisCalendar.year = thisCalendar.year - 1;//이전달을 눌렀을 때 현재 달이 1월인경우 전년도 12월로 세팅
                prevMonth = 11;
                monthCount = 11;
            }
            date = new Date(thisCalendar.year, prevMonth, thisCalendar.today)
            calendar.slider(obj, date);
        };
        //다음달 클릭
        nextMonthBtn.onclick = function(){
            monthCount++;
            if( monthCount === 12 ){
                thisCalendar.year = thisCalendar.year + 1;//다음달을 눌렀을 때 현재 달이 12월인경우 내년도 1월로 세팅
                nextMonth = 0;
                monthCount = 0;
            };
            date = new Date(thisCalendar.year, nextMonth, thisCalendar.today)
            calendar.slider(obj, date);
        };
        //다음년도 클릭
        nextYearBtn.onclick = function(){
            date = new Date(thisCalendar.year +1, thisCalendar.month, thisCalendar.today);
            calendar.slider(obj, date);
        };
        //TODAY 버튼 클릭
        todayLink.onclick = function(){
            date = new Date();
            calendar.slider(obj, date);
        }
    }
};
calendar.action({
    id : "calendar"
});

