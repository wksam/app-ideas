(function nightMode() {
    const hasFilter = document.querySelectorAll('.night-mode-filter').length > 0;

    if(!hasFilter) {
        let nightModeFilter = document.createElement('div');
        nightModeFilter.setAttribute('class', 'night-mode-filter');

        document.body.append(nightModeFilter);
    } else {
        document.querySelector('.night-mode-filter').remove();
    }
})();