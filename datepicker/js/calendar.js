


var calendar = {
    slider : function(obj, date){
        function id(v){ return document.getElementById(v)};


        var date = ( typeof date == "undefined" )? new Date() : date;
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.today = date.getDate();

        var calendarBox = id(obj.id)
        ,   blank = calendarBox.getElementsByTagName("td")
        ,   endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31,30)
        ,   title = obj.lang == "en" ? ["sun","mon","tue","wed","tue","fri","sat"] : ["일","월","화","수","목","금","토"]

        //윤년계산 ( 서력 기원 연수가 4로 나누어 떨어지는 해, 이 중에서 100으로 나누어 떨어지는 해는 평년, 400으로 나누어 떨어지는 해는 윤년 )
        if( this.year % 4 === 0 && this.year % 100 !== 0 && this.year %400 ===0){
            endDate[1] = 29;
        };
        //이 달의 마지막날짜. (마지막날을 모아둔 배열에서 현재 달 넘버에 해당하는 값)
        lastDate = endDate[this.month];
        //1일 세팅
        var start = date;
        start.setDate(1);
        var startDayOfWeek = start.getDay()

        console.log(startDayOfWeek)

        //현재 연도와 월 표시
        document.getElementById("yearTitle").innerHTML = date.getFullYear() + " " + parseInt( date.getMonth()+1);

        //td에 빈날짜 만큼 a 삭제
        for(var i=0; i<35; i++){
            blank[i].innerHTML = "<a href='#none'></a>";
        };

        //td에 빈날짜 만큼 a 삭제
        for(var i=0; i<startDayOfWeek; i++){
            blank[i].innerHTML = "";
        };

        var j=1;
        //삽입한 a에 날짜 삽입
        for(var i=0;i<lastDate;i++){
            var links = calendarBox.getElementsByTagName("a");
        };

        //today 표시
        links[this.today-1].className="today";

        //클릭한 날짜 색상변경
        for(var i=0;i<31;i++){
            calendarBox.getElementsByTagName("a")[i].onclick = function(){
                this.classList.toggle("on")//element.classList.toggle() : toggle()은 classList 프로퍼티의 메소드
            };
        };

        var first = id("first");
        var prev = id("prev");
        var next = id("next");
        var last = id("last");

        var prevYear = this.year -1
        var prevMonth = this.month -1
        var nextMonth = this.month +1
        var nextYear = this.year +1

        prev.onclick = function(){
            date = new Date();
            date.setMonth(prevMonth);
            console.log(date);
            calendar.slider(obj, date);
        };
    }
};
calendar.slider({
    id : "calendar",
    lang : "ko"
});

