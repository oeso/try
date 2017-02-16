/**
 * Title : File Name Editor JS
 * Date : 2017 02 13
**/

//좌측 메뉴 id
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
var btnOk; // 레이어 확인 버튼
var beforeEvent; // 왼쪽메뉴버튼 클릭시 일어나는 이벤트를 담아둘 변수
var cnt = 0; // checkbox 와 tr, label id를 뿌릴때 사용. cnt는 계속 올라감
var openMessage;
var beforeTxt; // Layer에서 변경 전 입력 값을 받을 변수
var afterTxt; // Layer에서 변경 후 입력 값을 받을 변수
var coreAction; // selectAction 함수 안에서 처리되어지는 부분으로 핵심 함수

//두 개 이상의함수에서 쓰는 변수들은 onload시 미리 초기화.
window.onload = function(){
    fileListTable =  document.getElementById("fileListTable"); //table id
    tbody         =  fileListTable.tBodies[0]; // 편집 테이블의 tbody
    layer         =  document.getElementById("layer"); // 레이어
    beforeValue   =  document.getElementById("beforeValue"); // 변경전 입력폼
    afterValue    =  document.getElementById("afterValue"); // 변경할 입력폼
    btnOk         =  document.getElementById("btnOk"); // 레이어 확인 버튼
    openMessage   =  document.getElementById("openMessage"); // 레이어 확인 버튼
    navBtns       =  document.getElementById("nav").getElementsByTagName("button"); // 왼쪽메뉴버튼
};

/* 현재 리스트에 파일이 없을 경우 왼쪽 메뉴 비활성화 */
function navButtonDisable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].setAttribute( "disabled", "disabled" );
    };
    openMessage.style.display = "block";
};

/* 현재 리스트에 파일이 하나 이상일 경우 왼쪽 메뉴 활성화 함수 */
function navButtonEnable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].removeAttribute( "disabled" );
    };
    openMessage.style.display = "none";
};

/* file open시  */
function fileOpenStart(input){
    navButtonEnable(); // left menu 버튼 활성화 한다.

    if( input.files ){ // IE9 이상 , 그 외 브라우저
        for(var i=0; i<input.files.length;i++){ // 불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
            fileNameList.push(input.files[i].name);
        };
    }else{ // IE9 이하( File List 객체가 없음 )
        fileNameList = nameSort( input.value );
    };
    document.getElementById("counting").innerHTML = "File open : " + fileNameList;
    writeInTable( input ); // Table에 삽입하는 함수 호출
};

/* 오픈한 file을 테이블명을 골라내어 Table 요소에 차례대로 삽입 */
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
                    cellLabel.innerHTML = fileNameList;
                };
            }else if( k == 2 ) {//세번째 td에
                var newLabel = cell.appendChild(document.createElement("div"));//label 생성 후
                newLabel.className = "newName" ;

                //label text로 file명 삽입
                if( input.files ){ //IE9 이상 , 그 외
                    newLabel.innerHTML = input.files[i].name;
                }else{ //IE9 이하
                    newLabel.innerHTML = fileNameList;
                };
            }
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
            var checkedTr = selection()[0].parentElement.parentElement; // 체크된 첫번째 tr.
            tbody.removeChild( checkedTr ); // 체크된 첫번째 tr 삭제
        }while( selection().length > 0 ); // 체크된 항목이 없을 때까지
        // 이 문장에서 for문은 적절치 않음.
    };
};

/* 원래이름으로 : no layer */
function restore( btn ){
    removeEvent();
    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement;
        var oldname = tr.cells[1].getElementsByTagName("label")[0].innerHTML; // OldName의 innerHTML 값

        newLabel = tr.cells[2].getElementsByTagName("div")[0]; // 수정된 내용이 담길 요소
        newLabel.innerHTML = oldname;
    };
    beforeEvent = stringChangeAction;
};

/* 문자열 바꾸기 : layer */
function stringChange( btn ){
    removeEvent();
    openLayer( btn );

    btnOk.addEventListener("click", function(){
        stringChangeAction();
        console.log("addEventListener function in");
    });

    beforeEvent = stringChangeAction;
};

/* 앞이름 붙이기 : no layer, prompt */
function pasteBefore(){
    var frontxt = window.prompt( "파일명 앞에 붙일 이름 입력" , "Before Name" );
    coreAction = function( newLabel, frontxt ){
        newLabel.innerHTML = frontxt + newLabel.innerHTML;
    };
    selectAction(frontxt);
};

/* 뒷이름 붙이기 : no layer, prompt */
function pasteAfter(){
    var nextxt = window.prompt( "파일명 뒤에 붙일 이름 입력" , "After Name" );
    coreAction = function( newLabel, nextxt ){
        newLabel.innerHTML = newLabel.innerHTML + nextxt;
    };
    selectAction(nextxt);
};

