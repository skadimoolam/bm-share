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
  // console.log(msg);
  // console.log(typeof msg);
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

// chrome.windows.getAll({populate: true}, function(windows) {
//   windows = windows[0].tabs;
//   for (var i = 0; i < windows.length; i++) {
//     var
//       windowUrl = windows[i].url,
//       windowId = windows[i].id;

//     console.log(windowUrl);
//     chrome.pageAction.show(windowId);
//     // if () {};
//     chrome.pageAction.setIcon({tabId: windowId, path: "../icon_black.png"});
//   };
// });

// chrome.pageAction.onClicked.addListener(function(tab) {
//   chrome.pageAction.setIcon({tabId: tab.id, path: "../icon.png"});
// })
  
}(chrome))