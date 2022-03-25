let stillCheck = false;
let stillCheckName = true;
let saveResonse;
let responseName;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    saveResponse = sendResponse('我收到你的消息了：'+JSON.stringify("request"));
});

let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        checkForName();
        if (!mutation.addedNodes) return
        if (!stillCheck) {
            observer.disconnect();
        }
    })
  })
  
  observer.observe(document.body, {
      childList: true
    , subtree: true
    , attributes: false
    , characterData: false
  })

function notifyBrowser(title, desc, url) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notification = new Notification(title, {
            icon: 'https://pm1.narvii.com/6789/408d166b0d15f7f4aab6c58a287bf6738f8f4ca5v2_128.jpg',
            body: desc,
        });
        /* Remove the notification from Notification Center when clicked.*/
        notification.onclick = function() {
            window.open(url);
        };
        /* Callback function when the notification is closed. */
        notification.onclose = function() {
        };
    }
}

function checkForName() {
    //console.log('check for name started...');
    if (document.getElementsByClassName('truncate color_classes__color-regular___ok4If Text__large___sIzY0 Text__block___2LnxD').length > 0) {
        let htmlNodeForName = document.getElementsByClassName('truncate color_classes__color-regular___ok4If Text__large___sIzY0 Text__block___2LnxD');
        Array.from(htmlNodeForName).forEach((i) => {
            if (i.innerText) {
                if (responseName == undefined) {
                    getUserName('name', i);
                } 
            }
        });
    } else if (stillCheckName) {
        setTimeout(checkForName, 500);
    }
}

function checkForIncident() {
    console.log('cfi runs')
    //possible fix to getting notifications with nothing actually in the que
    if (document.querySelectorAll('[id^=incident]').length > 1) {
        shouldNotify();
    } else {
        //old, usually name loads first, keeping to double check
        setTimeout(checkForIncident, 8000);
        return false;
    }
}

function shouldNotify() {
    console.log(`checking shouldNotify, sc: ${stillCheck} scn: ${stillCheckName}`)
    if (stillCheck && stillCheckName) {
        chrome.runtime.sendMessage('cliaehbjehgfgjodigeoimfdjkdopbko', {command: 'winNotification'});
        stillCheck = false;
        notifyBrowser('hi', 'hi', 'hi');
    }
}

function getUserName(key, i) {
    const editorExtensionId = 'cliaehbjehgfgjodigeoimfdjkdopbko';
    chrome.runtime.sendMessage(editorExtensionId, {command: 'name'},
        (response) => {
            if (response != null && response != undefined && i) {
                console.log(`inner: ${i.innerText} compared to response: ${responseName}`)
                if (i.innerText == responseName) {
                    console.log('name check hits true');
                    stillCheckName = false;
                    stillCheck = false;
                } else if (stillCheckName) {
                    console.log('name chk else')
                    stillCheck = true;
                    checkForIncident();
                }
                responseName = response;
            } else {
                setTimeout(setTimeGName, 6000, key);
            }
        });
};

function setTimeGName (key) {
    getUserName(key);
}