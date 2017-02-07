/*
    Title : File Name Editor JS
    Date : 2017 02 07
*/

var fileListTable = document.getElementById("fileListTable");//table id
var inputFile = document.getElementById("inputFile");//input file

//좌측 메뉴
var deleteList = document.getElementById("deleteList");
var restore = document.getElementById("restore");
var stringChange = document.getElementById("stringChange");
var pasteAfter = document.getElementById("pasteAfter");
var pasteBefore = document.getElementById("pasteBefore");
var keepNumber = document.getElementById("keepNumber");
var delExtension = document.getElementById("delExtension");
var registExtension = document.getElementById("registExtension");
var changeExtension = document.getElementById("changeExtension");
var sortAsc = document.getElementById("sortAsc");
var sortDesc = document.getElementById("sortDesc");

var fileNamerJS = {
    /* Default
    */
    init : function(){
        this.fileOpen()
    },
    //input 으로 file 불러오기
    fileOpen: function(){
        inputFile.onchange = function(){
            for(var i=0; i<this.files.length;i++){ console.log(this.files[i].name) };//콘솔에 한번 찍어봄

            inputTxt.value = inputFile.value;
            fileNamerJS.writeInTable(fileListTable);//dom요소를 만들어 뿌리는 함수 호출
        };
    },
    /* table에 불러온 file list를 dom요소를 만들어 뿌리기 */
    writeInTable : function(el){
        var tbody = el.getElementsByTagName("tbody")[0];

        for(var i =0; i<inputFile.files.length; i++){//input file로 불러온 file 갯수만큼 루프
            var row = tbody.insertRow(); // tr 하나 생성

            for(var k=0; k<5; k++){//tr 안에서 5번 루프
                var cell = row.insertCell();//td 5개 생성

                if( k == 0 ){//첫번째 td 에 checkbox 생성하여 type과 id 지정
                    var check = cell.appendChild(document.createElement("input"))
                    check.setAttribute("type","checkbox");
                    check.setAttribute("id","checkbox"+i);
                }else if( k ==1){//두번째 td에
                    cell.innerHTML = i;//넘버 생성
                }else if( k ==2){//세번째 td에
                    var cellLink = cell.appendChild(document.createElement("a"));//a 생성 후
                    cellLink.setAttribute("href","#none");
                    cellLink.className = "oldName";
                    cellLink.innerHTML = inputFile.files[i].name;//file명 삽입
                };
            };
        }
    },
    /* 목록 삭제. button id : deleteList */
    deleteList : function(){

    },
    /* 원래이름으로. button id : stringChange */
    stringChange : function(){

    },
    /* 문자열 바꾸기. button id : restore */
    restore : function(){

    },
    /* 뒷이름 붙이기. button id : pasteAfter */
    pasteAfter : function(){

    },
    /* 앞이름 붙이기. button id : pasteBefore */
    pasteBefore : function(){

    },
    /* 숫자만 남기기. button id : keepNumber */
    keepNumber : function(){

    },
    /* 확장자 삭제. button id : delExtension */
    delExtension : function(){

    },
    /* 확장자 추가. button id : registExtension */
    registExtension : function(){

    },
    /* 확장자 변경. button id : changeExtension */
    changeExtension : function(){

    },
    /* 오름차순 정렬 button id : sortAsc */
    sortAsc : function(){

    },
    /* 내림차순 정렬 button id : sortDesc */
    sortDesc : function(){

    }
};
