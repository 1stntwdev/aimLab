// OOP
const name= ['John', 'Jane', 'Doe'];
const age= [25, 30, 22];

const [firstName, secondName, thirdName]= name;
console.log(secondName); // John

const person = {
  name: 'Alice',
  age: 28,
  city: 'New York'
,carreer:[
  {title: 'Engineer'},
  {title: 'Tech Corp'}
]};

const {name:personName, age: personAge ,city:city 
  ,carreer:[ {title:firstCarreer}, {title:secondCarreer} ]
}= person;
console.log(person.carreer[0].title); 
console.log(secondCarreer)
function showPersonInfo({brand = "unknown", model = "unknown", year = "unknown"} = {} ) {
  console.log(`Name: ${name}, Age: ${age}, City: ${city}`);
}
showPersonInfo()

const abc = ["a", "b", "c", "d", "e"];
const  xyz = ["x", "y", "z"];
const combined = [...abc, ...xyz];
console.log(combined); // ["a", "b", "c", "d", "e", "x", "y", "z"]