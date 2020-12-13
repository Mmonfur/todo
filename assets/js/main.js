(function() {
    // Mock data. (teszt adat)
    let todos = [
        {title: 'Lunch', content: 'Lunch with my friends'},
        {title: 'Lunch', content: 'Lunch with my friends'},
        {title: 'Lunch', content: 'Lunch with my friends'},
      ];

    // Parts of date.
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'];

    // Localstorage handler object. A Local Storage olyan, mint egy adatbázis. 4 fő művelete van: create: új adat beszúrása, read: olvas belőle, update: meglévőt frissít, delete: töröl
    const localDB = { // Objektum, benne metódusok. 
        // localDB.setItem('todos', todos) // Tároljuk le a Local Strorage-ba (stringként van eltárolva) -> F12 Application fül Local Storage
        setItem(key, value) { // Az első metódus elmenti (beállítja) az adatot a localstorage-ba. key: adat név, value: adat érték. 
            value = JSON.stringify(value); //value-t átalakítjuk json formátummá, hogy string legyen. Local Storage-ban nem lehet tömb vagy objektum, csak string. 
            //A JSON stringify metódus objektumbból v. tömbből csinál stringet. Azért, hogy el tudjuk küldeni. Utána visszaalakítjuk a JSON.parse metódussal objektummá.         
            localStorage.setItem(key, value); // CREATE, UPDATE egyben megoldva.
        },
        // console.log( localDB.getItem('todos')); // Adat visszaolvasása Local Strorage-ból, visszaadja parse-olva, újra tömbként.
        getItem(key) {  // VISSZAOLVASSA az adatot, ilyenkor már nem kell az érték, csak h mit akarok (kell a kulcs).
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }  // Csak akkor parse-olunk, ha van value

            return JSON.parse(value); // A parse visszaalakítja (objektummá/tömbbé) a json fájlt.
        },
        // localDB.removeItem('todos'); // Törli a Local Storage-ból
        removeItem(key) {  // TÖRÖL
            localStorage.removeItem(key);
        }

    };

    // Initialize application. Applikáció ellenőrzése: van-e mentett teendő, ha igen, meghívja a Local Storage-ból.

    const init = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        };

        showDate();
    };

    // Show date.
    
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getFullYear(), 
            currentDate.getMonth() + 1, 
            currentDate.getDate()
        ].map( num => num < 10 ? `0${num}`: num ); // Kicseréli a tömb elemeit. Array.map működése:A map egy fv-t vár, ennek egyesével odaadja az elemeket, a fv. csinál vmit, visszaadja az új elemeket

        bodyDay.textContent = dayNames[currentDate.getDay()]; // Megvan a nap neve. 
        bodyDate.textContent = day.join('-') // joinolja a dátumot kötőjellel
             
    };

    
    init();

})();