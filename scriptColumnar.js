function process() {
  let encodeBtn = document.querySelector('#showEncode');
  let decodeBtn = document.querySelector('#showDecode');
  if (encodeBtn.checked) {
    encode();
  }
  if (decodeBtn.checked) {
    decode();
  }
}

function encode() {
  const key = document.querySelector('#key').value.toUpperCase();
  const text = document.querySelector('#text').value;
  const resultBox = document.querySelector('#result');
  let cipher = "";
  let k_index = 0;
  let text_len = parseFloat(text.length)
  let text_list = text.split("");
  let key_list = key.split("").sort();

  let col = key.length;
  let row = parseInt(Math.ceil(text_len / col));

  let fill_missing = parseInt((row * col) - text_len);
  for (let i = 0; i < fill_missing; i++) {
    text_list.push('_')
  }

  let matrix = [];
  let rowMatrix = [];
  let textIndex = 0;
  for (let i = 0; i < row; i++) {
    rowMatrix = [];
    for (let j = 0; j < col; j++) {
      rowMatrix.push(text_list[textIndex]);
      textIndex++;
    }
    matrix.push(rowMatrix)
  }

  let curr_idx;
  for (let i = 0; i < matrix[0].length; i++) {
    curr_idx = key.indexOf(key_list[k_index]);
    // console.log(curr_idx);
    for (let j in matrix) {
      cipher += matrix[j][curr_idx]
    }
    k_index += 1;
  }

  // console.log(key_list)
  // console.log(matrix)
  // console.log(cipher)
  resultBox.innerHTML = cipher;
}

function decode() {
  const key = document.querySelector('#key').value.toUpperCase();
  const text = document.querySelector('#text').value;
  const resultBox = document.querySelector('#result');
  let decoded = "";
  let text_index = 0;
  let text_len = parseFloat(text.length)
  let text_list = text.split("");
  let k_index = 0;
  let col = key.length;
  let row = parseInt(Math.ceil(text_len / col));
  let key_list = key.split("").sort();
  let dec_cipher = [];
  let row_dec_cipher = [];

  for (let i = 0; i < row; i++) {
    row_dec_cipher = [];
    for (let j = 0; j < col; j++) {
      row_dec_cipher.push('.');
    }
    dec_cipher.push(row_dec_cipher);
    
  }

  let curr_idx;
  for (let i = 0; i < col; i++) {
    curr_idx = key.indexOf(key_list[k_index]);

    for (let j = 0; j < row; j++) {
      dec_cipher[j][curr_idx] = text_list[text_index];
      text_index += 1;
    }
    k_index += 1;
  }
  
  // decoded = dec_cipher.join('');
  dec_cipher.forEach(function (row){
    decoded += row.join('');
  })

  resultBox.innerHTML = decoded;
}

function changeLabel() {
  let textLabel = document.querySelector('.text-label');
  let resultLabel = document.querySelector('.result-label');
  let encodeBtn = document.querySelector('#showEncode');
  let decodeBtn = document.querySelector('#showDecode');
  if (encodeBtn.checked) {
    textLabel.innerHTML = 'PlainText:';
    resultLabel.innerHTML = 'CipherText:';
  }
  if (decodeBtn.checked) {
    textLabel.innerHTML = 'CipherText:';
    resultLabel.innerHTML = 'PlainText:';
  }

}