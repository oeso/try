/**
 * Title : File Name Editor JS
 * Date : 2017 02 13~21
 **/
var fileListTable // 편집 테이블의 id
   , tbody // 편집 테이블의 tbody
   , fileNameList = [] //open한 file 네임 리스트
   , layer // 레이어
   , beforeValue // 변경전 입력폼
   , afterValue // 변경할 입력폼
   , navBtns // 왼쪽메뉴버튼
   , labels // 새 레이블
   , btnOk // 레이어 확인 버튼
   , beforeEvent // 왼쪽메뉴버튼 클릭시 일어나는 이벤트를 담아둘 변수
   , cnt = 0 // checkbox 와 tr,  label id를 뿌릴때 사용. cnt는 계속 올라감
   , coreAction // selectAction 함수 안에서 처리되어지는 부분으로 핵심 함수
   , fileObj // Fire Base로 넘길 객체

//두 개 이상의함수에서 쓰는 변수들은 onload시 미리 초기화.
window.onload = function(){
    var openMessage   =  document.getElementById("openMessage"); // 레이어 확인 버튼
    fileListTable =  document.getElementById("fileListTable"); //table id
    tbody         =  fileListTable.tBodies[0]; // 편집 테이블의 tbody
    layer         =  document.getElementById("layer"); // 레이어
    beforeValue   =  document.getElementById("beforeValue"); // 변경전 입력폼
    afterValue    =  document.getElementById("afterValue"); // 변경할 입력폼
    btnOk         =  document.getElementById("btnOk"); // 레이어 확인 버튼
    navBtns       =  document.getElementById("nav").getElementsByTagName("button"); // 왼쪽메뉴버튼

    closeLayer(); //새로고침시 문자열 바꾸기 레이어 입력폼 내용 초기화
    navButtonDisable(); //새로고침시 왼쪽 메뉴 버튼 초기화(비활성화)
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
var storageRef, imgRef,fileName ,mountainImagesRef, spaceRef, file,uploadTask, path, nm;

/* file open시  */
function fileOpenStart(input){
	fileObj = input; // Fire Base로 넘길 객체에 file 정보를 담아둔다.나중에 설명
    navButtonEnable(); // left menu 버튼 활성화 한다.
    if( input.files ){ // IE9 이상 , 그 외 브라우저
        for(var i=0; i<input.files.length;i++){ // 불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
            fileNameList.push(input.files[i].name);
        };
    }else{ // IE9 이하( File List 객체가 없음 )
        fileNameList = nameSort( input.value );
    };
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

        for(var k=0; k<4; k++){ // tr 안에서 5번 루프
            var cell = row.insertCell(); // td 5개 생성

            if( k == 0 ){ //첫번째 td 에 checkbox 생성하여 type과 id 속성 추가
                var check = cell.appendChild(document.createElement("input"));
                check.setAttribute( "type" , "checkbox" ); // type을 checkbox로 명시
                check.setAttribute( "id" , "checkbox" + cnt ); // id값을 명시하는 이유 : checkbox의 id와 연결된 label의 for값 매칭 필.
                check.addEventListener( "change" , function(){ // checking 이벤트 등록.
                    checking( this, this.checked ); // 각 체크박스의 checked 속성이 checked 이면 name값 추가 또는 제거하는 이벤트 (참고 : 추후 marked 네임 값을 가지고 선택목록을 편집함)
                });
            }else if( k == 1 ){//두번째 td에
                var cellLabel = cell.appendChild(document.createElement("label"));//label 생성 후
                cellLabel.setAttribute( "for" , "checkbox" + cnt); // for값은 바로 전 td에 속한 checkbox의 id와 동일하게 명시함.
                cellLabel.className = "oldName"; // className 정의
                var f_name = input.files[i].name; // 파일 명
                var f_size = Math.ceil( input.files[i].size / 1024 ) + "kb"; // 사이즈는 소수점 올림처리함
                cellLabel.addEventListener("contextmenu", function(e){
                    rightClick( f_name, f_size ); // Mouse right click Event ( 파일 명, 사이즈를 인자로 넘김)
                    e.preventDefault(); // 이벤트 버블링 해제
                });

                //label text로 file명 삽입
                if( input.files ){ //IE9 이상 , 그 외
                    cellLabel.innerHTML = input.files[i].name;
                }else{ //IE9 이하
                    cellLabel.innerHTML = fileNameList;
                };
            }else if( k == 2 ) {//세번째 td에
                var labels = cell.appendChild(document.createElement("div"));//label 생성 후
                labels.className = "newName" ;
                if( input.files ){ //IE9 이상 , 그 외 label text로 file명 삽입
                    labels.innerHTML = input.files[i].name;
                }else{ //IE9 이하
                    labels.innerHTML = fileNameList;
                };
            };
        };
        cnt++;
    };
};

