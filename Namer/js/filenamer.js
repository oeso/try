/*
    Title : File Name Editor JS
    Date : 2017 02 07
*/



var inputFile = document.getElementById("inputFile");//input file

//좌측 메뉴
var btnDelete = document.getElementById("deleteList");
var btnDeleteAll = document.getElementById("deleteAll");
var btnRestore = document.getElementById("restore");
var btnString = document.getElementById("stringChange");
var btnPasteAfter = document.getElementById("pasteAfter");
var btnPasteBefore = document.getElementById("pasteBefore");
var btnNumber = document.getElementById("keepNumber");
var btnDelExtension = document.getElementById("delExtension");
var btnAddExtension = document.getElementById("addExtension");
var btnChangeExtension = document.getElementById("changeExtension");
var btnSortAsc = document.getElementById("sortAsc");
var btnSortDesc = document.getElementById("sortDesc");

var test = { a : 1, b: 2, c: [], d: "d" }

function nameSort(file){
    var filename = file.replace(/^.*[\\\/]/, '');
    return filename;
};

function checking(checkbox, value){
    if( value ){
        checkbox.name = "marked";
    }else{
        checkbox.name = "";
    };
};
//전체 선택
function checkAll(checkbox){
    var inputCheckbox = tbody.getElementsByTagName("input");

    for( var i = 0 ; i < inputCheckbox.length; i++ ){
        if( checkbox.checked ){
            inputCheckbox[i].checked = true;
        }else{
            inputCheckbox[i].checked = false;
        };
    };
};
var fileListTable; //table id
var tbody; //table tbody
var fileNameList = [];
var selectList = [];

function fileOpenStart(input){
    fileListTable = document.getElementById("fileListTable");//table id
    tbody = fileListTable.tBodies[0];

    console.log( input.files )
    if( input.files ){//IE9 이상 , 그 외 브라우저
        for(var i=0; i<input.files.length;i++){
            //불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
            fileNameList.push(input.files[i].name);
        };
    }else{//IE9 이하( File List 객체가 없음 )
        fileNameList.push( nameSort( input.value ) );
    };
    document.getElementById("counting").innerHTML = "File open : " + fileNameList;
    writeInTable( input );//dom요소를 만들어 뿌리는 함수 호출
};

var cnt = 0;
function writeInTable( input ){

    if( input.files ){ //IE9 이상 , 그 외
        var repeat = input.files.length
    }else{ //IE9 이하
        var repeat = 1;
    };

    for( var i = 0; i < repeat; i++ ){ //input file로 불러온 file 갯수만큼 루프

        var row = tbody.insertRow(); // tr 하나 생성

        for(var k=0; k<4; k++){//tr 안에서 5번 루프
            var cell = row.insertCell();//td 5개 생성

            if( k == 0 ){//첫번째 td 에 checkbox 생성하여 type과 id 속성 추가
                var check = cell.appendChild(document.createElement("input"));
                check.setAttribute( "type" , "checkbox" );
                check.setAttribute( "id" , "checkbox" + cnt );
                check.parentElement.parentElement.id = "tr" + cnt;
                check.addEventListener( "click" , function(){
                    checking( this, this.checked );
                });

            }else if( k ==1){//세번째 td에
                var cellLabel = cell.appendChild(document.createElement("label"));//label 생성 후
                cellLabel.setAttribute( "for" , "checkbox" + cnt);
                cellLabel.className = "oldName" ;

                //label text로 file명 삽입
                if( input.files ){ //IE9 이상 , 그 외
                    cellLabel.innerHTML = input.files[i].name;
                }else{ //IE9 이하
                    cellLabel.innerHTML = input.value;
                };
            };
        };
        cnt++;
    };
};
/* 목록 전체 삭제 */
function deleteAll(){
    tbody.innerHTML = ""; //tbody 하위에있는 tr 전체를 빈문자열로 덮어씀으로써 제거.
};
/* 목록 선택 삭제 */
function deleteList(){
    console.log( tbody )
    //체크된 tr 수집
    var checkedBox = document.getElementsByName("marked");

    for( var i = 0 ; i < checkedBox.length; i++ ){
        var checkedTr = checkedBox[i].parentElement.parentElement;
        tbody.removeChild( checkedTr );
    };
};

