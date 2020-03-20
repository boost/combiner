import $ from 'jquery';

export default function snippetInput($input, message) {
  let nextSelection = ($input, caretPosition) => {
    const matches = [...$input.val().matchAll(/\{\w*\}/g)]
    if (matches.length == 0) return false;

    let nextMatch = matches.filter(item => item['index'] > caretPosition)[0]
    if (nextMatch == undefined) {
      nextMatch = matches[0];
    }

    const start = nextMatch['index'];
    const end = $input.val().indexOf('}', start) + 1;
    $input[0].setSelectionRange(start, end);

    return true;
  };

  function interceptTab(e) {
    if (e.keyCode == 9 && nextSelection($(this), e.target.selectionStart)) {
      e.preventDefault();
    }
  }

  // init context
  let selectedAll = false;
  $input.val(message);
  nextSelection($input, -1);

  // handle tab key default action
  $input.keydown(interceptTab);
}
