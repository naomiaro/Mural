const $ = require('jquery');
const FADE_DURATION = 20;

function fadeout(id, media, shouldPause) {
  $(media).animate({volume: 0}, {
    duration: FADE_DURATION,
    always: function() {
      if (shouldPause()) {
        media.pause();
      }
    }
  });
}

function fadein(id, media) {
  media.volume = 0;
  const playPromise = media.play();

  playPromise.then(
    function() {
      $(media).animate({volume: 1}, {
        duration: FADE_DURATION
      });
    },
    function(e) {
      // mute video & audio for mobile platform autoplay.
      media.muted = true;
      // insert an unmute button for mobile.
      const $storyItem = $(`#story0-${id}`);
      if ($storyItem.find('.mobile-mute').length === 0) {
        const mobileUnmute = $('<span/>', {
          class: 'mobile-mute muted'
        }).click(function() {
          media.muted = false;
          $(media).animate({volume: 1}, FADE_DURATION);
          $(this).remove();
        });
        $storyItem.append(mobileUnmute);
      }

      return media.play();
    }
  ).catch(function(e) {
    console.log('Muted play not working either :(');
    console.log(e);
  });

  return playPromise;
}

function canPlayThroughPromise(media, srcs, vtt) {
  return new Promise(function(resolve, reject) {
    function canPlayThrough() {
      media.removeEventListener('canplaythrough', canPlayThrough);
      media.removeEventListener('loadeddata', loadedMetaData);
      resolve();
    }

    function loadedMetaData() {
      // media is in browser cache
      if (media.readyState > 3) {
        media.removeEventListener('canplaythrough', canPlayThrough);
        media.removeEventListener('loadeddata', loadedMetaData);
        resolve();
      }
    }

    media.addEventListener('canplaythrough', canPlayThrough);
    media.addEventListener('loadeddata', loadedMetaData);

    media.onerror = function(e) {
      media.onerror = null;
      resolve();
    }

    srcs.forEach((src, i) => {
      const source = document.createElement('source'); 
      source.type = src.type;
      source.src = src.src;
      media.appendChild(source);

      // resolve if error on sources (404)
      if (i === srcs.length - 1) {
        source.addEventListener('error', function(e) {
          resolve();
        });
      }
    });

    if (vtt) {
      const textTrack = document.createElement('track'); 
      textTrack.kind='subtitles';
      textTrack.srclang='en';
      textTrack.label='English';
      textTrack.src = vtt;
      // for safari
      textTrack.default = true;
      // for iPhones
      textTrack.track.mode = 'hidden';
  
      textTrack.addEventListener('cuechange', function () {
        let cues = textTrack.track.activeCues;  // array of current cues
        if (cues.length) {
          $('.subtitles').text(cues[0].text).show();
        } else {
          $('.subtitles').hide();
        }
      });
  
      media.appendChild(textTrack);
    }

    // resolve incase of invalid sources.
    if (!srcs.length) {
      resolve();
    }
  });
}


module.exports = {
  canPlayThroughPromise,
  fadeout,
  fadein
};
