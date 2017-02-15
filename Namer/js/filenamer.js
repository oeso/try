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


var fileListTable; // 편집 테이블의 id
var tbody; // 편집 테이블의 tbody
var fileNameList = []; //open한 file 네임 리스트

var layer; // 레이어
var beforeValue; // 변경전 입력폼
var afterValue; // 변경할 입력폼
var navBtns; // 왼쪽메뉴버튼
var newLabel; // 새 레이블

//두 개 이상의함수에서 쓰는 변수들은 onload시 미리 초기화.
window.onload = function(){
    fileListTable = document.getElementById("fileListTable");//table id
    tbody       = fileListTable.tBodies[0];

    layer       = document.getElementById("layer");
    beforeValue = document.getElementById("beforeValue");
    afterValue  = document.getElementById("afterValue");
    navBtns = document.getElementById("nav").getElementsByTagName("button");
};

function fileOpenStart(input){
    navButtonEnable(); // left menu 버튼 활성화

    if( input.files ){ // IE9 이상 , 그 외 브라우저
        for(var i=0; i<input.files.length;i++){
            // 불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
            fileNameList.push(input.files[i].name);
        };
    }else{ // IE9 이하( File List 객체가 없음 )
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
                check.addEventListener( "change" , function(){
                    checking( this, this.checked );
                });
            }else if( k == 1 ){//두번째 td에
                var cellLabel = cell.appendChild(document.createElement("label"));//label 생성 후
                cellLabel.setAttribute( "for" , "checkbox" + cnt);
                cellLabel.className = "oldName" ;

                //label text로 file명 삽입
                if( input.files ){ //IE9 이상 , 그 외
                    cellLabel.innerHTML = input.files[i].name;
                }else{ //IE9 이하
                    cellLabel.innerHTML = input.value;
                };
            }else if( k == 2 ) {//세번째 td에
                var newLabel = cell.appendChild(document.createElement("div"));//label 생성 후
                cellLabel.className = "newName" ;
            };
        };
        cnt++;
    };
};

//IE에서는 파일 open시 file path를 몽땅 가지고 옴. 파일명만 걸러내는 함수
function nameSort(file){
    var filename = file.replace(/^.*[\\\/]/, ''); // file path에서 파일명에 해당하는 부분만 걸러내는 정규식
    return filename; // 요리해서 얻어낸 파일명을 반환.
};

//각 체크박스의 checked 속성이 checked 이면 name값 추가 또는 제거
function checking(checkbox, value){
    if( value ){
        checkbox.name = "marked"; // 참고 : 추후 marked 네임 값을 가지고 목록을 편집함
    }else{
        checkbox.name = "";
    };
};

/* 체크한 체크박스 리턴 */
function selection(){
    return document.getElementsByName("marked");
};
//전체 checkbox 선택시
function checkAll(checkbox){
    var inputCheckbox = tbody.getElementsByTagName("input");

    for( var i = 0 ; i < inputCheckbox.length; i++ ){
        if( checkbox.checked ){
            inputCheckbox[i].checked = true;
            inputCheckbox[i].name = "marked";
        }else{
            inputCheckbox[i].checked = false;
            inputCheckbox[i].name = "";
        };
    };
};

/* 일괄삭제 함수 */
function deleteAll(){
    tbody.innerHTML = ""; //tbody 하위에있는 tr 전체를 빈문자열로 덮어씀으로써 제거.
    navButtonDisable();
};

/* 선택삭제 함수 : 체크된 tr 수집하여 체크된 항목이 없을 때까지 가장 위에 있는 tr 삭제 */
function deleteRows(){

    if( selection().length == tbody.rows.length ){ // 선택항목과 전체항목 갯수가 같을경우 == 전체를 선택했을 시
        deleteAll(); // 일괄삭제 함수 호출

    }else{
        do{
            var checkedTr = selection()[0].parentElement.parentElement;; // 체크된 첫번째 tr.
            tbody.removeChild( checkedTr ); // 체크된 첫번째 tr 삭제
        }while( selection().length > 0 ); //체크된 항목이 없을 때까지
        //이 문장에서 for문은 적절치 않음.
    };
};

/* 레이어 열기 함수 */
function openLayer(){
    layer.style.display = "block";
    beforeValue.focus();
};

/* 레이어 닫기 함수 */
function closeLayer(){
    beforeValue.value = "";
    afterValue.value = "";
    layer.style.display = "none";
};

/* 레이어 열린 상태에서 ESC 누르면 닫기 */
document.onkeydown = function(event) {
    if (layer.style.display != "none") {
        var x = event.which || event.keyCode; //Fire Fox 에서 keyCode 속성은 onkeypress 이벤트에서 미작동. which는 크로스브라우징을 위한 것.
        if (x == 27) {
            if( confirm("Would you close layer?")){
                closeLayer();
            };
        };
    };
};

function navButtonDisable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].setAttribute( "disabled", "disabled" );
    }
};
function navButtonEnable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].removeAttribute( "disabled" );
    }
};

/* 원래이름으로 : layer */
function restore(filelist){
    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement;
        var oldname = tr.cells[1].getElementsByTagName("label")[0].innerHTML; // OldName의 innerHTML 값

        newLabel = tr.cells[2].getElementsByTagName("div")[0]; // 수정된 내용이 담길 요소
        newLabel.innerHTML = oldname;
    };
};

/* 문자열 바꾸기 : layer */
function stringChange(filelist){
    openLayer();
    var beforeValue = beforeValue.value;
    var afterValue = afterValue.value;

    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement;
        var oldname = tr.cells[1].getElementsByTagName("label")[0].innerHTML; // OldName의 innerHTML 값

        var newname = oldname.

        newLabel = tr.cells[2].getElementsByTagName("div")[0]; // 수정된 내용이 담길 요소
        newLabel.innerHTML = newname;
    };
};
/* 뒷이름 붙이기 : layer */
function pasteAfter(filelist){
    openLayer();

}
/* 앞이름 붙이기 : layer */
function pasteBefore(filelist){
    openLayer();

}
/* 숫자만 남기기 : layer */
function keepNumber(filelist){
    openLayer();

}
/* 확장자 삭제 : layer */
function delExtension(filelist){
    openLayer();

}
/* 확장자 추가 : layer */
function registExtension(filelist){
    openLayer();

}
/* 확장자 변경 : layer */
function changeExtension(filelist){
    openLayer();

}
/* 오름차순 정렬 */
function sortAsc(filelist){

}
/* 내림차순 정렬 */
function sortDesc(){

}

