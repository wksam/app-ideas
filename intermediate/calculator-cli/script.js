window.addEventListener('click', function() {
    this.document.querySelector('input').focus();
});

document.querySelector('input').addEventListener('keyup', function(e) {
    if(e.which === 13) { execute(); }
});

function execute() {
    const input = document.querySelector('input');
    const result = document.querySelector('.result');
    
    result.appendChild(cloneCommand(input.value));

    try {
        const paragraph = command(input.value.split(' '));
        if(Array.isArray(paragraph)) {
            paragraph.forEach(p => {
                result.appendChild(p);
            });
        } else {
            result.appendChild(paragraph);
        }
    } catch (error) {
        result.appendChild(createCommandLine(error.message));
    }

    input.value = '';
}

function cloneCommand(command) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('$ '));
    p.textContent = command;
    p.prepend(span);
    return p;
}

function command(commands) {
    const command = commands.shift();
    if(commands.length > 0) {
        if(isFlag(commands[0])) commands = flag(commands);
        else if(isNaN(commands[0])) commands = subCommand(commands);
        else commands = commands.map((n) => parseInt(n));
    }

    switch (command) {
        case 'add':
            return commands.length > 0 ? createCommandLine('> Result: ' + commands.join(' + ') + ' = ' + commands.reduce(commandList.addition)) : createCommandLine('> Result: 0');
        case 'sub':
            return commands.length > 0 ? createCommandLine('> Result: ' + commands.join(' - ') + ' = ' + commands.reduce(commandList.subtraction)) : createCommandLine('> Result: 0');
        case 'mult':
            return commands.length > 0 ? createCommandLine('> Result: ' + commands.join(' * ') + ' = ' + commands.reduce(commandList.multiplication)) : createCommandLine('> Result: 0');
        case 'div':
            return commands.length > 0 ? createCommandLine('> Result: ' + commands.join(' / ') + ' = ' + commands.reduce(commandList.division)) : createCommandLine('> Result: 0');
        case 'help':
            return [
                createCommandLine('> usage: [command] [sub-command | flag] [...numbers]'),
                createCommandLine('\xa0'),
                createCommandLine('\xa0\xa0Possible commands:'),
                createCommandLine('\xa0\xa0\xa0 add  \xa0\xa0 Perform addition operation'),
                createCommandLine('\xa0\xa0\xa0 sub  \xa0\xa0 Perform subtraction operation'),
                createCommandLine('\xa0\xa0\xa0 mult \xa0     Perform multiplication operation'),
                createCommandLine('\xa0\xa0\xa0 div  \xa0\xa0 Perform division operation'),
                createCommandLine('\xa0'),
                createCommandLine('\xa0\xa0Possible sub-commands:'),
                createCommandLine('\xa0\xa0\xa0 even \xa0     Perform operation with only even numbers'),
                createCommandLine('\xa0\xa0\xa0 odd  \xa0\xa0 Perform operation with only odd numbers'),
                createCommandLine('\xa0'),
                createCommandLine('\xa0\xa0Possible flags:'),
                createCommandLine('\xa0\xa0\xa0 -f \xa0\xa0\xa0 Floating numbers')
            ];
        default:
            throw new CommandError('> ' + command.split(' ')[0] + ': command \n not found');
    }
}

function subCommand(commands) {
    const command = commands.shift();
    if(commands.length > 0)
        if(isNaN(commands[0])) throw new CommandError('unknown option: ' + commands[0]);

    switch (command) {
        case 'even':
            return commands.filter(commandList.even);
        case 'odd':
            return commands.filter(commandList.odd);
        default:
            throw new CommandError('> ' + commands[0] + ': sub-command not found');
    }
}

function flag(commands) {
    const command = commands.shift();
    if(isNaN(commands[0])) throw new CommandError('unknown option: ' + commands[0]);

    switch (command) {
        case '-f':
            return commands.map((n) => parseFloat(n));
        default:
            throw new CommandError('> ' + commands[0] + ': flag not found');
    }
}

function isFlag(command) {
    return isNaN(command) && command.charAt(0) === '-';
}

function createCommandLine(text) {
    const p = document.createElement('p');
    p.setAttribute('class', 'm-0');
    p.textContent = text;
    return p;
}

const commandList = {
    addition: (a, b) => a + b,
    subtraction: (a, b) => a - b,
    multiplication: (a, b) => a * b,
    division: (a, b) => a / b,
    float: (a) => parseFloat(a),
    help: () => 'help',
    even: (a) => a % 2 === 0,
    odd: (a) => a % 2 === 1
}

class CommandError {
    constructor(message) {
        this.message = message;
    }
}