(function(chrome){

var data = {
  htmlPage: "./app/index.html",
  width: 800,
  height: 500,
  firebaseUrl: '<FIREBASE_REF>',
  iconUrl: "../icon.png"
}

function createWindow() {
  chrome.windows.create({
      url: data.htmlPage,
      type: "panel",
      width: data.width,
      height: data.height
  });
};

function add(info,tab) {
  var firebaseRef = new Firebase(data.firebaseUrl);
  firebaseRef.push({name: tab.title, url: tab.url});
  firebaseRef.limitToLast(1).on('value', function(snapshot) {
    new_note(snapshot);
    console.log(snapshot);
  })
}

chrome.contextMenus.create({
  title: "Share this Page", 
  contexts:["all"],
  onclick: add
});

chrome.browserAction.onClicked.addListener(function(tabs) {
  createWindow();
});

function new_note(snapshot) {
  var msg = null;
  var url = null;
  for (var key in snapshot.val()) {
    msg = snapshot.val()[key].name;
    url = snapshot.val()[key].url;
  }
  var id = {
    type: "basic",
    title: "New Bookmark Added",
    message: msg,
    iconUrl: data.iconUrl,
    isClickable: true
  }
  chrome.notifications.create(id);

  chrome.notifications.onClicked.addListener(function(callback) {
    chrome.tabs.create({
      url: url,
      active: true
    });
  });
};
  
}(chrome))