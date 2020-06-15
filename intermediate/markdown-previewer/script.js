$('textarea[name=input]').on('input', onChangeText);

function onChangeText(e) {
    $('.output').empty();
    $('.output').append(markdown(e.target.value));
}

function markdown(text) {
    for (let i = 1; i <= 6; i++) {
        const regex = new RegExp('^(#{' + i + '} .*)$', 'gm');
        if(text.match(regex) != null) text = headingsReplace(text, text.match(regex).map(match => match.replace(/[\r\n|\r|\n]/)), i);
    }
    return text;
}

function headingsReplace(text, matches, level) {
    for (const match of matches) {
        text = text.replace(match, '<h' + level + '>' + match.substring(level, text.length) + '</h' + level + '>');
    }
    return text;
}