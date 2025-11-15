// Plik script.js - KOMPLETNA WERSJA (RULOWANIE Z ZIELONYM PODŚWIETLENIEM I SŁONECZNIKIEM)

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('mainButton');
    const textElement = document.getElementById('mainText');
    const sunflower = document.getElementById('sunflower'); // Nowy element słonecznika
    const spotifyEmbed = document.getElementById('spotifyEmbed');

    // 1. Definicja stałych (Twoje spersonalizowane wartości)
    const targetText = "Miłego Dnia!";
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const rollDuration = 90; // Czas trwania pojedynczej klatki rulowania (wolniej niż 50ms)
    const rollCount = 7;      // Ile razy litera ma się przeturlać, zanim się ustali
    const transitionDuration = 300; // Czas animacji zanikania/pojawiania się (musi pasować do CSS)

    // GLOBALNY STAN:
    // Tablice do śledzenia wszystkich liter na stronie
    let currentText = Array(targetText.length).fill(' '); // Wyświetlane znaki (początkowo spacje)
    let resolvedLetters = Array(targetText.length).fill(false); // Które są już ustalone (początkowo żadne)
    
    // Funkcja generująca losowy znak
    const getRandomChar = () => {
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    };

    // Funkcja pomocnicza do renderowania tablicy liter jako HTML
    const renderText = () => {
        let htmlContent = '';
        currentText.forEach((char, index) => {
            // Dodajemy klasę '.resolved-char' tylko jeśli litera jest USTALONA
            let classes = resolvedLetters[index] ? 'resolved-char' : '';
            htmlContent += `<span class="${classes}">${char}</span>`;
        });
        textElement.innerHTML = htmlContent;
    };


    // FUNKCJA ANIMACYJNA RULOWANIA POJEDYNCZEJ LITERY
    const animateLetter = (index, callback) => {
        const originalText = Array.from(targetText); 
        
        // Zaczynamy rulowanie od losowego znaku
        currentText[index] = getRandomChar();
        let rollCounter = 0;
        
        const intervalId = setInterval(() => {
            
            if (rollCounter >= rollCount) {
                // FAZA USTALANIA: Koniec rulowania. Ustawiamy docelową literę.
                clearInterval(intervalId);
                
                currentText[index] = originalText[index]; // Ustaw literę docelową
                resolvedLetters[index] = true; // Zaznacz jako USTALONĄ
                
                renderText(); // Renderujemy tekst, co spowoduje dodanie zielonej klasy
                
                if (callback) callback();
                return;
            }

            // FAZA RULOWANIA: Zmień literę na losową
            currentText[index] = getRandomChar();
            
            // Renderujemy tekst, aby pokazać losowy znak
            renderText();
            rollCounter++;

        }, rollDuration);
    };
    
    // FUNKCJA ZARZĄDZAJĄCA CAŁĄ SEKWENCJĄ
    const startSequence = (index = 0) => {
        if (index >= targetText.length) {
            
            // KLUCZOWY MOMENT: Koniec animacji liter. Pokaż słonecznik.
            sunflower.classList.remove('hidden');
            // Aktywuj płynne pojawienie się
            setTimeout(() => {
                sunflower.style.opacity = '1';
            }, 50); 

            return; // Koniec animacji
        }

        // Pomiń spacje i znaki, które nie są w scrambleChars, ale nie są spacjami (jak wykrzyknik '!')
        const char = targetText[index];
        if (char === ' ' || scrambleChars.indexOf(char) === -1) {
            currentText[index] = char; // Ustaw znak (np. spację, !)
            resolvedLetters[index] = true;
            renderText(); 
            startSequence(index + 1);
            return;
        }

        animateLetter(index, () => {
            startSequence(index + 1);
        });
    };
    
    
    // 2. Obsługa kliknięcia przycisku
    
    // Inicjujemy początkowy widok pustymi polami (wymagane, by poprawnie użyć currentText)
    textElement.innerHTML = currentText.map(char => `<span>${char}</span>`).join('');
    // Upewnij się, że element sunflower jest na początku ukryty
    sunflower.classList.add('hidden');
    textElement.classList.add('hidden'); 

    button.addEventListener('click', () => {
        // Zabezpieczenie przed ponownym kliknięciem
        if (button.classList.contains('hidden')) return; 

        // 2a. Zanik przycisku
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)'; 

        const opoznienieZdjeciaMs = 7000;

        setTimeout(() => {
            button.classList.add('hidden'); 
            
            // 2b. Pojawienie się elementu tekstowego
            textElement.classList.remove('hidden'); 
            
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translate(-50%, -50%) scale(1)';
                
                // Rozpoczynamy animację rulowania
                startSequence();
                
            }, 50); 
            
        }, transitionDuration);

        setTimeout(() => {
            // 1. Usuń klasę ukrywającą
            mumin.classList.remove('hidden');
            
            // 2. Aktywuj płynne pojawienie się
            setTimeout(() => {
                mumin.style.opacity = '1';
            }, 50); // Małe opóźnienie, aby przeglądarka zarejestrowała usunięcie .hidden
            
                spotifyLink.classList.remove('hidden');
                setTimeout(() => { spotifyLink.style.opacity = '1'; }, 50);
        }, opoznienieZdjeciaMs);
    });
});