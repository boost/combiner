import $ from 'jquery';

export default function snippetInput($_input, message, selectFirst = true) {
  const $input = $_input;

  const buildSelections = (text, caret) => {
    const delimiters = ['<', '>'];
    const regex = new RegExp(`${delimiters[0]}[^${delimiters[1]}]*${delimiters[1]}`, 'g');

    return [...text.matchAll(regex)].map((match) => {
      return {
        start: match.index,
        end: match.index + match[0].length
      }
    }).sort((s1, s2) => {
      if (s1.start == caret) return 1;
      if (s2.start == caret) return -1;

      if (s1.start < caret && caret < s2.start) return 1;
      if (s2.start < caret && caret < s1.start) return -1;

      if (caret < s1.start && s1.start < s2.start) return -1;
      if (caret < s2.start && s2.start < s1.start) return 1;

      if (s1.start < s2.start && s2.start < caret) return -1;
      if (s2.start < s1.start && s1.start < caret) return 1;
      return 0;
    });
  }

  const selectNext = (selections) => {
    $input[0].setSelectionRange(selections[0].start, selections[0].end);
  };

  const selectPrevious = (selections) => {
    const index = selections.length > 1 ? selections.length - 2 : 0;
    const selection = selections[index];
    $input[0].setSelectionRange(selection.start, selection.end);
  }

  function handleSelections(e) {
    const selections = buildSelections($input.val(), e.target.selectionStart);

    if (selections.length > 0 && e.keyCode == 9) e.preventDefault();

    if (e.keyCode == 9 && !e.shiftKey) {
      selectNext(selections)
    }

    if (e.keyCode == 9 && e.shiftKey) {
      selectPrevious(selections)
    }
  }

  // init context
  $input.val(message);
  if (selectFirst) {
    const selections = buildSelections(message, -1);
    selectNext(selections);
  }

  // handle tab key default action
  $input.keydown(handleSelections);
}
