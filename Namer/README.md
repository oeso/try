# Pure Javascript
## 여러가지 javascript 기능 구현.
### pureJS 기능 1차 완성 : 2017-02-20 , AM 10:00. Fire Base 연동 시작.
### 1차 완성본 코드 리뷰. 지적 사항만 메모.
#### S책임님 Comment
1. file 목록 생성하는 부분에서는 불필요하게 for문을 썼음.
2. 자신의 코드를 한번 더 보며 정리를 한 이후 코드 리뷰를 했다면 더 좋았을 것.
3. 파일명 리턴함수와 확장자 리턴함수는 내용이 거의 동일한데 왜 굳이 따로 나누었나.
4. 사용자가 선택한 checkbox가 있는 tr을 구별할 때 checked 속성에 따라 솎아내기만 하면 될 터인데 불필요하게 name 값을 추가로 줬다.
name의 사용은 신중해야 함.

#### I선임님 Comment
1. for 문에 포함된 i를 꼭 필요로 하는 경우가 아니라면 for문을 쓰지 말 것.
2. 정리된 느낌은 좋으나 너무 함수를 나누려고 하지는 말 것

#### J선임님 Comment
1. 불러온 file 목록 생성하여 뿌리는 부분의 불필요하게 for문을 쓴 부분 개선.
2. while문 사용 -> 오류가 날 경우 시스템이 무한 루프에 빠질 수 있으므로 신중히 사용.

#### 주제 : 파일네이머
( 다크네이머 기능을 웹상에서 구현해보고자 함 :  웹 브라우저상에서 javascript만으로는 실제 파일명, 확장자 변경 어려우므로 패스. 변경하고자 하는 파일을 불러와 파일명,확장자,경로등을 일괄 변경하는 프로그램. 단일파일도 변경 가능 )

#### 기술요건 : 형변환 문자열 변환, 조합, 구조화, 기능별 분리하여 간결하게 작성하는데 초점
#### Suport Browser : 크롬, 파이어폭스, 사파리, 오페라, IE9 ~ 11
#### 기능설명 :
     0. 변경할 파일들을 input file 요소로 다중 선택.
     1. 선택한 요소들의 문자열 바꾸기
     2. 선택한 요소들의 앞이름 붙이기
     3. 선택한 요소들의 뒷이름 붙이기
     4. 선택한 요소들의 이름 지우기
     5. 선택한 요소들의 숫자만 남기기
     6. 선택한 요소들의 확장자 삭제
     7. 선택한 요소들의 확장자 추가
     8. 선택한 요소들의 확장자 변경
     9. 선택한 요소들의 오름차순, 내림차순 정렬
     10. 선택한 요소들의 해당 파일 마우스 우클릭시 파일명, 파일크기 표시
















