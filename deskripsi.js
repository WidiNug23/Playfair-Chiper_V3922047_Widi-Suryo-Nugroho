/**
 * Fungsi untuk membuat matriks kunci Playfair Cipher.
 * @returns {Array} Matriks kunci yang telah dibuat.
 */
function createMatrix() {
  return [
    ['K', 'U', 'L', 'I', 'A'],
    ['H', 'B', 'R', 'C', 'D'],
    ['E', 'F', 'G', 'M', 'N'],
    ['O', 'P', 'Q', 'S', 'T'],
    ['V', 'W', 'X', 'Y', 'Z']
  ];
}

/**
 * Fungsi untuk mencari indeks karakter dalam matriks.
 * @param {Array} matrix - Matriks untuk pencarian.
 * @param {string} char - Karakter yang dicari.
 * @returns {Object|null} Objek berisi indeks baris dan kolom jika ditemukan, atau null jika tidak ditemukan.
 */
function findCharIndex(matrix, char) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return { row: i, col: j };
      }
    }
  }
  return null;
}

/**
 * Fungsi untuk melakukan enkripsi teks menggunakan metode Playfair Cipher.
 * @param {string} plaintext - Teks yang akan dienkripsi.
 * @param {Array} matrix - Matriks kunci untuk enkripsi.
 * @returns {string} Teks yang telah dienkripsi.
 */
function playfairEncrypt(plaintext, matrix) {
  let encryptedText = '';

  for (let i = 0; i < plaintext.length; i += 2) {
    let char1 = plaintext[i].toUpperCase();
    let char2 = i + 1 < plaintext.length ? plaintext[i + 1].toUpperCase() : 'X';

    if (char1 === char2) {
      char2 = 'X';
      i--;
    }

    let index1 = findCharIndex(matrix, char1);
    let index2 = findCharIndex(matrix, char2);

    if (index1 && index2) {
      if (index1.row === index2.row) {
        encryptedText += matrix[index1.row][(index1.col - 1 + 5) % 5];
        encryptedText += matrix[index2.row][(index2.col - 1 + 5) % 5];
      } else if (index1.col === index2.col) {
        encryptedText += matrix[(index1.row - 1 + 5) % 5][index1.col];
        encryptedText += matrix[(index2.row - 1 + 5) % 5][index2.col];
      } else {
        encryptedText += matrix[index1.row][index2.col];
        encryptedText += matrix[index2.row][index1.col];
      }
    }
  }

  return encryptedText;
}

// Membuat matriks kunci
let matrixKey = createMatrix();

// Contoh penggunaan
let ciphertext = "DKCLUKSCQIUCLBTDYCTEKI";
let decryptedText = playfairEncrypt(ciphertext, matrixKey);

console.log(`Ciphertext: ${ciphertext}`);
console.log('Matrix Key:');
console.log(matrixKey.map(row => row.join(' ')).join('\n'));
console.log(`Decrypted Text: ${decryptedText}`);
