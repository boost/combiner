console.log('ready');
let url_param = name => {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}

const subject = url_param('subject');
const message = url_param('message');

console.log('subject:', subject);
console.log('message:', message);
console.log('content:')

document.getElementByName('message[subject]')[0].value = subject;
console.log('content:', document.getElementByName('message[content]')[0].value)
document.getElementByName('message[content]')[0].value = message;
