export function initialize(container, application) {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  application.deferReadiness();
  window.onYouTubeIframeAPIReady = application.advanceReadiness.bind(application);
}

export default {
  name: 'youtube-iframe-api',
  initialize: initialize
};
