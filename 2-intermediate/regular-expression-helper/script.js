(function() {
    const NOMATCHES = 'Your regular expression does not match the subject string.';
    const CORRECTIONLENGTH = '<span class="bg-info"></span>'.length;

    document.querySelector('form').addEventListener('submit', onSubmit);
    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const regex = RegExp(formData.get('regex'), 'gm');
        const test = formData.get('test');

        let result = findMatches(regex, test);
        result = addTag(result === test ? NOMATCHES : result, 'p');
        result = result.replace(/\r\n/gm, '<br>')
        document.querySelector('#result').innerHTML = result;
    }

    function findMatches(regex, test) {
        let resultTest = test;
        let result;
        let correctIndex = 0;
        while ((result = regex.exec(test)) !== null) {
            resultTest = replaceString(result.index + correctIndex, regex.lastIndex + correctIndex, addTag(result[0], 'span'), resultTest);
            correctIndex += CORRECTIONLENGTH;
        }
        return resultTest;
    }

    function replaceString(startIndex, endIndex, newSubString, fullString) {
        return fullString.substring(0, startIndex) + newSubString + fullString.substring(endIndex, fullString.length);
    }

    function addTag(text, tag) {
        switch (tag) {
            case 'span':
                return '<' + tag + ' class="bg-info">' + text + '</' + tag + '>';
            case 'p':
                return '<' + tag + ' class="m-0">' + text + '</' + tag + '>';
            default:
                return '<' + tag + '>' + text + '</' + tag + '>';
        }
    }
})();