const express = require("express");
const app = express();
const fs = require("fs/promises");

fs.readFile("file1.txt", "utf-8")
    .then((data1) => {
  console.log("Zawartość file1.txt:", data1); // Wyświetlamy zawartość file1.txt

        return fs.readFile("file2.txt", "utf-8")
            .then((data2) => {
    console.log("Zawartość file2.txt:", data2); // Wyświetlamy zawartość file2.txt

    // Łączymy zawartość obu plików
    const mergedData = data1 + "\n" + data2;
    console.log(mergedData); //
    // Zapisujemy połączoną zawartość do pliku result.txt
                return fs.writeFile("result.txt", mergedData);
                
    });
        
})
.then(() => {
    // Po zapisaniu pliku wyświetlamy komunikat o sukcesie
    console.log('Operacja zakończona pomyślnie, wynik zapisany w result.txt');
  })
  .catch((error) => {
    // Obsługa błędów
    console.error('Błąd podczas przetwarzania plików:', error);
  });

