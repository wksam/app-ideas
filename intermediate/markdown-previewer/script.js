$('textarea[name=input]').on('input', onChangeText);

function onChangeText(e) {
    $('.output').empty();
    $('.output').append(markdown(e.target.value));
}

function markdown(text) {
    const splitted = text.split(/\n{2,})/gm);
    
    // for (const index in splitted) {
    //     splitted[index] = headings(splitted[index]);
    // }
    console.log(splitted);
    return splitted.join('\n');
}

function headings(text) {
    for (let level = 1; level <= 6; level++) {
        const regex = new RegExp('^(#{' + level + '} .*\n?)$', 'gm');
        
        if(text.match(regex)) {
            text = text.substring(level + 1);
            text = '<h' + level + '>' + text + '</h' + level + '>';
        }
    }
    return text;
}

function paragraphs(text) {
    const regex = new RegExp('')
    return text;
}

function lineBreaks(text) {
    return text.replace(/\r\n|\r|\n/gm, '<br>');
}