import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { buildStoryUrl } from 'utils/pivotal';

class StoryDetailsEdit extends Component {
  render() {
    return (
      <li className="story expanded">
        <section className="story_details">
          <form action="#" className="story model">
            <section className="story_header grid-x">
              <button className="collapser cell shrink"></button>
              <fieldset className="name cell auto">
                <TextareaAutosize rows="1" className="story-name-textarea" defaultValue={this.props.name} />
              </fieldset>
              <a href={buildStoryUrl(this.props)} type="button" className="open-story cell shrink" title="Switch to a full page view of this story"></a>
            </section>
            <aside>
              <div className="wrapper">
                <nav className="edit">
                  <section className="controls">
                    <div className="persistence use_click_to_copy">
                      <button className="autosaves button std close" type="submit" id="story_close_c743" tabIndex="-1">Close</button>
                    </div>
                    <div className="actions">
                      <div className="bubble"></div>
                      <button type="button" title="Copy this story's link to your clipboard" id="story_copy_link_c743" data-clipboard-text="https://www.pivotaltracker.com/story/show/166598003" className="autosaves clipboard_button hoverable link left_endcap" tabIndex="-1"></button>
                      <div className="button_with_field">
                        <button type="button" title="Copy this story's ID to your clipboard" id="story_copy_id_c743" data-clipboard-text="#166598003" className="autosaves clipboard_button hoverable id use_click_to_copy" tabIndex="-1"></button>
                        <input type="text" readonly="" className="autosaves id text_value" id="story_copy_id_value_c743" value="#166598003" aria-label="story id" />
                      </div>
                      <button type="button" title="Clone this story" className="autosaves clone_story hoverable left_endcap" id="story_clone_button_c743" tabIndex="-1"></button>
                      <button type="button" title="View the history of this story" className="autosaves history hoverable capped" id="story_history_button_c743" tabIndex="-1"></button>
                      <button type="button" title="Delete this story" className="autosaves delete hoverable right_endcap" id="story_delete_button_c743" tabIndex="-1"></button>
                      <div className="harvest-timer harvest-timer-expanded" data-uid="timer_1" data-group="{&quot;id&quot;:2320112,&quot;name&quot;:&quot;Timesheeting Project&quot;}" data-item="{&quot;id&quot;:166598003,&quot;name&quot;:&quot;{this.props.name} https://www.pivotaltracker.com/story/show/166598003&quot;}" data-listening="true"></div>
                    </div>
                  </section>
                </nav>
                <div className="info_box_wrapper">
                  <div className="story state_box">
                    <div className="state row">
                      <div className="StoryState___2vkCAl9L" data-aid="StoryState">
                        <em>State</em>
                        <div className="Dropdown StoryState__dropdown___3GU-2fu0">
                          <div className="Dropdown__content" data-aid="StoryState__dropdown">
                            <button className="SMkCk__Button _3INnV__Button--default Dropdown__button StoryState__dropdownButton___LdR9Y07L" tabIndex="0" type="button">
                              <span className="StoryState__dropdown--label___3qsLBfq3" data-aid="StoryState__dropdown--label">Started


                                <img src="//assets.pivotaltracker.com/next/assets/next/aa0730f7-arrow-light.svg" alt="" />
                              </span>
                            </button>
                          </div>
                        </div>
                        <span className="state">
                          <label data-aid="StateButton" data-destination-state="finish" className="state button finish" tabIndex="-1">Finish</label>
                        </span>
                      </div>
                    </div>
                    <div className="reviews">
                      <div className="Reviews___3RL2ODu6" data-aid="Reviews">
                        <div className="Reviews__controls___2HDGtk0b">
                          <div className="Reviews__label___3eZCCaQO">Reviews</div>
                          <div className="Dropdown">
                            <div className="Dropdown__content" data-aid="Reviews__addReview">
                              <button className="SMkCk__Button _3INnV__Button--default Dropdown__button Reviews__addReview___2qS8cLCf" aria-label="Reviews" type="button">
                                <span className="Reviews__addReview--plus___1RlRoYng">+</span>
                                <span>&nbsp;add review</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="ReviewEdit__container___3nAhGxKW" data-aid="AssignedReviews__row">
                            <label className="ReviewEdit__label___2FU4eA77">Code</label>
                            <div className="ReviewEdit__reviewer___3h4YCeqe">
                              <div className="Dropdown">
                                <div className="Dropdown__content">
                                  <a href="#" data-aid="DropdownClickableTarget" className="Dropdown__clickableTarget">
                                    <div className="FilterableMembershipDropdown__button___11eDzE-b">Reviewer


                                      <img className="FilterableMembershipDropdown__buttonImage___27XDX82x" src="//assets.pivotaltracker.com/next/assets/next/06aa1814-arrow-dark.svg" aria-label="members" />
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="ReviewEdit__separator___dBFYmXcB">&nbsp;</div>
                            <div className="ReviewEdit__status___2W2w4Wmv">
                              <div className="Dropdown">
                                <div className="Dropdown__content">
                                  <button className="SMkCk__Button _3INnV__Button--default Dropdown__button ReviewEdit__statusButton___2Zjs7mYj" type="button">
                                    <img src="//assets.pivotaltracker.com/next/assets/next/a1f787e9-reviews-unstarted.svg" aria-label="unstarted" />
                                    <img className="ReviewEdit__buttonArrow___3-HrXEu4" src="//assets.pivotaltracker.com/next/assets/next/06aa1814-arrow-dark.svg" aria-label="review type" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="story info_box">
                    <div className="info">
                      <div className="type row">
                        <em>Story Type</em>
                        <div className="dropdown story_type">
                          <input aria-hidden="true" type="hidden" name="story[story_type]" value="feature" />
                          <input aria-hidden="true" type="text" id="story_type_dropdown_c743_honeypot" tabIndex="0" className="honeypot" />
                          <a id="story_type_dropdown_c743" className="selection item_feature" tabIndex="-1">
                            <span>feature</span>
                          </a>
                          <a id="story_type_dropdown_c743_arrow" className="arrow target" tabIndex="-1"></a>
                          <section>
                            <div className="dropdown_menu search">
                              <div className="search_item">
                                <input aria-label="search" type="text" id="story_type_dropdown_c743_search" className="search" />
                              </div>
                              <ul>
                                <li className="no_search_results hidden">No results match.</li>
                                <li data-value="feature" data-index="1" className="dropdown_item selected">
                                  <a className="item_feature " id="feature_story_type_dropdown_c743" href="#">
                                    <span className="dropdown_label">feature</span>
                                  </a>
                                </li>
                                <li data-value="bug" data-index="2" className="dropdown_item">
                                  <a className="item_bug " id="bug_story_type_dropdown_c743" href="#">
                                    <span className="dropdown_label">bug</span>
                                  </a>
                                </li>
                                <li data-value="chore" data-index="3" className="dropdown_item">
                                  <a className="item_chore " id="chore_story_type_dropdown_c743" href="#">
                                    <span className="dropdown_label">chore</span>
                                  </a>
                                </li>
                                <li data-value="release" data-index="4" className="dropdown_item">
                                  <a className="item_release " id="release_story_type_dropdown_c743" href="#">
                                    <span className="dropdown_label">release</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="estimate row">
                        <em>Points</em>
                        <div className="dropdown story_estimate">
                          <input aria-hidden="true" type="hidden" name="story[estimate]" value="1" data-type="number" />
                          <input aria-hidden="true" type="text" id="story_estimate_dropdown_c743_honeypot" tabIndex="0" className="honeypot" />
                          <a id="story_estimate_dropdown_c743" className="selection item_1" tabIndex="-1">
                            <span>1 point</span>
                          </a>
                          <a id="story_estimate_dropdown_c743_arrow" className="arrow target" tabIndex="-1"></a>
                          <section>
                            <div className="dropdown_menu search">
                              <div className="search_item">
                                <input aria-label="search" type="text" id="story_estimate_dropdown_c743_search" className="search" />
                              </div>
                              <ul>
                                <li className="no_search_results hidden">No results match.</li>
                                <li data-value="0" data-index="1" className="dropdown_item">
                                  <a className="item_0 " id="0_story_estimate_dropdown_c743" href="#">
                                    <span className="dropdown_label">0 points</span>
                                  </a>
                                </li>
                                <li data-value="1" data-index="2" className="dropdown_item selected">
                                  <a className="item_1 " id="1_story_estimate_dropdown_c743" href="#">
                                    <span className="dropdown_label">1 point</span>
                                  </a>
                                </li>
                                <li data-value="2" data-index="3" className="dropdown_item">
                                  <a className="item_2 " id="2_story_estimate_dropdown_c743" href="#">
                                    <span className="dropdown_label">2 points</span>
                                  </a>
                                </li>
                                <li data-value="3" data-index="4" className="dropdown_item">
                                  <a className="item_3 " id="3_story_estimate_dropdown_c743" href="#">
                                    <span className="dropdown_label">3 points</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="requester row">
                        <em>Requester</em>
                        <div className="dropdown story_requested_by_id">
                          <input aria-hidden="true" type="hidden" name="story[requested_by_id]" value="2016723" data-type="number" />
                          <input aria-hidden="true" type="text" id="story_requested_by_id_dropdown_c743_honeypot" tabIndex="0" className="honeypot" />
                          <a id="story_requested_by_id_dropdown_c743" className="selection item_2016723" tabIndex="-1">
                            <span>
                              <div className="name hbsAvatarName">Andy Gray</div>
                              <span className="selectable_owner_row_element hbsAvatar__container requester_link" data-person-id="2016723" tabIndex="-1">
                                <div className="hbsAvatar hbsAvatar__hasHoverCard" data-person-id="2016723">
                                  <span>
                                    <span className="hbsAvatar__initials">AG</span>
                                  </span>
                                </div>
                              </span>
                            </span>
                          </a>
                          <a id="story_requested_by_id_dropdown_c743_arrow" className="arrow target" tabIndex="-1"></a>
                          <section>
                            <div className="dropdown_menu search">
                              <div className="search_item">
                                <input aria-label="search" type="text" id="story_requested_by_id_dropdown_c743_search" className="search" />
                              </div>
                              <ul>
                                <li className="no_search_results hidden">No results match.</li>
                                <li data-value="2016723" data-index="1" className="dropdown_item selected">
                                  <a className="item_2016723 " id="2016723_story_requested_by_id_dropdown_c743" href="#">
                                    <span className="dropdown_description">AG</span>
                                    <span className="dropdown_label">Andy Gray</span>
                                  </a>
                                </li>
                                <li data-value="3079331" data-index="2" className="dropdown_item">
                                  <a className="item_3079331 " id="3079331_story_requested_by_id_dropdown_c743" href="#">
                                    <span className="selectable_owner_row_element hbsAvatar__container requester_link" data-person-id="3079331" tabIndex="-1">
                                      <div className="hbsAvatar " data-person-id="3079331">
                                        <span>
                                          <span className="hbsAvatar__initials" style={{display: 'none'}}>la</span>
                                          <img onerror="this.style.display = 'none';" onload="this.parentElement.querySelector('.hbsAvatar__initials').style.display = 'none';" src="https://storage.googleapis.com/tracker-avatar-production/94d986286632d410e9d4363179763f58_3079331_96.png" alt="Lauren Carey" aria-hidden="true" className="hbsAvatar__image" data-aid="hbsAvatar__image-3079331" />
                                        </span>
                                      </div>
                                    </span>
                                    <span className="dropdown_label">Lauren Carey</span>
                                  </a>
                                </li>
                                <li data-value="3159638" data-index="3" className="dropdown_item">
                                  <a className="item_3159638 " id="3159638_story_requested_by_id_dropdown_c743" href="#">
                                    <span className="selectable_owner_row_element hbsAvatar__container requester_link" data-person-id="3159638" tabIndex="-1">
                                      <div className="hbsAvatar " data-person-id="3159638">
                                        <span>
                                          <span className="hbsAvatar__initials" style={{display: 'none'}}>pm</span>
                                          <img onerror="this.style.display = 'none';" onload="this.parentElement.querySelector('.hbsAvatar__initials').style.display = 'none';" src="https://storage.googleapis.com/tracker-avatar-production/7b3e2e3b466b1c5dd42974d6f9cb8340_3159638_96.png" alt="Paul Mesnilgrente" aria-hidden="true" className="hbsAvatar__image" data-aid="hbsAvatar__image-3159638" />
                                        </span>
                                      </div>
                                    </span>
                                    <span className="dropdown_label">Paul Mesnilgrente</span>
                                  </a>
                                </li>
                                <li data-value="3190182" data-index="4" className="dropdown_item">
                                  <a className="item_3190182 " id="3190182_story_requested_by_id_dropdown_c743" href="#">
                                    <span className="dropdown_description">sh</span>
                                    <span className="dropdown_label">shahne</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="owner row">
                        <em>Owners</em>
                        <div className="story_owners">
                          <input aria-hidden="true" type="text" id="story_owner_ids_c743_honeypot" tabIndex="0" className="honeypot" />
                          <a id="add_owner_c743" className="selectable_owner_row_element add_owner has_owners" tabIndex="-1"></a>
                          <span className="selectable_owner_row_element hbsAvatar__container owner_link selected" data-person-id="3190182" tabIndex="-1">
                            <span className="wrapper hbsAvatarName">
                              <span className="name">shahne</span>
                            </span>
                            <div className="hbsAvatar hbsAvatar__hasHoverCard" data-person-id="3190182">
                              <span>
                                <span className="hbsAvatar__initials">sh</span>
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="integration_wrapper"></div>
                    <div className="followers_wrapper">
                      <div className="following row" role="group" aria-label="followers">
                        <em>Follow this story</em>
                        <input type="hidden" name="story[following]" value="0" />
                        <input type="checkbox" id="c743_following" aria-label="follow this story" className="autosaves std value" name="story[following]" value="on" />
                        <span className="count not_read_only" data-cid="c743">2 followers</span>
                      </div>
                    </div>
                    <div className="row timestamp_wrapper">
                      <div className="timestamp">
                        <div className="timestamps clickable">
                          <div className="saving timestamp_row">
                            <span>Saving…</span>
                          </div>
                          <div className="updated_at timestamp_row">Updated:


                            <span data-millis="1560376754000">13 Jun 2019, 9:59am</span>
                          </div>
                          <div className="requested_at timestamp_row">Requested:


                            <span data-millis="1560209728000">11 Jun 2019, 11:35am</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mini attachments"></div>
              </div>
            </aside>
          </form>
        </section>
        <section className="blockers full">
          <div>
            <div data-aid="Blockers">
              <h4>Blockers</h4>
              <div tabIndex="0" className="AddSubresourceButton___2PetQjcb" data-aid="BlockerAdd" data-focus-id="BlockerAdd">
                <span className="AddSubresourceButton__icon___h1-Z9ENT"></span>
                <span className="AddSubresourceButton__message___2vsNCBXi">Add blocker or impediment</span>
              </div>
            </div>
          </div>
        </section>
        <section className="blocking full"></section>
        <section className="description full">
          <div data-aid="Description" className="Description___3oUx83yQ">
            <h4 id="descriptionc743">Description</h4>
            <div className="DescriptionShow___3-QsNMNj" tabIndex="0" data-aid="renderedDescription" data-focus-id="DescriptionShow--c743">
              <span className="tracker_markup">
                <p>As Lauren I want to quickly see time entries which do not match the appropriate harvest tags so that I can quickly fix timesheet errors</p>
                <p>AC:</p>
                <ul>
                  <li>Harvest projects can have labels associated with them</li>
                  <li>Time entries whose pivotal labels do not match one of the harvest project labels are highlighted.</li>
                </ul>
              </span>
            </div>
          </div>
        </section>
        <section className="labels_container full">
          <div id="story_labels_c112" className="labels">
            <div className="StoryLabelsMaker___Lw8q4VmA">
              <h4>Labels</h4>
              <div className="StoryLabelsMaker__container___2B23m_z1">
                <div data-aid="StoryLabelsMaker__contentContainer" className="StoryLabelsMaker__contentContainer___3CvJ07iU">
                  <div className="LabelsSearch___2V7bl828" data-aid="LabelsSearch">
                    <div className="tn-text-input___1CFr3eiU LabelsSearch__container___kJAdoNya">
                      <div>
                        <input autocomplete="off" className="tn-text-input__field___3gLo07Il tn-text-input__field--medium___v3Ex3B7Z LabelsSearch__input___3BARDmFr" type="text" placeholder="Add a label" data-aid="LabelsSearch__input" data-focus-id="LabelsSearch--c743" aria-label="Search for an existing label or type a new label" value="" />
                      </div>
                    </div>
                  </div>
                </div>
                <a className="StoryLabelsMaker__arrow___OjD5Om2A" data-aid="StoryLabelsMaker__arrow"></a>
              </div>
            </div>
          </div>
        </section>
        <section className="code full" data-aid="code">
          <div data-aid="Code" className="Code___3pLWnu1D">
            <h4 className="Code__heading___2LJTrLuO">
              <a href="/help/articles/github_integration" target="_blank" className="Code__menuHelp___3NHpSmo9">Code</a>
            </h4>
            <input data-aid="GitHubAttach__input" aria-label="GitHub Paste Link" className="GitHubAttach__input___3-hGhNzg" type="text" placeholder="Paste link to pull request or branch..." value="" />
          </div>
        </section>
        <section className="tasks full">
          <div>
            <div data-aid="Tasks">
              <span className="tasks_count" data-aid="taskCounts">
                <h4>Tasks (0/0)</h4>
              </span>
              <div>
                <div tabIndex="0" className="AddSubresourceButton___2PetQjcb" data-aid="TaskAdd" data-focus-id="TaskAdd">
                  <span className="AddSubresourceButton__icon___h1-Z9ENT"></span>
                  <span className="AddSubresourceButton__message___2vsNCBXi">Add a task</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="activity full">
          <div>
            <div className="Activity___2ZLT4Ekd Activity--sequential___snOLHrxL">
              <div className="Activity__header___2pU2Tw9L">
                <h4 className="Activity__title___2uuNQeA8 tn-comments__activity">Activity</h4>
                <div className="ToggleComment__Container___eOafaqW5">
                  <span className="ToggleHeading___1K1l1zUE">Sort by</span>
                  <span data-aid="ToggleComment" className="ToggleComment___yucMHq3w" role="button">
                    <span data-aid="ToggleStatus" className="ToggleStatus___34uUfSHP" tabIndex="0">Oldest to newest</span>
                  </span>
                </div>
              </div>
              <ol className="comments all_activity" data-aid="comments">
                <li className="item___3FqFqgaA">
                  <div className="GLOBAL__activity comment CommentEdit___3nWNXIac CommentEdit--new___3PcQfnGf" tabIndex="-1" data-aid="comment-new">
                    <div className="CommentEdit__writePreview-bar___1aXEb92m">
                      <div>
                        <button className="CommentEdit__tab___qUF4n2tB" data-aid="WriteComment">Write</button>
                        <button className="CommentEdit__tab___qUF4n2tB CommentEdit__tab--disabled___2C0MLjfb" data-aid="PreviewComment">Preview</button>
                      </div>
                      <a href="/help/markdown" className="CommentEdit__markdown_help___lvuA4kSr" target="_blank" tabIndex="0" title="Markdown help" data-focus-id="FormattingHelp__link--c743">Formatting help</a>
                    </div>
                    <div className="CommentEdit__commentBox___21QXi4py">
                      <div className="CommentEdit__textContainer___2V0EKFmS">
                        <div data-aid="CommentGutter" className="CommentGutter___1wlvO_PP">
                          <div>
                            <div data-aid="Avatar" className="Avatar">
                              <span>
                                <img src="https://storage.googleapis.com/tracker-avatar-production/7b3e2e3b466b1c5dd42974d6f9cb8340_3159638_96.png" data-aid="Avatar__image" className="Avatar__image" alt="Paul Mesnilgrente" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="CommentEdit__preview___2yY8VPnu">
                          <span className="tracker_markup">
                            <p>Preview your


                              <a href="/help/markdown" target="_blank" rel="noopener" tabIndex="-1">Markdown formatted</a> text here.


                            </p>
                          </span>
                        </div>
                        <div className="CommentEdit__textEditor___3L0zZts-" data-aid="CommentV2TextEditor">
                          <div className="MentionableTextArea___1zoYeUDA">
                            <div className="AutosizeTextarea___2iWScFt6">
                              <div className="AutosizeTextarea__container___31scfkZp">
                                <textarea id="comment-edit-c743" aria-label="Comment" data-aid="Comment__textarea" data-focus-id="CommentEdit__textarea--c743" className="AutosizeTextarea__textarea___1LL2IPEy tracker_markup MentionableTextArea__textarea___2WDXl0X6 CommentEdit__textarea___2Rzdgkej" placeholder="Add a comment"></textarea>
                              </div>
                              <div aria-hidden="true" className="AutosizeTextarea__shadowClass___34L-ruqt tracker_markup MentionableTextArea__textarea___2WDXl0X6 CommentEdit__textarea___2Rzdgkej">
                                <span></span>
                                <span>w</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="CommentEdit__action-bar___3dyLnEWb">
                        <div className="CommentEdit__button-group___2ytpiQPa">
                          <button className="SMkCk__Button QbMBD__Button--primary _3olWk__Button--small undefined _3Xvsn__Button--disabled" disabled="" data-aid="comment-submit" type="button">Post comment</button>
                        </div>
                        <div className="">
                          <span className="CommentEditToolbar__container___3LKaxfw8" data-aid="CommentEditToolbar__container">
                            <div className="CommentEditToolbar__action___3t8pcxD7">
                              <button className="IconButton___2y4Scyq6 IconButton--borderless___1t-CE8H2 IconButton--inverted___2OWhVJqP IconButton--opaque___3am6FGGe" data-aid="add-mention" aria-label="Mention person in comment">
                                <span className="" title="Mention person in comment" style={{background: "rgba(0, 0, 0, 0) url(&quot;//assets.pivotaltracker.com/next/assets/next/8846f168-mention.svg&quot;) no-repeat scroll center center"}}></span>
                              </button>
                            </div>
                            <div className="CommentEditToolbar__action___3t8pcxD7">
                              <a className="">
                                <div data-aid="attachmentDropdownButton" tabIndex="0" title="Add attachment to comment" className="DropdownButton__icon___1qwu3upG CommentEditToolbar__attachmentIcon___48kfJPfH" aria-label="Add attachment"></div>
                              </a>
                              <input data-aid="CommentEditToolbar__fileInput" style={{display: 'none'}} type="file" title="Attach file from your computer" name="file" multiple="" tabIndex="-1" />
                            </div>
                            <div className="CommentEditToolbar__action___3t8pcxD7">
                              <button className="IconButton___2y4Scyq6 IconButton--borderless___1t-CE8H2 IconButton--inverted___2OWhVJqP IconButton--opaque___3am6FGGe" data-aid="add-emoji" aria-label="Add emoji to comment">
                                <span className="" title="Add emoji to comment" style={{background: "rgba(0, 0, 0, 0) url(&quot;//assets.pivotaltracker.com/next/assets/next/2b4b3f66-emoji-light.svg&quot;) no-repeat scroll center center"}}></span>
                              </button>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </li>
    );
  }
}

export default StoryDetailsEdit;