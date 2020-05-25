const svgImg = [
    "svg/angular.svg",
    "svg/aws.svg",
    "svg/backbone.svg",
    "svg/bootstrap.svg",
    "svg/c--.svg",
    "svg/c.svg",
    "svg/codeigniter.svg",
    "svg/coffeescript.svg",
    "svg/css.svg",
    "svg/dart.svg",
    "svg/django.svg",
    "svg/docker.svg",
    "svg/drupal.svg",
    "svg/ember-tomster.svg",
    "svg/erlang.svg",
    "svg/flask.svg",
    "svg/flutter.svg",
    "svg/git.svg",
    "svg/github.svg",
    "svg/google-cloud.svg",
    "svg/gopher.svg",
    "svg/graphql.svg",
    "svg/grunt.svg",
    "svg/gulp.svg",
    "svg/heroku.svg",
    "svg/html-5.svg",
    "svg/java.svg",
    "svg/javascript.svg",
    "svg/kotlin.svg",
    "svg/laravel.svg",
    "svg/lua.svg",
    "svg/meteor.svg",
    "svg/nodejs.svg",
    "svg/npm.svg",
    "svg/perl.svg",
    "svg/polymer.svg",
    "svg/python.svg",
    "svg/r.svg",
    "svg/rails.svg",
    "svg/react.svg",
    "svg/ruby.svg",
    "svg/sails.svg",
    "svg/sass.svg",
    "svg/scala.svg",
    "svg/spring.svg",
    "svg/stylus.svg",
    "svg/swift.svg",
    "svg/typescript.svg",
    "svg/vue.svg",
    "svg/wolfram.svg"
];

const cardImg = [...svgImg, ...svgImg];
shuffle(cardImg);
for (let i = 0; i < 100; i++) {
    const cards = document.querySelector('.cards');

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const img = document.createElement('img');
    img.setAttribute('src', cardImg[i]);

    card.append(img);
    cards.append(card);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}