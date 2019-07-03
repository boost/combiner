import $ from 'jquery';

export default function snippetInput($input, message, selectAll = true) {
  let nextSelection = $input => {
    const start = $input.val().search(/\{\w*\}/);
    if (start !== -1) {
      const end = $input.val().indexOf('}', start) + 1;
      $input[0].setSelectionRange(start, end);
    }
  };

  function interceptTab(e) {
    if (e.keyCode == 9) {
      nextSelection($(this));
      e.preventDefault();
    }
  }

  let handleFocus = () => {
    if (!selectedAll) {
      $(this)[0].setSelectionRange(0, $(this).val().length);
    }
  };

  // init context
  let selectedAll = false;
  $input.val(message);
  if (selectAll) {
    selectedAll = true;
    $input[0].setSelectionRange(0, $input.val().length);
  }

  // handle tab key default action
  $input.keydown(interceptTab);

  // highlight every if there is still some
  $input.focus(handleFocus);
}