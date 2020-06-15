$('textarea[name=input]').on('input', onChangeText);

function onChangeText(e) {
    $('.output').empty();
    $('.output').append(markdown(e.target.value));
}

function markdown(text) {
    // Heading
    for (let i = 1; i <= 6; i++) {
        const regex = new RegExp('^(#{' + i + '} .*)$', 'gm');
        if(text.match(regex) != null)
            text = headings(text, text.match(regex).map(match => match.replace(/[\r\n|\r|\n]/)), i);
    }

    // Paragraphs
    if(text.match(/^[^#{1,6}|\n]+$/gm))
        text = paragraphs(text, text.match(/^[^#{1,6}|\n]+$/gm));
    return text;
}

function headings(text, matches, level) {
    for (const match of matches) {
        text = text.replace(match, '<h' + level + '>' + match.substring(level + 1, text.length) + '</h' + level + '>');
    }
    return text;
}

function paragraphs(text, matches) {
    for (const match of matches) {
        const regex = new RegExp('^' + match + '$', 'gm');
        text = text.replace(regex, '<p>' + match + '</p>');
    }
    return text;
}