//mouse right click event
function rightClick( obj1, obj2 ){ // 파일명, 사이즈 인자
    alert( "파일명 : " + obj1 + ", 크기 : " + obj2 );
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

/* 체크한 체크박스 collection 리턴 */
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
    tbody.innerHTML = ""; // tbody 하위에있는 tr 전체를 빈문자열로 덮어씀으로써 제거.
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
function restore(){
    removeEvent();
    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement;
        var oldname = tr.cells[1].getElementsByTagName("label")[0].innerHTML; // OldName의 innerHTML 값

        labels = tr.cells[2].getElementsByTagName("div")[0]; // 수정된 내용이 담길 요소
        labels.innerHTML = oldname;
    };
};

/* 문자열 바꾸기 : layer */
function stringChange( btn ){
    removeEvent(); // 그 전에 layer ok 버튼에 걸려있던 event 제거
    openLayer( btn ); // layer 열기
    btnOk.addEventListener("click", function(){ // 열린 layer ok 버튼에 이벤트 추가
        stringChangeAction();
    });
    beforeEvent = stringChangeAction; // beforeEvent에 현재 이벤트 담아둠
};

/* 앞이름 붙이기 : prompt */
function pasteBefore(){
    var frontxt = window.prompt( "파일명 앞에 붙일 이름 입력" , "front" );
    if( !frontxt ){ // window.prompt 반환값이 null 이면 리턴.
        return false;
    };
    coreAction = function( labels, frontxt ){ // 앞이름 붙이기 함수 정의
        labels.innerHTML = frontxt + labels.innerHTML;
    };
    selectAction(frontxt);
};

/* 뒷이름 붙이기 : prompt */
function pasteAfter(){
    var nextxt = window.prompt( "파일명 뒤에 붙일 이름 입력" , "next" );
    if( !nextxt ){ // window.prompt 반환값이 null 이면 리턴.
        return false;
    };
    coreAction = function( labels, nextxt ){ // 뒷이름 붙이기 함수 정의
        labels.innerHTML = returnFileName(labels.innerHTML) + nextxt + "." + ext(labels.innerHTML);
    };
    selectAction(nextxt);
};

/* 숫자만 남기기 : no layer */
function keepNumber(){
    coreAction = function( labels ){
        var mix = returnFileName(labels.innerHTML).split(""); // 파일명 가져와서 배열로 만듦
        var nums = "";
        for( var i = 0 ; i< mix.length; i ++){ // 파일명 문자 하나하나 돌면서
            var numbers = Number( mix[i] ); // 파일명 문자 하나하나를 숫자로 변환
            if( !isNaN( numbers ) && typeof numbers == "number" ){ // 각 문자타입이 number 이면서 NaN이 아니면
                nums += numbers; // nums에 해당 문자열을 추가
            };
        };
        labels.innerHTML = nums + "." + ext(labels.innerHTML); // labels innerHTML 에 (합한 문자열과 본래 확장자 합하여) 삽입
    };
    selectAction();
};

/* 확장자 추가 : prompt */
function registExtension(){
    var addExtension = window.prompt( "추가할 확장자 입력" , "확장자" );
    if( !addExtension ){ return false; };

    while( /^\./i.test(addExtension) ){
        if( !addExtension ){ return false; };// window.prompt 반환값이 null 이면 리턴.
        alert(". 제외하고 입력해주세요.");
        var addExtension = window.prompt( "추가할 확장자 입력" , "확장자" );
    };

    coreAction = function( labels, addExtension ){ // 확장자 추가 함수 정의
        labels.innerHTML = labels.innerHTML + "." + addExtension;
    };
    selectAction(addExtension);
};

/* 확장자 변경 : prompt */
function changeExtension(){
    var extension = window.prompt( "변경할 확장자 입력" , "확장자" );
    if( !extension ){ // window.prompt 반환값이 null 이면 리턴.
        return false;
    };
    while( /^\./i.test(extension) ){
        alert(". 제외하고 입력해주세요.");
        var extension = window.prompt( "변경할 확장자 입력" , "확장자" );
    };
    coreAction = function( labels, extension ){ // 확장자 변경 함수 정의
        labels.innerHTML = returnFileName(labels.innerHTML) + "." + extension;
    };
    selectAction(extension);
};

