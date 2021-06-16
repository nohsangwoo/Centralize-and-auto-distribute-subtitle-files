const express = require('express'); //express를 설치했기 때문에 가져올 수 있다.
const app = express();
const fs = require('fs');

require('dotenv').config();
// console.log('CLIENT_URL:', process.env.CLIENT_URL);
// console.log('NODE_ENV:', process.env.NODE_ENV);

const countrys = [
  'ar',
  'de',
  'en',
  'es',
  'fr',
  'ja',
  'ko',
  'pt-BR',
  'ru',
  'tr',
  'vi',
  'zh_TW',
  'zh',
];

// merge start!!
countrys.forEach(country => {
  const fileName = country + '.json';

  const platform = 'videohelpme';
  // client ko 가져오기
  const scriptFileOfClient = fs
    .readFileSync('./scriptFile/' + platform + '/client/' + fileName)
    .toString();

  const scriptFileOfSecond = fs
    .readFileSync('./scriptFile/' + platform + '/kt/' + fileName)
    .toString();

  // file merge를위한 object생성
  const scriptFileOfThird = fs
    .readFileSync('./scriptFile/' + platform + '/gc/' + fileName)
    .toString();

  // merge된 값으로 JSON파일 생성
  const totalSpreadFile = {
    ...JSON.parse(scriptFileOfClient),
    ...JSON.parse(scriptFileOfSecond),
    ...JSON.parse(scriptFileOfThird),
  };
  // console.log('원본: ', totalSpreadFile);

  fs.writeFileSync(
    './merged/videohelpme/' + fileName,
    JSON.stringify(totalSpreadFile)
  );
});
// end of merge

console.log('-------------------------------------');
console.log('-------------------------------------');

const book = {
  title: 'Ego is the Enermy',
  author: 'Ryan Holliday',
};

// 이하 메모용 코드
// 키값 찾기
console.log('title 키값 존재 유무 : ', book.hasOwnProperty('title'));

// 반복문 돌리려는 OBJECT 개수 구하기
const count = Object.keys(book).length;
console.log('오브젝트의 객체 속성 개수: ', count);

const findKey = Object.keys(book)[0];
console.log('n번째 키: ', findKey);

const findValue = book[findKey];
console.log('find Value: ', findValue);

console.log(book);

const bookJson = JSON.stringify(book);

// JSON 파일 생성
fs.writeFileSync('first-json.json', bookJson);

// JSON 파일 읽어오기 작업
// buffer데이터 읽어온다음 toString을 이용하여 stinrg 형태로 변환
const dataBuffer = fs.readFileSync('./test/test-json.json');
const dataJSON = dataBuffer.toString();

// const dataBuffer = fs.readFileSync("");

console.log(dataJSON);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000);
