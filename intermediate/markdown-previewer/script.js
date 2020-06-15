$('textarea[name=input]').on('input', onChangeText);

function onChangeText(e) {
    $('.output').empty();
    $('.output').append(markdown(e.target.value));
}

function markdown(text) {
    if(text.match(/^(#{1} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{1} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/)), 1);
    if(text.match(/^(#{2} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{2} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/)), 2);
    if(text.match(/^(#{3} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{3} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/)), 3);
    if(text.match(/^(#{4} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{4} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/)), 4);
    if(text.match(/^(#{5} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{5} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/), 5));
    if(text.match(/^(#{6} .*)$/gm) != null) text = headingsReplace(text, text.match(/^(#{6} .*)$/gm).map(match => match.replace(/[\r\n|\r|\n]/)), 6);
    return text;
}

function headingsReplace(text, matches, level) {
    for (const match of matches) {
        text = text.replace(match, '<h' + level + '>' + match.substring(level, text.length) + '</h' + level + '>');
    }
    return text;
}