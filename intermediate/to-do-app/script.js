(function() {
    init();
    function init() {
        document.querySelector('.tasks').textContent = '';
    }

    document.querySelector('form').addEventListener('submit', onSubmit);
    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        addTask(formData.get('task'));
        e.target.reset();
    }

    function addTask(task) {
        const taskList = document.querySelector('.tasks');
        taskList.append(createTask(task));
    }

    function createTask(task) {
        const listGroupItem = document.createElement('li');
        listGroupItem.setAttribute('class', 'list-group-item');

        const formCheck = document.createElement('div');
        formCheck.setAttribute('class', 'form-check');

        const id = 'task' + createId();
        const checkbox = document.createElement('input');
        checkbox.setAttribute('class', 'form-check-input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', id);
        checkbox.addEventListener('change', onCheck);

        const label = document.createElement('label');
        label.setAttribute('class', 'form-check-label');
        label.setAttribute('for', id);
        label.textContent = task;

        listGroupItem.append(formCheck);
        formCheck.append(checkbox);
        formCheck.append(label);

        return listGroupItem;
    }

    function createId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function onCheck(e) {
        const formCheck = e.currentTarget.parentElement;
        formCheck.classList.toggle('checked');
    }
})();