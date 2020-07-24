function fillStats() {
    const table = document.querySelector('.table-stats');
    table.textContent = '';

    const tbody = document.createElement('tbody');
    const trWon = document.createElement('tr');
    const tdWonName = document.createElement('td');
    tdWonName.textContent = 'Won:';
    const tdWonValue = document.createElement('td');
    tdWonValue.textContent = game.won;
    trWon.append(tdWonName);
    trWon.append(tdWonValue);
    tbody.append(trWon);

    const trLost = document.createElement('tr');
    const tdLostName = document.createElement('td');
    tdLostName.textContent = 'Lost:'
    const tdLostValue = document.createElement('td');
    tdLostValue.textContent = game.lost;
    trLost.append(tdLostName);
    trLost.append(tdLostValue);
    tbody.append(trLost);

    const trEasyBestTime = document.createElement('tr');
    const tdEasyBestTimeName = document.createElement('td');
    tdEasyBestTimeName.textContent = 'Best Time (Easy):'
    const tdEasyBestTimeValue = document.createElement('td');
    tdEasyBestTimeValue.textContent = game.getTimer()['easy'] < 0 ? 'None' : formatTime(game.getTimer()['easy']);
    trEasyBestTime.append(tdEasyBestTimeName);
    trEasyBestTime.append(tdEasyBestTimeValue);
    tbody.append(trEasyBestTime);

    const trMediumBestTime = document.createElement('tr');
    const tdMediumBestTimeName = document.createElement('td');
    tdMediumBestTimeName.textContent = 'Best Time (Medium):'
    const tdMediumBestTimeValue = document.createElement('td');
    tdMediumBestTimeValue.textContent = game.getTimer()['medium'] < 0 ? 'None' : formatTime(game.getTimer()['medium']);
    trMediumBestTime.append(tdMediumBestTimeName);
    trMediumBestTime.append(tdMediumBestTimeValue);
    tbody.append(trMediumBestTime);

    const trHardBestTime = document.createElement('tr');
    const tdHardBestTimeName = document.createElement('td');
    tdHardBestTimeName.textContent = 'Best Time (Hard):'
    const tdHardBestTimeValue = document.createElement('td');
    tdHardBestTimeValue.textContent = game.getTimer()['hard'] < 0 ? 'None' : formatTime(game.getTimer()['hard']);
    trHardBestTime.append(tdHardBestTimeName);
    trHardBestTime.append(tdHardBestTimeValue);
    tbody.append(trHardBestTime);

    table.append(tbody);
}