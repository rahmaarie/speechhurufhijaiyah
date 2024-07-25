// Meminta izin penggunaan mikrofon
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        console.log('You let me use your mic!');
    })
    .catch(function(err) {
        console.log('No mic for you!', err);
    });

// Speech to Text

var a = 1;
function runSpeechRecognition() {  	
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object


    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small>Silakan berbicara...</small>";
    };

    recognition.onspeechend = function() {
        action.innerHTML = "<small>Selesai...</small>";
        recognition.stop();
    };
    
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript.toLowerCase();
        output.innerHTML = transcript;
        console.log(transcript);
        output.classList.remove("hide");

        const foundLetter = hijaiyah.find(h => transcript.includes(h.name.toLowerCase()));
        if (foundLetter) {
            const imageContainer = document.getElementById("hijaiyah-image");
            imageContainer.innerHTML = `<img src="images/${foundLetter.name.toLowerCase()}.png" alt="${foundLetter.name}">`;
        } else {
            document.getElementById("hijaiyah-image").innerHTML = `<p>Huruf tidak ditemukan</p>`;
        }
    };
    
    
    // start recognition
    recognition.lang = 'id-ID';
    recognition.start();
}



// Data huruf hijaiyah
const hijaiyah = [
    { letter: "ا", name: "alif",image:"images/alif.png"},
    { letter: "ب", name: "bak", image:"images/bak.png"},
    { letter: "ت", name: "tak",image:"images/tak.png"},
    { letter: "ث", name: "sak",image:"images/sak.png"},
    { letter: "ج", name: "jym",image:"images/jim.png"},
    { letter: "ح", name: "qha",image:"images/ha.png" },
    { letter: "خ", name: "kho",image:"images/kho.png"},
    { letter: "د", name: "dal",image:"images/dal.png"},
    { letter: "ذ", name: "zal",image:"images/zal.png"},
    { letter: "ر", name: "rok",image:"images/rok.png"},
    { letter: "ز", name: "zai",image:"images/zai.png" },
    { letter: "س", name: "sin",image:"images/sin.png"},
    { letter: "ش", name: "swin",image:"images/swin.png"},
    { letter: "ص", name: "shod",image:"images/shod.png"},
    { letter: "ض", name: "dhod",image:"images/dhod.png"},
    { letter: "ط", name: "thok",image:"images/tho.png"},
    { letter: "ظ", name: "zhok",image:"images/dhlo.png" },
    { letter: "ع", name: "ain",image:"images/ain.png"},
    { letter: "غ", name: "goin",image:"images/goin.png"},
    { letter: "ف", name: "fak",image:"images/fak.png" },
    { letter: "ق", name: "qaf",image:"images/qof.png"},
    { letter: "ك", name: "kaf",image:"images/kaf.png"},
    { letter: "ل", name: "lam",image:"images/lam.png"},
    { letter: "م", name: "mim",image:"images/mim.png"},
    { letter: "ن", name: "nun",image:"images/nun.png"},
    { letter: "ه", name: "hak",image:"images/hak.png"},
    { letter: "و", name: "wawu",image:"images/wawu.png"},
    { letter: "ي", name: "yak",image:"images/yak.png"},
    { letter: "ء", name: "hamzah",image:"images/hamzah.png"}
];

// Speech to Text
function startRecording() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar-SA";

    recognition.onstart = () => {
        console.log("Voice recognition started. Try speaking into the microphone.");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        document.getElementById("recorded-text").textContent = transcript;

        const foundLetter = hijaiyah.find(h => transcript.includes(h.name));
        if (foundLetter) {
            const imageContainer = document.getElementById("hijaiyah-image");
            imageContainer.innerHTML = `<img src="${foundLetter.image}" alt="${foundLetter.name}">`;
        } else {
            document.getElementById("hijaiyah-image").innerHTML = `<p>Huruf tidak ditemukan</p>`;
        }
    };

    recognition.onerror = (event) => {
        console.error("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
        console.log("Voice recognition ended.");
    };

    recognition.start();
}
