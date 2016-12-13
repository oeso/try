var day = $("#calendar a");

day.click(function(){
    day.removeClass("on");
    $(this).addClass("on");
});

function calendar(id){
    var calendarBox = document.getElementById(id)
        , objDate = new Date()
        , year = objDate.getFullYear()//년
        , month = objDate.getMonth()//월. 11은 12월이 된다.
        , dayW = objDate.getDay()//요일
        , day = objDate.getDate()//날짜
        , str = "", cnt=0
        , endDate = new Array(31,28,31,30,31,30,31,31,30,31,30,31,30)
        , week = new Array(0,1,2,3,4,5,6)
        , startDate = day

        if( year % 4 === 0 && year % 100 === 0 && year %400 ===0){
            endDate[1] = 29;
        };


        lastDate = endDate[month];


        for(var j=dayW; j<=7;j--){
            if(startDate === 1){
                break;
            };
            startDate--;
            if(j == 0){
                j = 7;
            };
        };

console.log(j)
        str += "<tr>"

        if(dayW !== 0){
            for(var i=0;i<j;i++){
                str += "<td></td>"
            };
        };

console.log(j)
        cnt = j

        for(var k=1;k<=lastDate;k++){
            cnt++;

            if( k === day){
                str += "<td><a class='today'>" + k + "</a></td>"// k가 오늘과 같을 경우 today 클래스 붙임.
            }else{
                str += "<td><a>" + k + "</a></td>"
            };


            if( cnt == 7){// 한주를 돌렸으면 tr을 닫았다 열어줌
                cnt = 0;
                str += "</tr><tr>"
            };
        };
        str += "</tr>"
        console.log(str)

        calendarBox.getElementsByTagName("tbody")[0].innerHTML = str;

        for(var i=0;i<=5;i++){
            document.getElementsByTagName("tr")[i].childNodes[0].className = "text-danger"
        }
};
calendar("calendar");