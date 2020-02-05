import '../css/style.scss';

const arr = [1,2,3];
console.log(`Is array: ${arr instanceof Array}`);


function modifyDom() {
    document.body.append(document.createTextNode('Drop a line'));
}

document.body.append(
    document.createTextNode('Loaded successfully')
);

// const w = window.open("about:blank");

let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);

// let a = 3;

// newWindow.onload = function() {
//   let html = `<div style="font-size:30px">Welcome! ${arr instanceof newWindow.Array}</div>`;
//   newWindow.document.body.insertAdjacentHTML('afterbegin', html);
//   modifyDom();
// };


// let w = open('http://localhost:8080/popup', 'example', 'width=300,height=300,location')
// w.focus();
// w.document.write("Hello, world!");
// w.onload = function() {
//     let html = `<div style="font-size:30px">Welcome!</div>`;
//     w.document.body.insertAdjacentHTML('afterbegin', html);
// };

// w.onload = function()
// {
//     alert('Hello');
//     console.assert(Array.isArray(arguments) === false, 'In fact, arguments is a true array');
//     console.assert(Array.isArray(new w.Array) === true, 'w.Array is not an array');
// };
