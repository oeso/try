var calendar = {
    slider : function(obj, date){
        function getElId(v){ return document.getElementById(v)};

        var date = ( typeof date == "undefined" )? new Date() : date;
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.today = date.getDate();
        var calendarBox = getElId(obj.id)
        ,   blank = calendarBox.getElementsByTagName("td")
        ,   links = calendarBox.getElementsByTagName("a")
        ,   endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31)
        ,   title = ( obj.lang == "en" ? ["sun","mon","tue","wed","tue","fri","sat"] : ["일","월","화","수","목","금","토"] )
        ,   lastDate//이 달의 마지막날짜. (마지막날을 모아둔 배열에서 현재 달 넘버에 해당하는 값)
        ,   start = date;
            start.setDate(1);//1일 세팅
        var startDayOfWeek = start.getDay()//1일의 요일
        ,   formStart = getElId("startDay")
        ,   formEnd = getElId("endDay");

        //윤년계산 ( 서력 기원 연수가 4로 나누어 떨어지는 해는 윤년. 이 중 100으로 나누어 떨어지는 해는 평년이며, 그 중 400으로 나누어 떨어지는 해는 윤년 )
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

        //현재 연도와 월 표시
        document.getElementById("yearTitle").innerHTML = date.getFullYear() + " " + parseInt( date.getMonth()+1);

        //td 빈값 또는 a 엘리먼트 세팅
        for(var i=0; i<42; i++){
            if( i < startDayOfWeek || i >= lastDate + startDayOfWeek ){
                blank[i].innerHTML = "";
            }else{
                blank[i].innerHTML = "<a href='#none'></a>";
            }
        };

        //삽입한 a에 날짜 삽입
        for(var i=1;i<=lastDate;i++){
            links[i-1].innerHTML = i;
        };

        //today 표시
        links[this.today-1].className="today";

        //선택날짜 색상변경
        for(var i=0, length=links.length; i<length;i++){
            links[i].onclick = function(){
                // for(var k=0; k<length;k++){
                //     links[k].classList.remove("on");
                // }
                this.classList.add("on")

                if(calendarBox.getElementsByClassName("on").length >= 1){
                    console.log(typeof parseInt(calendarBox.getElementsByClassName("on")[1].innerHTML))
                    for(var j=parseInt(calendarBox.getElementsByClassName("on")[0].innerHTML), size=parseInt(calendarBox.getElementsByClassName("on")[1].innerHTML); j< size-1; j++ ){
                        links[j].classList.add("active");
                    }
                }
                //선택날짜 하단 폼에 입력
                formStart.value = that.year+"-"+(that.month+1)+"-"+this.innerHTML;
            };
        };

        var first = getElId("first")
        ,   prev = getElId("prev")
        ,   next = getElId("next")
        ,   last = getElId("last")
        ,   today = getElId("today")
        ,   that = this
        ,   cnt = this.month
        ,   prevMonth = that.month -1
        ,   nextMonth = that.month +1

        //오늘 클릭
        today.onclick = function(){
            date = new Date();
            calendar.slider(obj, date);
        }
        //이전년도 클릭
        first.onclick = function(){
            date = new Date(that.year -1, that.month, that.today);
            calendar.slider(obj, date);
        };
        //이전달 클릭
        prev.onclick = function(){
            cnt--;
            if( cnt === -1){
                that.year = that.year - 1;
                prevMonth = 11;
                cnt = 11;
            }
            date = new Date(that.year, prevMonth, that.today)
            //이전달을 눌렀을 때 현재 달이 1월인경우 전년도 12월로 세팅
            calendar.slider(obj, date);
        };
        //다음달 클릭
        next.onclick = function(){
            cnt++;
            if( cnt === 12 ){
                that.year = that.year + 1;
                nextMonth = 0;
                cnt = 0;
            };
            date = new Date(that.year, nextMonth, that.today)
            //다음달을 눌렀을 때 현재 달이 12월인경우 내년도 1월로 세팅
            calendar.slider(obj, date);
        };
        //다음년도 클릭
        last.onclick = function(){
            date = new Date(that.year +1, that.month, that.today);
            calendar.slider(obj, date);
        };
    }
};
calendar.slider({
    id : "calendar",
    lang : "en"
});

