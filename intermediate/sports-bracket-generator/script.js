(function() {
    document.querySelector('#number-team').addEventListener('change', onChangeNumberOfTeams);
    function onChangeNumberOfTeams(e) {
        const bracket = document.querySelector('.bracket');
        bracket.textContent = '';

        let teams = parseInt(e.target.value);
        let rounds = (Math.log(teams) / Math.log(2)) + 1;
        let games = teams;
        
        for (let r = 0; r < rounds; r++) {
            games = games / 2;
            bracket.append(createRound(games));
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

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-control custom-form text-center');

        team.append(input);
        return team;
    }
})();