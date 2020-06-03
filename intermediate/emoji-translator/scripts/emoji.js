(function() {
    const table = document.querySelector('tbody');
    let count = 1;

    Object.entries(emojis).forEach(([text, emoji]) => {
        const row = document.createElement('tr');
        const nEmoji = document.createElement('th');
        nEmoji.setAttribute('scope', 'row');
        nEmoji.textContent = count;
        row.append(nEmoji);

        const textData = document.createElement('td');
        textData.textContent = text;
        row.append(textData);

        const emojiData = document.createElement('td');
        emojiData.textContent = emoji;
        row.append(emojiData);

        table.append(row);
        count++;
    });

    // Object.entries(emojis).forEach(([name, vendors]) => {
    //     const row = document.createElement('tr');
    //     const nEmoji = document.createElement('th');
    //     nEmoji.setAttribute('scope', 'row');
    //     nEmoji.textContent = count;
    //     row.append(nEmoji);

    //     const textData = document.createElement('td');
    //     textData.textContent = name;
    //     row.append(textData);

    //     if(Object.keys(vendors).length < 7) {
    //         const emojiData = document.createElement('td');
    //         emojiData.setAttribute('colspan', 11);
    //         Object.entries(vendors).forEach(([vendor, emoji]) => {
    //             if(vendor === 'browser') {
    //                 const browserData = document.createElement('td');
    //                 browserData.textContent = emoji;
    //                 row.append(browserData);
    //             } else {
    //                 const emojiImg = document.createElement('img');
    //                 emojiImg.setAttribute('src', emoji);
    //                 emojiData.append(emojiImg);
    //             }
    //         });
    //         row.append(emojiData);
    //     } else {
    //         Object.entries(vendors).forEach(([vendor, emoji]) => {
    //             const emojiData = document.createElement('td');
    //             if(emoji.search('data') !== -1) {
    //                 const emojiImg = document.createElement('img');
    //                 emojiImg.setAttribute('src', emoji);
    //                 emojiData.append(emojiImg);
    //             } else {
    //                 emojiData.textContent = emoji;
    //             }
    //             row.append(emojiData);
    //         });
    //     }
    //     table.append(row);
    //     count++;
    // });
})();