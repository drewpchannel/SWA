let nameReceived;

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('Settings');
    button.addEventListener('click', function () {
        if (!document.getElementById('input')) {
            var input = document.createElement("input");
            input.id = 'input';
            input.type = "text";
            container.appendChild(input);
            var okButton = document.createElement('button');
            okButton.addEventListener('click', () => {chromeSet("name", input.value)});
            okButton.innerText = 'OK';
            okButton.class="btn btn-primary";
            container.appendChild(okButton);
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse(chromeGet('name'));
    if(message.sound == 'sound') {
        playMario().play();
    }
    if (message.name == 'name') {
        
    }
});

function chromeSet (key, value) {
    chrome.storage.local.set({[key]: value}, function() {
        //console.log('Value is set to ' + value);
    });
}

function chromeGet (key) {
    chrome.storage.local.get(key, function(result) {
        nameReceived = result.name;
    });
    return nameReceived;
}

function playMario() {
    var audio = new Audio('audio/drm64_mario3.wav');
    return audio;
}