/* 숫자만 남기기 : no layer */
function keepNumber( btn ){

};

/* 확장자 삭제 : no layer */
function delExtension(){
    coreAction = function( newLabel ){
        var content = newLabel.innerHTML.split(".");
        if( content.length > 1 ){
            content.pop();
            newLabel.innerHTML = content;
        };
    };
    selectAction(newLabel, content);
};

/* 확장자 추가 : no layer, prompt */
function registExtension(){
    var addExtension = window.prompt( "추가할 확장자 입력" , ".확장자" );
    coreAction = function( newLabel, addExtension ){
        newLabel.innerHTML = newLabel.innerHTML + "." + addExtension;
    };
    selectAction(addExtension);
};

/* 확장자 변경 : no layer, prompt */
function changeExtension( btn ){
    var extension = window.prompt( "변경할 확장자 입력" , ".확장자" );






};

/* 오름차순 정렬 : no layer */
function sortAsc( btn ){

};

/* 내림차순 정렬 : no layer */
function sortDesc(){

};

/** layer popup 후의 관련 Action **/
/* 각 OldName의 내용을 편집하고자 하는 내용으로 교체하는 함수 */
function selectAction( before,after ){
    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement; // 체크된 체크박스의 tr
        var newLabel = tr.cells[2].getElementsByTagName("div")[0]; // 초기 값

        coreAction( newLabel , before , after ); // 이거이 핵심,알맹이
    };
};

/* 문자열 바꾸는 함수 */
function stringChangeAction(){
    beforeTxt = beforeValue.value; // 레이어의 첫번째 입력폼에 입력한 값
    afterTxt = afterValue.value; // 레이어의 두번째 입력폼에 입력한 값
    var discord = 0; // 밑에서 설명
    coreAction = function( newLabel , before , after ){
        if( newLabel.innerHTML.match( before ) ){ // 초기 값의 innerHTML 내용과 레이어의 첫번째 입력폼에 입력한 값 매칭 되면
            var matchTxt = newLabel.innerHTML.replace( before , after ); // 매칭된 값을 변경하고자 하는 값(afterTxt)으로 바꾸어 변수에 저장.
            newLabel.innerHTML = matchTxt; // newLabel 요소의 innerHTML 값 변경시킴.
        }else{
            discord++; // 초기 값의 innerHTML 내용과 첫번째 입력폼에 입력한 값 매칭되지 않을경우 discord 값을 1씩 증가시켜 둠.
        };
    };
    selectAction( beforeTxt , afterTxt ); // 각 OldName의 내용을 편집하고자 하는 내용으로 교체
    if( discord == selection().length ){ // 체크된 체크박스의 모든 초기값과 discord 값이 같으면==>일치하는 문자열이 없으므로
        alert("일치하는 문자열이 없습니다."); // 일치하는 문자열이 없으므로 알림만 띄우고 레이어 유지.
    }else{
        closeLayer(); // 레이어 닫음
    };
};

/* 레이어 열기 함수 */
function openLayer( btn ){
    document.getElementById("dim").style.display = "block";
    document.getElementById("layerTitle").innerHTML = btn.innerHTML;
    layer.style.display = "block";
    beforeValue.focus();
};

/* 레이어 닫기 1 */
function closeLayer(){
    beforeValue.value = "";
    afterValue.value = "";
    layer.style.display = "none";
    document.getElementById("dim").style.display = "none";
};

/* 레이어 닫기 1 */
function closeLayerAction(){
    if( beforeValue.value || afterValue.value ){
        if( confirm("Do yo really want to close it?") ){
            closeLayer();
        };
    }else{
        closeLayer();
    };
};

/* 레이어 닫기 2 : ESC or ENTER 닫기 */
document.onkeydown = function(event) {
    if (layer.style.display != "none") { // layer 활성화 상태일 경우로 국한
        var x = event.which || event.keyCode; //Fire Fox 에서 keyCode 속성은 onkeypress 이벤트에서 미작동. which는 크로스브라우징을 위한 것.

        if (x == 27) {
            closeLayerAction();
        }else if ( x == 13 ){
            if( !beforeValue.value ){
                alert("Please enter before label");
                return false;
            }else if( !afterValue.value ){
                alert("Please enter after label");
                return false;
            }
            beforeEvent();
        }
    };
};

/* 현재 이벤트 실행 전에 발생한 이벤트 삭제 */
function removeEvent(){
    btnOk.removeEventListener("click", beforeEvent );
};

//beforeEvent console창에서 감시
document.onclick = function(){
    console.log(beforeEvent);
};