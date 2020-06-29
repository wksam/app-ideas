(function() {
    const typeNumberArray = [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511];

    document.querySelector('form').addEventListener('submit', onSubmit);
    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const twitter = formData.get('twitter');
        const github = formData.get('github');

        document.querySelector('#print').disabled = false;
        const badgePanel = document.querySelector('#badge-panel');
        badgePanel.hidden = false;
        badgePanel.querySelector('#qrcode').innerHTML = createQRCode(name);
        badgePanel.querySelector('#badge-name').textContent = name;
        badgePanel.querySelector('#badge-email').textContent = email;
        badgePanel.querySelector('#badge-twitter').textContent = '@' + twitter;
        badgePanel.querySelector('#badge-github').textContent = github;
    }

    function createQRCode(name) {
        const length = name.length;
        const typeNumber = getErrorCorrectionLevel(length);
        console.log(length, typeNumber);

        const qr = qrcode(typeNumber, 'H');
        qr.addData(name);
        qr.make();

        return qr.createImgTag();
    }

    function getErrorCorrectionLevel(length) {
        return typeNumberArray.findIndex(item => item > length) + 1;
    }

    document.querySelector('form').addEventListener('reset', onReset);
    function onReset() {
        document.querySelector('#badge-panel').hidden = true;
        document.querySelector('#print').disabled = true;
    }

    document.querySelector('#print').addEventListener('click', onPrint);
    function onPrint() {
        window.print();
    }
})();