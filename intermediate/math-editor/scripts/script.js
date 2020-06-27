(function() {
    const MQ = MathQuill.getInterface(2);
    const field = document.querySelector('.mathquill');
    const mathField = MQ.StaticMath(field);

    document.querySelector('textarea').addEventListener('input', onChangeTextArea);
    function onChangeTextArea(e) {
        mathField.latex(e.target.value);
    }

    document.querySelector('#save').addEventListener('click', onSave);
    document.querySelector('#load').addEventListener('click', onLoad);

    function onSave() {
        if (!hasWebStorageSupport()) return;
        localStorage.setItem('latex', mathField.latex());
    }

    function onLoad() {
        if (!hasWebStorageSupport()) return;
        const latex = localStorage.getItem('latex');
        document.querySelector('textarea').value = latex
        mathField.latex(latex);
    }

    function hasWebStorageSupport() {
        return typeof(Storage) !== 'undefined';
    }
})()