var fileNamerJS = {
    /* Default */
    fileNameList : [],
    selectList : [],
    init : function(){
        this.fileOpen();
    },
    //input 으로 file 불러오기
    fileOpen: function(){
        inputFile.onchange = function(){
            if( this.files ){//IE9 이상 , 그 외 브라우저
                for(var i=0; i<this.files.length;i++){
                    //불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
                    fileNamerJS.fileNameList.push(this.files[i].name);
                };
            }else{//IE9 이하( File List 객체가 없음 )
                fileNamerJS.fileNameList.push( nameSort( this.value ) );
            };
            document.getElementById("counting").innerHTML = "File open : "+fileNamerJS.fileNameList

            fileNamerJS.writeInTable(fileListTable);//dom요소를 만들어 뿌리는 함수 호출
        };
    },
    targetTr : function(){
        this.tbody.getElementsByName("check");
        return tr;
    },
    /* table에 불러온 file list를 dom요소를 만들어 뿌리기 */
    writeInTable : function(el){
        this.tbody = el.tBodies[0];

        if( inputFile.files ){ //IE9 이상 , 그 외
            var repeat = inputFile.files.length
        }else{ //IE9 이하
            var repeat = 1;
        };

        for( var i = 0; i < repeat; i++ ){ //input file로 불러온 file 갯수만큼 루프

            var row = this.tbody.insertRow(); // tr 하나 생성

            for(var k=0; k<4; k++){//tr 안에서 5번 루프
                var cell = row.insertCell();//td 5개 생성

                if( k == 0 ){//첫번째 td 에 checkbox 생성하여 type과 id 속성 추가
                    var check = cell.appendChild(document.createElement("input"));
                    check.setAttribute("type","checkbox");
                    check.setAttribute("id","checkbox"+i);
                    check.parentElement.parentElement.id = "tr"+i;
                    check.addEventListener("click", function(){
                        console.log(11)
                        checking( this, this.checked );
                    });

                }else if( k ==1){//세번째 td에
                    var cellLabel = cell.appendChild(document.createElement("label"));//label 생성 후
                    cellLabel.setAttribute("for","checkbox"+i);
                    cellLabel.className = "oldName";

                    //label text로 file명 삽입
                    if( inputFile.files ){ //IE9 이상 , 그 외
                        cellLabel.innerHTML = inputFile.files[i].name;
                    }else{ //IE9 이하
                        cellLabel.innerHTML = inputFile.value;
                    };
                };
            };
        };
    },
    /* 목록 전체 삭제 */
    deleteAll : function(){
        //목록 전체 삭제이므로 tbody 하위에있는 tr 전체를 빈문자열로 덮어씀으로써 제거.
        this.tbody.innerHTML = "";
    },
    /* 목록 선택 삭제 */
    deleteList : function(){
        //체크된 tr 수집
        //function checkedItemSort(){
            var checkedBox = fileNamerJS.tbody.getElementsByName("marked");

            for( var i = 0 ; i < checkedBox.length; i++ ){
                var checkedTr = checkedBox.parentElement.parentElement;
                this.tbody.removeChild( checkedTr );
            };
        //};

        // for( var i = 0 ; i < checkedItemSort().length; i++ ){
        //     console.log( checkedItemSort()[i] );
        //     console.log( fileNamerJS.tbody.rows[ checkedItemSort()[i] ] )
        //     fileNamerJS.tbody.rows[ checkedItemSort()[i] ].innerHTML = "";
        // };

    },
    /* 원래이름으로 */
    stringChange : function(filelist){

    },
    /* 문자열 바꾸기 */
    restore : function(filelist){

    },
    /* 뒷이름 붙이기 */
    pasteAfter : function(filelist){

    },
    /* 앞이름 붙이기 */
    pasteBefore : function(filelist){

    },// 2017 02 14
    /* 숫자만 남기기 */
    keepNumber : function(filelist){

    },
    /* 확장자 삭제 */
    delExtension : function(filelist){

    },
    /* 확장자 추가 */
    registExtension : function(filelist){

    },
    /* 확장자 변경 */
    changeExtension : function(filelist){

    },
    /* 오름차순 정렬 */
    sortAsc : function(filelist){

    },
    /* 내림차순 정렬 */
    sortDesc : function(){

    }
};
