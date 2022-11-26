let myH1 = document.querySelector('.judul');

function generateKey(str, key) {

  key = key.split("");
  if (str.length == key.length)
    return key.join("");
  else {
    let temp = key.length;
    for (let i = 0; i < (str.length - temp); i++) {

      key.push(key[i % ((key).length)])
    }
  }
  return key.join("");
}

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push({
      value: val,
      index: i
    });
  }
  return indexes;
}

function encode() {
  let text = document.querySelector('.text').value;
  let key = document.querySelector('.key').value;
  let result = document.querySelector('.result');

  if (!text || !key) {
    alert('text atau key tidak boleh kosong!');
    return;
  }

  if (key.length > text.length) {
    alert('key tidak bisa lebih panjang dari text');
    return;
  }

  text = text.split('');
  let charIndex = 0;
  let charValue = '';
  let symbolDict = getAllIndexes(text,);

  let upperText = [];
  for (let i = 0; i < text.length; i++) {
    charIndex = i;
    charValue = text[i];
    if (!/^[a-zA-Z]*$/.test(text[i])) {
      // console.log(text.indexOf(char, charIndex + 1));
      symbolDict.push({
        value: charValue,
        index: charIndex
      })
    }
    if (/^[A-Z]*$/.test(text[i])) {
      upperText.push(charIndex)
    }
  };
  console.log(symbolDict)
  console.log(upperText)

  text = text.join('').replace(/[^a-zA-Z]+/g, '').toLowerCase();

  key = generateKey(text, key).toLowerCase();

  
  console.log(text);
  console.log(key);

  let cipherText = '';
  let calculated = 0;
  for (let i = 0; i < text.length; i++) {

    // console.log(text.charCodeAt(i));
    // console.log(key.charCodeAt(i));
    calculated = (text.charCodeAt(i) + key.charCodeAt(i) - 194) % 26;
    cipherText += String.fromCharCode(calculated + 97);
  }

  for(let i in symbolDict){
    cipherText = cipherText.slice(0, symbolDict[i]['index']) + symbolDict[i]['value'] + cipherText.slice(symbolDict[i]['index'])
  }

  cipherText = cipherText.split('');
  for(let i in upperText){
    cipherText[upperText[i]] = cipherText[upperText[i ]].toUpperCase();
  }
  cipherText = cipherText.join('');
  result.innerHTML = cipherText;
}

function decode() {
  const text = document.querySelector('.text').value;
  const key = document.querySelector('.key').value;
  console.log(text);
  console.log(key);
}

function showEncode() {
  const encodeDiv = document.querySelector('.encodeDiv');
  const decodeDiv = document.querySelector('.decodeDiv');

  encodeDiv.style.display = "block";
  decodeDiv.style.display = "none"
}

function showDecode() {
  const encodeDiv = document.querySelector('.encodeDiv');
  const decodeDiv = document.querySelector('.decodeDiv');

  encodeDiv.style.display = "none";
  decodeDiv.style.display = "block"
}