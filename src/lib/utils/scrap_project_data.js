import $ from 'jquery';

const scrapProjectData = ($el = null) => {
  var $header;

  if (/\/workspaces\/\d+\/?$/.test(window.location.href)) {
    $header = $el.parents('.panel').find('.panel_header_container');
    return {
      id: parseInt($header.find('.panel_header a.velocity').attr('data-project-id')),
      name: $header.find('.workspace_header h3').text()
    };
  } else {
    return {
      id: parseInt(window.location.pathname.match(/projects\/(\d+)/)[1]),
      name: $('.raw_context_name').eq(0).text()
    };
  }
};

export default scrapProjectData;
