
let isDragging = false;
(function() {
    let pos = { x: 0, y: 0 }
    const bar = document.querySelector('.bar');
    const menu = document.querySelector('.menu');
    
    if(bar) 
        bar.addEventListener('mousedown', dragStart);
    else
        menu.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        isDragging = true;

        pos.x = e.clientX;
        pos.y = e.clientY;
        
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragging);
    }

    function dragging(e) {
        const move = { x: pos.x - e.clientX, y: pos.y - e.clientY };
        pos.x = e.clientX;
        pos.y = e.clientY;
    
        menu.style.top = (menu.offsetTop - move.y) + "px";
        menu.style.left = (menu.offsetLeft - move.x) + "px";
    }

    function dragEnd() {
        isDragging = false;
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('mousemove', dragging);
    }
})();