


function calendar(obj, date){
    var param = obj
        , calendarBox = document.getElementById(param.id)
        , firstBtn = document.getElementsByName("firstBtn")[0]
        , objDate = (date == undefined) ? new Date() : date
        , year = objDate.getFullYear()//년
        , month = objDate.getMonth()//월. 11은 12월이 된다.
        , dayStr = objDate.getDay()//요일
        , day = objDate.getDate()//날짜
        , str = "", cnt=0
        , endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31,30)
        , week = new Array(0,1,2,3,4,5,6)
        , startDate = day
        , title = param.lang == "en" ? ["sun","mon","tue","wed","tue","fri","sat"] : ["일","월","화","수","목","금","토"]


        //윤년계산 ( 서력 기원 연수가 4로 나누어 떨어지는 해, 이 중에서 100으로 나누어 떨어지는 해는 평년, 400으로 나누어 떨어지는 해는 윤년 )
        if( year % 4 === 0 && year % 100 !== 0 && year %400 ===0){
            endDate[1] = 29;
        };

        //이 달의 마지막날짜. (마지막날을 모아둔 배열에서 현재 달 넘버에 해당하는 값)
        lastDate = endDate[month];

        //1일이 무슨 요일이지 구하기.
        for(var j=dayStr; j<=7;j--){
            if(startDate === 1){
                break;
            };
            startDate--;
            if(j == 0){
                j = 7;
            };
        };
        //이전년도 클릭시
        var prevYear = new Date( year-1, month, day );
        //이전달 클릭시
        var prevMonth = new Date( year, month-1, day);
        //다음달 클릭시
        var nextMonth = new Date( year, month+1, day);
        //다음년도 클릭시
        var nextYear = new Date( year+1, month, day);

        //꽂아넣을 html 생성. thead 부분과 tbody부분 생성.

        str += "<button class='btn btn-primary first' name='firstBtn' onclick='calendar({id : \""+param.id+"\", lang : \""+param.lang+"\"}); return false'> << </button>";

        var title = year +" "+month;
        $("#yearTitle").html(title)

        str += "<h2 id='yearTitle' class='text-center'>"+year+ " "+ month+"</h2>";
        str += "<table class='table table-bordered'>"
        str += "<caption class='hide'>Calendar</caption>"
        str += "<thead>"
        str +=      "<tr>"
        str +=          "<th class='text-danger'>" + title[0] + "</th>"//일요일
        //월~금요일
        for(var i=1;i<6;i++){
            str +=      "<th>" + title[i] + "</th>"
        };

        str +=          "<th class='text-primary'>" + title[6] + "</th>"//토요일
        str +=      "</tr>"
        str += "</thead>"
        str += "<tbody>"
        str +=      "<tr>"
        //오늘이 일요일이 아니면 1일이 되기 전날까지 빈 td 생성, 삽입
        if(dayStr !== 0){
            for(var i=0;i<j;i++){
                str +=  "<td></td>"
            };
        };
        cnt = j;

        for(var k=1;k<=lastDate;k++){
            cnt++;

            if( k === day){
                str +=  "<td><a href='' class='today'>" + k + "</a></td>"// k가 오늘과 같을 경우 today 클래스 붙임.
            }else{
                str +=  "<td><a href=''>" + k + "</a></td>"
            };
            if( cnt == 7){// 한주를 돌렸으면 tr을 닫았다 열어줌
                cnt = 0;
                str += "</tr><tr>"
            };
        };
        str += "</tr></tbody>"
        str += "</table>"

        calendarBox.innerHTML = str;

        for(var i=0;i<=5;i++){
            document.getElementsByTagName("tr")[i].childNodes[0].className = "text-danger"
        }


};

calendar({
    id : "calendar",
    lang : "ko"
});