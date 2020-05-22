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

    const textResults = command(input.value);
    for (const textResult of textResults) {
        result.appendChild(textResult);
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

function command(command) {
    const commands = command.split(' ');
    
    switch (commands[0]) {
        case 'add':
            commands.shift();
            if(isNaN(commands[0]))
                return subCommand(commands)
            const result = commands.map(Number).reduce(commandList.addition);
            return [createCommandLine('Result: ' + result)];
        default:
            return [createCommandLine('> ' + command.split(' ')[0] + ': command not found')];
    }
}

function subCommand(commands) {

}

function flag(commands) {
    
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
    help: () => 'help'
}