/* 확장자 삭제 : no layer */
function delExtension(){
    coreAction = function(labels){ // 확장자 삭제 함수 정의
        labels.innerHTML = returnFileName(labels.innerHTML);
    };
    selectAction();
};

/* 확장자만 리턴 */
function ext(txt){
    var start = txt.lastIndexOf("."); // 가장 마지막에 위치안 "."의 위치 값 number로 반환. lastIndexOf(), substr() 둘다 원래 문자열을 변경하지 않음
    var extension = txt.substr( start+1 , txt.length).toLowerCase(); // error 방지를 위하여 소문자로 ^^
    if( start != -1 ) { // txt (txt는 label.innerHTML) 내용 중에 "." 으로 구분되는 내용이 있을 경우  (없으면 -1 반환)
        return extension; // 순수 확장자만 리턴
    }else{
        return txt; // 원래 내용 리턴
    }
};

/* 확장자 제외한 파일명만 리턴 */
function returnFileName(txt){
    var lastDot = txt.lastIndexOf("."); // 가장 마지막에 위치안 "."의 위치 값 number로 반환. lastIndexOf(), substr() 둘다 원래 문자열을 변경하지 않음
    var purename = txt.substr( 0 , lastDot).toLowerCase();
    if( lastDot != -1 ) { // txt (txt는 label.innerHTML) 내용 중에 "." 으로 구분되는 내용이 있을 경우  (없으면 -1 반환)
        return purename; // 순수 파일명만 리턴
    }else{
        return txt; // 원래 내용 리턴
    }
};

var sortt;
function listSorting() {
    var arr1 = [], arr2 = []; //임의의 배열을 만들고
    for (var i = 0; i < tbody.rows.length; i++) {
        var oldLabel = tbody.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML; // 초기 oldName값
        var newName = tbody.rows[i].cells[2].getElementsByTagName("div")[0].innerHTML; // 초기 newName값
        arr1.push(oldLabel); // 각 배열에 초기 oldName값 push
        arr2.push(newName); // 각 배열에 // 초기 newName값 push
    };
    sortt(arr1, arr2); // sortt 함수 호출
    for (var i = 0; i < tbody.rows.length; i++) {
        tbody.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML = arr1[i];
        tbody.rows[i].cells[2].getElementsByTagName("div")[0].innerHTML = arr2[i];
    };
};

/* 오름차순 정렬 : no layer */
function sortAsc(){
    sortt = function(arr1, arr2){
        arr1.sort(); // 초기 oldName값 오름차순 정렬
        arr2.sort(); // 초기 newName값 오름차순 정렬
    };
    listSorting();
};

/* 내림차순 정렬 : no layer */
function sortDesc(){
    sortt = function(arr1, arr2) {
        arr1.sort();
        arr1.reverse(); // 초기 oldName값 오름차순 정렬 후 뒤집음
        arr2.sort();
        arr2.reverse(); // 초기 newName값 오름차순 정렬 후 뒤집음
    };
    listSorting();
};

/* 각 OldName의 내용을 편집하고자 하는 내용으로 교체하는 함수 */
function selectAction( before,after ){
    for( var i = 0 ; i < selection().length; i++ ){
        var tr = selection()[i].parentElement.parentElement; // 체크된 체크박스의 tr
        var labels = tr.cells[2].getElementsByTagName("div")[0]; // 초기 값

        coreAction( labels , before , after ); // 이거이 핵심,알맹이
    };
};

/* 문자열 바꾸는 함수 */
function stringChangeAction(){
    var discord = 0; // 밑에서 설명
    coreAction = function( labels , before , after ){
        if( labels.innerHTML.match( before ) ){ // 초기 값의 innerHTML 내용과 레이어의 첫번째 입력폼에 입력한 값 매칭 되면
            var matchTxt = labels.innerHTML.replace( before , after ); // 매칭된 값을 변경하고자 하는 값(afterTxt)으로 바꾸어 변수에 저장.
            labels.innerHTML = matchTxt; // labels 요소의 innerHTML 값 변경시킴.
        }else{
            discord++; // 초기 값의 innerHTML 내용과 첫번째 입력폼에 입력한 값 매칭되지 않을경우 discord 값을 1씩 증가시켜 둠.
        };
    };
    selectAction( beforeValue.value , afterValue.value ); // 각 OldName의 내용을 편집하고자 하는 내용으로 교체

    if( discord == selection().length ){ // 체크된 체크박스의 모든 초기값과 discord 값이 같으면==>일치하는 문자열이 없으므로
        alert("NewName list 내 일치하는 문자열이 없습니다. 원래이름으로 초기화 또는 문자열 재확인 후 재시도하세요."); // 일치하는 문자열이 없으므로 알림만 띄우고 레이어 유지.
    }else{
        closeLayer(); // 레이어 닫음
    };
};

