#StyleSheet의 width,height와 background position 값을 2분의 1로 축소시키는 js

아이콘을 집어넣으면 sprite 이미지로 만들어주는 툴이 여러가지 있다.
해당 툴에서 다운받은 sprite 이미지와 css를 모바일 페이지에서 사용하려면 각 값들을 모두 2분의 1로 만들어야 한다.
이를 위해 js로 각 값들을 모두 축소시켜보자

##방법
1. 기존 css를 Array로 정렬하여 정규식을 이용하여 치환하는 방법
2. document의 styleSheet 객체를 이용하는 방법