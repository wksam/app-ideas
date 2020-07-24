const productList = [
    {
        id: 'n6jx0Lhc0s',
        name: 'Product 1',
        short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a pulvinar enim. Duis in tellus arcu. Mauris ac suscipit tortor. Maecenas auctor scelerisque ligula. Nullam semper in lacus at porttitor. Maecenas ultrices viverra ligula, laoreet volutpat augue blandit nec. Sed scelerisque, nunc sit amet commodo porta, nibh justo mollis nulla, sit amet mattis turpis diam ac lacus. Phasellus suscipit nunc sed auctor dignissim. Nulla ultricies suscipit augue, eu dictum augue egestas ut.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 129
    }, {
        id: 'iAKaVvfi5N',
        name: 'Product 2',
        short_description: 'Curabitur vitae velit aliquet, tristique augue id, facilisis neque.',
        long_description: 'Curabitur vitae velit aliquet, tristique augue id, facilisis neque. Nam aliquet accumsan eros eget pellentesque. Sed fermentum felis ac eleifend eleifend. Nullam molestie felis eget varius bibendum. Quisque gravida velit a lobortis gravida. Donec sapien lacus, consectetur eu interdum ac, consequat ut arcu. Vestibulum eget ultrices metus. Vivamus commodo imperdiet ex et dapibus. Maecenas faucibus pharetra purus ut feugiat. Fusce vitae nulla sapien. Ut ultrices, eros at ultrices pretium, velit ex commodo mi, nec viverra mauris enim a dolor. Sed vitae commodo magna. Duis maximus magna ac sodales eleifend. Aliquam ante risus, dictum ac ipsum vel, sollicitudin vehicula ex. Morbi ultrices tincidunt vulputate. Curabitur ac mollis dolor, vitae molestie magna.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 109.99
    }, {
        id: '9cLc7llu9w',
        name: 'Product 3',
        short_description: 'Nunc semper urna quis varius vestibulum.',
        long_description: 'Nunc semper urna quis varius vestibulum. Maecenas sem augue, egestas nec nisi nec, sollicitudin pulvinar quam. Donec pulvinar, odio a aliquam condimentum, tortor est tempus ipsum, eget mollis libero libero eget est. Morbi ac leo fringilla, sagittis justo a, ultricies ante. Integer ut aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam sed elit blandit, congue velit vitae, semper neque. Integer ut nulla et lacus volutpat tempor. Quisque varius commodo hendrerit.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 239
    }, {
        id: 'nwZhSeRCNR',
        name: 'Product 4',
        short_description: 'Nullam nec orci purus.',
        long_description: 'Nullam nec orci purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec non sem a diam gravida malesuada nec at velit. Aliquam erat volutpat. Etiam posuere quam tortor, non bibendum libero tristique in. Maecenas rhoncus dolor at sapien interdum euismod. Vestibulum vestibulum tincidunt lectus nec mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ac cursus nisl, quis viverra elit.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 37.99
    }, {
        id: 'OJElZBJyn6',
        name: 'Product 5',
        short_description: 'Donec euismod arcu leo, et tincidunt felis volutpat ut.',
        long_description: 'Donec euismod arcu leo, et tincidunt felis volutpat ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed pretium sapien ut velit mollis, at accumsan tortor venenatis. Duis eros nisl, rhoncus quis diam in, maximus porttitor sapien. Aenean vehicula enim vitae elit consectetur, eget gravida ipsum tincidunt. Praesent vel tincidunt mauris. Aenean ut purus accumsan, tempus risus eleifend, condimentum felis.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 47.49
    }, {
        id: 'rhbyfFrvcl',
        name: 'Product 6',
        short_description: 'Aenean vitae consequat dui.',
        long_description: 'Aenean vitae consequat dui. Fusce ipsum ligula, vestibulum at mattis dapibus, vulputate vel risus. Vestibulum pretium nunc cursus ultrices imperdiet. Donec ultricies massa non euismod egestas. In hac habitasse platea dictumst. Phasellus ut ullamcorper velit. Nam rutrum mi sed fringilla consectetur. Vestibulum tellus erat, tincidunt nec commodo ut, hendrerit eget neque.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 57.99
    }, {
        id: 'OiyPerwJ38',
        name: 'Product 7',
        short_description: 'Maecenas id ullamcorper tellus, in consequat arcu.',
        long_description: 'Maecenas id ullamcorper tellus, in consequat arcu. Duis et magna vel nunc pharetra tincidunt. Mauris eget blandit purus, consectetur pharetra justo. Vestibulum sed neque enim. Donec nec odio quis dolor tincidunt semper quis non orci. In ac lacus ultrices, aliquet lacus et, ullamcorper turpis. Ut id porttitor justo. Aliquam ultricies molestie mi eu imperdiet. Nulla at varius neque, rhoncus maximus risus. Aenean fermentum tincidunt augue at convallis. Curabitur nulla lacus, mollis nec faucibus et, malesuada eu nulla. In hac habitasse platea dictumst.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 37.99
    }, {
        id: 'JZb1deZVMS',
        name: 'Product 8',
        short_description: 'Proin tortor leo, porta dignissim augue vel, cursus dignissim leo.',
        long_description: 'Proin tortor leo, porta dignissim augue vel, cursus dignissim leo. Morbi lacus nisi, eleifend sed elit eu, consectetur fermentum est. Phasellus ut mattis justo. Mauris in ullamcorper augue. Proin nulla velit, interdum id faucibus at, facilisis ac libero. Vivamus sit amet ultrices diam. Nam auctor fringilla lorem eu mattis. Donec nec lorem sed massa dictum egestas fringilla sed erat. Aliquam at tincidunt lectus. In imperdiet venenatis mi et volutpat. Fusce rutrum ullamcorper efficitur.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 169
    }, {
        id: 'wF4v2JO0h9',
        name: 'Product 9',
        short_description: 'Cras pellentesque eget ante quis ultricies.',
        long_description: 'Cras pellentesque eget ante quis ultricies. Praesent suscipit nulla sit amet enim vehicula eleifend. Proin a sodales est. Proin tincidunt ornare nisi ut pulvinar. Morbi sed erat massa. Duis porttitor scelerisque dignissim. Nullam in massa a sapien suscipit viverra. Ut in magna quis arcu pretium malesuada et eget elit. Sed eleifend diam id tincidunt lobortis. Etiam vitae risus sit amet purus fringilla scelerisque et in orci. Donec aliquam, ex a vehicula facilisis, magna ante rutrum enim, vel feugiat nulla diam eu velit. Praesent placerat tincidunt purus. Duis fringilla fermentum odio vitae consectetur.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 74.99
    }, {
        id: 'fF0AitfC1t',
        name: 'Product 10',
        short_description: 'Proin elementum eget magna ut venenatis.',
        long_description: 'Proin elementum eget magna ut venenatis. Etiam dui erat, molestie ut sapien tristique, elementum laoreet quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare diam vel mi congue, id faucibus leo efficitur. Fusce semper ultricies dictum. Integer pretium erat vitae metus pretium porta. Phasellus sit amet ornare dolor, a interdum est. Praesent pretium accumsan est vitae accumsan. Aliquam vel volutpat mauris.',
        thumbnail: 'https://via.placeholder.com/500',
        price: 179.9
    }
];

Object.freeze(productList);