/* layer 뜰 시 현재 이벤트 실행 전에 발생한 이벤트 삭제 */
function removeEvent(){ // 바로 전에 등록했던 이벤트가 없으면 return false
    if( !beforeEvent ){return false;}
    btnOk.removeEventListener("click", beforeEvent ); // OK 버튼에 등록했던 전 이벤트 삭제.
};

/* layer 열기 */
function openLayer( btn ){
    document.getElementById("dim").style.display = "block"; // layer 뒤에 dim 요소 show
    document.getElementById("layerTitle").innerHTML = btn.innerHTML; // layer title은 왼쪽 버튼의 내용으로 함.
    layer.style.display = "block"; // 숨겨뒀던 layer show.
    beforeValue.focus(); // 처음 입력폼에 포커스 ON
};

/* layer 닫기 1 */
function closeLayer(){
    beforeValue.value = ""; // before 입력폼 값 제거
    afterValue.value = ""; // after 입력폼 값 제거
    layer.style.display = "none"; // layer hide.
    document.getElementById("dim").style.display = "none"; // dim 요소 hide
};

/* layer 닫기 2 */
function closeLayerAction(){
    if( beforeValue.value || afterValue.value ){ // before, after 어느 한쪽이라도 입력한 내용이 있으면
        if( confirm("Do yo really want to close it?") ){ // 정말 닫을 것인지 확인 창 띄움.
            closeLayer();// layer 닫음
        };
    }else{ // before, after 둘 다 입력 내용 없으면
        closeLayer(); // layer 바로 닫음
    };
};

/* 레이어 닫기 3 : ESC or ENTER 닫기 */
document.onkeydown = function(event) {
    if (layer.style.display != "none") { // layer 활성화 상태일 경우로 국한
        var x = event.which || event.keyCode; //Fire Fox 에서 keyCode 속성은 onkeypress 이벤트에서 미작동. which는 크로스브라우징을 위한 것.

        if (x == 27) { // ESC 키 누를시
            closeLayerAction();
        }else if ( x == 13 ){ // ENTER 키 누를 시
            if( !beforeValue.value ){ // before 항목 미입력시 alert
                alert("Please enter before label");
                return false;
            }else if( !afterValue.value ){ // after 항목 미입력시 alert
                alert("Please enter after label");
                return false;
            }
            beforeEvent(); // 왼쪽 메뉴 누를시 해당 기능에 해당하는 이벤트 실행 ( 왼쪽 메뉴 누를시 beforeEvent에 담아뒀던 이벤트)
        };
    };
};

/* 파일리스트의 확장자 종류 리턴 */
function listArry(){
	var extension = new String();
	var extensionArry = new Array();

	for( var i = 0 ; i < tbody.rows.length; i++ ){
		var celltxt = tbody.rows[i].cells[2].getElementsByTagName("div")[0].innerHTML; // newName의 innerHTML (파일명 전체)
        if( i == 0 ){ // 첫번째 확장자는 무조건 담음
            extensionArry.push( ext( celltxt ) )
        }else{ // 두번째 확장자부터 중복 체크하여 배열에 담음
            if( ext( celltxt ) == celltxt ){  // 확장자가 없는 경우 "noExt" 라는 텍스트로 담음
                extension = "noExt";
            }else{
                extension = ext( celltxt ); // 확장자가 있으면 해당 확장자를 담음
            };
            if( extensionArry.lastIndexOf( extension ) == -1   ){ // 이전에 담은 확장자가 extensionArry 리스트에 존재하지 않으면 실행
                extensionArry.push( extension );
            };
        };
	};
	return extensionArry; // 파일리스트의 확장자를 한번씩만 담은 배열 리턴
};

/* SAVE 함수 : 서버로 파일정보 전송 (file list 객체를 넘긴다. file list 객체에는 name, type, size, lastModified(최종수정날짜객체) 등이 key,value 쌍으로 정의되어 있다. */
function save(){
    //firebase.database().ref('filename/').set(  fileObj.files ); //  input file로 가져온 file list 객체를 Firs Base databse로 넘김으로써 최종 마무리.
};



