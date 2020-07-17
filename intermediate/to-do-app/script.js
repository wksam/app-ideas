(function() {
    init();
    function init() {
        document.querySelector('.tasks').textContent = '';
        document.querySelector('.completed').textContent = '';
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
        if(taskList.childElementCount === 0) taskList.append(createHeader('Tasks'));
        taskList.append(createTask(task));
    }

    function createHeader(title) {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item');

        const header = document.createElement('h5');
        header.setAttribute('class', 'm-0');
        header.textContent = title;

        li.append(header);
        return li;
    }

    function createTask(task) {
        const listGroupItem = document.createElement('li');
        listGroupItem.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
        listGroupItem.addEventListener('mouseover', onMouseOver);
        listGroupItem.addEventListener('mouseout', onMouseOut);

        const formCheck = document.createElement('div');
        formCheck.setAttribute('class', 'form-check text-truncate');

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

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'btn btn-sm btn-outline-danger ml-2 invisible');
        deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
        deleteButton.addEventListener('click', onRemove);

        listGroupItem.append(formCheck);
        formCheck.append(checkbox);
        formCheck.append(label);
        listGroupItem.append(deleteButton);

        return listGroupItem;
    }

    function createId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function onCheck(e) {
        const formCheck = e.currentTarget.parentElement;

        const taskList = document.querySelector('.tasks');
        const completedList = document.querySelector('.completed');
        const task = formCheck.parentElement;

        if(formCheck.classList.toggle('checked')) {
            if(completedList.childElementCount === 0) completedList.append(createHeader('Completed'));
            completedList.append(task);
            if(taskList.childElementCount === 1) taskList.textContent = '';
        } else {
            if(taskList.childElementCount === 0) taskList.append(createHeader('Tasks'));
            taskList.append(task);
            if(completedList.childElementCount === 1) completedList.textContent = '';
        }
    }

    function onRemove(e) {
        const list = e.currentTarget.parentElement.parentElement;
        e.currentTarget.parentElement.remove();
        if(list.childElementCount === 1) list.textContent = '';
    }

    function onMouseOver(e) {
        e.currentTarget.querySelector('button').classList.toggle('invisible');
    }

    function onMouseOut(e) {
        e.currentTarget.querySelector('button').classList.toggle('invisible');
    }
})();