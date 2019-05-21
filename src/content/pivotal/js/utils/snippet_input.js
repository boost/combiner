
export default function snippetInput($input, message, selectAll = true) {
  function nextSelection($input) {
    const start = $input.val().search(/\[\w*\]/);
    console.log('start:', start);
    if (start !== -1) {
      const end = $input.val().indexOf(']', start) + 1;
      console.log('end:', end);

      $input[0].setSelectionRange(start, end);
    }
  }

  function interceptTab(e) {
    console.log('keydown:', e.keyCode);
    if (e.keyCode == 9) {
      console.log('keydown == 9:', e.keyCode);
      nextSelection($(this));
      e.preventDefault();
    }
  }

  function handleFocus() {
    if (!entirelySelected) {
      $(this)[0].setSelectionRange(0, $(this).val().length);
    }
  }

  // init context
  let entirelySelected = false;
  $input.val(message);
  if (selectAll) {
    entirelySelected = true;
    $input[0].setSelectionRange(0, $input.val().length);
  }

  // handle tab key default action
  $input.keydown(interceptTab);

  // highlight every if there is still some
  $input.focus(handleFocus);
}