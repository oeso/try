/*
    Title : File Name Editor JS
    Date : 2017 02 07
*/

var fileListTable = document.getElementById("fileListTable");//table id
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

/* checkbox cilck시 해당 row를 수집 */
function checkedList(checkbox){
    checkbox.onchange = function(){
        if( this.value ){
            fileNamerJS.selectList.push(this.parentElement.parentElement );
        }else{
            fileNamerJS.selectList.push(this.parentElement.parentElement );
        }
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

            fileNamerJS.writeInTable(fileListTable);//dom요소를 만들어 뿌리는 함수 호출
        };
    },
    targetTr : function(){
        this.tbody.getElementsByName("check");
        return tr;
    },
    /* table에 불러온 file list를 dom요소를 만들어 뿌리기 */
    writeInTable : function(el){
        this.tbody = el.tBodies.item[0];

        if( inputFile.files ){ //IE9 이상 , 그 외
            var repeat = inputFile.files.length
        }else{ //IE9 이하
            var repeat = 1;
        };

        for( var i = 0; i < repeat; i++ ){ //input file로 불러온 file 갯수만큼 루프
            var row = this.tbody.insertRow(); // tr 하나 생성

            for(var k=0; k<5; k++){//tr 안에서 5번 루프
                var cell = row.insertCell();//td 5개 생성

                if( k == 0 ){//첫번째 td 에 checkbox 생성하여 type과 id 속성 추가
                    var check = cell.appendChild(document.createElement("input"));
                    check.setAttribute("type","checkbox");
                    check.name = "check"
                    check.setAttribute("id","checkbox"+i);

                    checkedList(check);

                }else if( k ==1){//두번째 td에
                    cell.innerHTML = i;//넘버 생성

                }else if( k ==2){//세번째 td에
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
        this.tbody.innerHTML = "";
    },
    /* 목록 선택 삭제 */
    deleteList : function(){
        tr.deleteCell(); // deleteCell() : talbeRow Object Methods. Delete a cell from the current table row
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

    },
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
