const SECOND = 1000;
const MINUTE = 60 * SECOND;

const easySvg = [
    { id: '\uFD40', path: "svg/easy/android.svg" },
    { id: '\uFD41', path: "svg/easy/apple.svg" },
    { id: '\uFD42', path: "svg/easy/debian.svg" },
    { id: '\uFD43', path: "svg/easy/fedora.svg" },
    { id: '\uFD44', path: "svg/easy/linux.svg" },
    { id: '\uFD45', path: "svg/easy/opensuse.svg" },
    { id: '\uFD46', path: "svg/easy/ubuntu.svg" },
    { id: '\uFD47', path: "svg/easy/windows.svg" }
];

const mediumSvg = [
    { id: '\uFD40', path: "svg/medium/discord.svg" },
    { id: '\uFD41', path: "svg/medium/dropbox.svg" },
    { id: '\uFD42', path: "svg/medium/duolingo.svg" },
    { id: '\uFD43', path: "svg/medium/facebook-messenger.svg" },
    { id: '\uFD44', path: "svg/medium/facebook.svg" },
    { id: '\uFD45', path: "svg/medium/firefox.svg" },
    { id: '\uFD46', path: "svg/medium/google.svg" },
    { id: '\uFD47', path: "svg/medium/instagram.svg" },
    { id: '\uFD48', path: "svg/medium/netflix.svg" },
    { id: '\uFD49', path: "svg/medium/pinterest.svg" },
    { id: '\uFD4A', path: "svg/medium/slack.svg" },
    { id: '\uFD4B', path: "svg/medium/snapchat.svg" },
    { id: '\uFD4C', path: "svg/medium/spotify.svg" },
    { id: '\uFD4D', path: "svg/medium/telegram.svg" },
    { id: '\uFD4E', path: "svg/medium/twitch.svg" },
    { id: '\uFD4F', path: "svg/medium/twitter.svg" },
    { id: '\uFD50', path: "svg/medium/udemy.svg" },
    { id: '\uFD51', path: "svg/medium/whatsapp.svg" }
];

const hardSvg = [
    { id: '\uFD40', path: "svg/hard/angular.svg" },
    { id: '\uFD41', path: "svg/hard/bootstrap.svg" },
    { id: '\uFD42', path: "svg/hard/c.svg" },
    { id: '\uFD43', path: "svg/hard/coffeescript.svg" },
    { id: '\uFD44', path: "svg/hard/css.svg" },
    { id: '\uFD45', path: "svg/hard/dart.svg" },
    { id: '\uFD46', path: "svg/hard/django.svg" },
    { id: '\uFD47', path: "svg/hard/docker.svg" },
    { id: '\uFD48', path: "svg/hard/ember-tomster.svg" },
    { id: '\uFD49', path: "svg/hard/flask.svg" },
    { id: '\uFD4A', path: "svg/hard/flutter.svg" },
    { id: '\uFD4B', path: "svg/hard/git.svg" },
    { id: '\uFD4C', path: "svg/hard/github.svg" },
    { id: '\uFD4D', path: "svg/hard/gopher.svg" },
    { id: '\uFD4E', path: "svg/hard/grunt.svg" },
    { id: '\uFD4F', path: "svg/hard/gulp.svg" },
    { id: '\uFD50', path: "svg/hard/html-5.svg" },
    { id: '\uFD51', path: "svg/hard/java.svg" },
    { id: '\uFD52', path: "svg/hard/kotlin.svg" },
    { id: '\uFD53', path: "svg/hard/lua.svg" },
    { id: '\uFD54', path: "svg/hard/nodejs.svg" },
    { id: '\uFD55', path: "svg/hard/npm.svg" },
    { id: '\uFD56', path: "svg/hard/perl.svg" },
    { id: '\uFD57', path: "svg/hard/python.svg" },
    { id: '\uFD58', path: "svg/hard/rails.svg" },
    { id: '\uFD59', path: "svg/hard/react.svg" },
    { id: '\uFD5A', path: "svg/hard/ruby.svg" },
    { id: '\uFD5B', path: "svg/hard/sails.svg" },
    { id: '\uFD5C', path: "svg/hard/sass.svg" },
    { id: '\uFD5D', path: "svg/hard/scala.svg" },
    { id: '\uFD5E', path: "svg/hard/stylus.svg" },
    { id: '\uFD5F', path: "svg/hard/swift.svg" }
];

Object.freeze(easySvg);
Object.freeze(mediumSvg);
Object.freeze(hardSvg);