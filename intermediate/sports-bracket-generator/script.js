(function() {
    document.querySelector('#number-team').addEventListener('change', onChangeNumberOfTeams);
    function onChangeNumberOfTeams(e) {
        const bracket = document.querySelector('.bracket');
        bracket.textContent = '';
        const roundDate = document.querySelector('.round-date');
        roundDate.textContent = '';

        let teams = parseInt(e.target.value);
        let rounds = (Math.log(teams) / Math.log(2)) + 1;
        let games = teams;
        
        for (let r = 0; r < rounds; r++) {
            games = games / 2;
            bracket.append(createRound(games));
            roundDate.append(createDate());
        }
    }

    function createRound(games) {
        const round = document.createElement('div');
        round.setAttribute('class', 'round');

        for (let i = 0; i < Math.ceil(games); i++) {
            round.append(createGame(!Number.isInteger(games)));
        }
        return round;
    }

    function createGame(isFinal) {
        const game = document.createElement('div');
        game.setAttribute('class', 'game');

        if(!isFinal) {
            for (let i = 0; i < 2; i++) {
                game.append(createTeam());
            }
        } else {
            game.append(createTeam());
        }
        return game;
    }

    function createTeam() {
        const team = document.createElement('div');
        team.setAttribute('class', 'team');

        const teamForm = document.createElement('div');
        teamForm.setAttribute('class', 'team-form');

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('class', 'form-control custom-form input-team-name');
        inputName.setAttribute('placeholder', 'Team name');

        const inputScore = document.createElement('input');
        inputScore.setAttribute('type', 'number');
        inputScore.setAttribute('class', 'form-control custom-form input-score');
        inputScore.setAttribute('placeholder', 'Score');
        inputScore.setAttribute('min', '0');

        team.append(teamForm);
        teamForm.append(inputName);
        teamForm.append(inputScore);
        return team;
    }

    function createDate() {
        const date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.setAttribute('class', 'form-control custom-form');
        return date;
    }
})();