const { Cc, Ci } = require('chrome');
const { ToggleButton } = require('sdk/ui/button/toggle');

const nsIFilePicker = Ci.nsIFilePicker;

let wm = Cc['@mozilla.org/appshell/window-mediator;1']
         .getService(Ci.nsIWindowMediator);
let win = wm.getMostRecentWindow('navigator:browser');
let tabbrowser = win.gBrowser;

let button = ToggleButton({
  id: 'openpics',
  label: 'openpics',
  icon: './play.png',
  onChange: open
});

function open() {
  let fp = Cc['@mozilla.org/filepicker;1']
           .createInstance(Ci.nsIFilePicker);
  fp.init(win, 'Pick pictures', nsIFilePicker.modeOpenMultiple);
  fp.appendFilters(nsIFilePicker.filterALL | nsIFilePicker.filterImages);

  console.log('opening...');
  let rv = fp.show();
  if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
    console.log('everything alright');
    let files = fp.files;
    while (files.hasMoreElements()) {
      let arg = files.getNext().QueryInterface(Ci.nsILocalFile).path;
      tabbrowser.addTab(arg);
    }
  }
}
