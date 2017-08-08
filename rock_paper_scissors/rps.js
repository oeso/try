var jekyll = { index : 0, win : 0, lose : 0, draw :0, item : 0 }
    , hide = { index : 0, win : 0, lose : 0, draw :0, item : 0 } //player
var cnt = 0; //회차
var win = "승" , draw = "무" , lose = "패";
var my; //승부

function submit( person ){//가위 바위 보 중 랜덤으로 내기
    person.index++;
    person.item = Math.floor( Math.random() * 3 ); //(int)(Math.random()*10)%3 와 같이 써도 된다.
    return person.item//숫자로 리턴.// 0: 가위, 1:바위, 2:보
};

function compile(num){ // 숫자를 가위바위보 문자로 변환
    if(num){
        if( num==1 ){
            return "바위";
        }else if(num==2){
            return "보";
        };
    }else{
        return "가위";
    };
};

//각자 낸 item 비교
function decision( jekyllItem, hideItem ){ // 반드시 숫자로 받도록 작성했으나 혹여 숫자로 넘어오지 않는 경우를 감안하여 number링 처리 해줘야 하는가? 'ㅁ 'a;;;
    //jekyll이 이기는 경우 : 0,2 / 1,0 / 2,1  ----> calculation : -2, 1, 1
    //hide가 이기는 경우 : 0,1 / 1,2 / 2,0  -----> calculation : -1, -1, 2
    //무승부인 경우 : 0,0 / 1,1 / 2,2 -----> calculation : 0
    var calculation = jekyllItem - hideItem; //승패 계산
    
    if( calculation == -2 || calculation == 1 ){
        jekyll.win++; hide.lose++;
        my = win;
        result = "jekyll " + compile(jekyllItem) + " hide " + compile(hideItem) + " / jekyll "+ win+ " hide"+ lose;
        return result;
    }else if( calculation == -1 || calculation == 2 ){//jekyll이 이기는 경우
        jekyll.lose++; hide.win++;
        my = lose;
        result = "jekyll " + compile(jekyllItem) + " hide " + compile(hideItem) + " / jekyll "+ lose+ " hide"+ win;
        return result;
    }else{
        jekyll.draw++; hide.draw++;
        my = draw;
        result = "jekyll " + compile(jekyllItem) + " hide " + compile(hideItem) + " / " + draw;
        return result;
    }
};

function play(){ // 가위,바위,보!!!!
    //비길경우 회차에 포함하지 않음.
    if( my != draw ){ // if문 평가식에 부정문을 쓰지 말라 하신 바 있으나. 해당 if문의 목적은 draw를 가려내는 것이므로 ! 을 사용하였습니다.
        cnt++;
    };
    if(cnt==11){
        alert("10th The End. Restart!");
        return false;
    };

    //각자 낸 item 비교 후 승패 결정
    decision( submit(jekyll), submit(hide));
    
    console.log( cnt + "판 : ", result )

    if(cnt==10){ // 10판 전체 결론 도출
        document.getElementById("jekyll").innerHTML = "jekyll : "+jekyll.index + " 전 "+jekyll.win +" 승 " + jekyll.lose + " 패 " + jekyll.draw + " 무";
        document.getElementById("hide").innerHTML = "hide : "+hide.index + " 전 "+hide.win +" 승 " + hide.lose + " 패 " + hide.draw + " 무";
    }
};