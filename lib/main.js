const { Cc, Ci } = require('chrome');
const { ActionButton } = require('sdk/ui/button/action');

const nsIFilePicker = Ci.nsIFilePicker;

let button = ActionButton({
  id: 'openpics',
  label: 'openpics',
  icon: './icon.png',
  onClick: open
});

function open() {
  let wm = Cc['@mozilla.org/appshell/window-mediator;1']
         .getService(Ci.nsIWindowMediator);
  let win = wm.getMostRecentWindow('navigator:browser');
  let tabbrowser = win.gBrowser;

  let fp = Cc['@mozilla.org/filepicker;1']
           .createInstance(Ci.nsIFilePicker);
  fp.init(win, 'Pick pictures', nsIFilePicker.modeOpenMultiple);
  fp.appendFilters(nsIFilePicker.filterALL | nsIFilePicker.filterImages);

  let rv = fp.show();
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
    let files = fp.files;
    while (files.hasMoreElements()) {
      let arg = files.getNext().QueryInterface(Ci.nsILocalFile).path;
      tabbrowser.addTab(arg);
    }
  }
}
