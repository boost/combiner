import $ from "jquery";
import runAddStory from "./add_story";
import runCommentTemplate from "./comment_template";

let waitForStoriesThenRun = () => {
  let $stories = $(".story.model");

  if (!$stories.length) {
    return setTimeout(waitForStoriesThenRun, 250);
  }

  runCommentTemplate();
  runAddStory();
};

$(function () {
  waitForStoriesThenRun();
});
