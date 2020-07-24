let isDragging = false;

(function() {
    let pos = { x: 0, y: 0 }
    const bar = document.querySelector('.bar');
    bar.addEventListener('mousedown', dragStart);
    bar.addEventListener('touchstart', dragStart);

    function dragStart(e) {
        isDragging = true;
        
        if(e.touches !== undefined) {
            pos.x = e.touches[0].clientX;
            pos.y = e.touches[0].clientY;
        } else {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
        
        document.addEventListener('mousemove', dragging);
        document.addEventListener('touchmove', dragging);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }

    function dragging(e) {
        const move = { x: 0, y: 0 };

        if(e.touches !== undefined) {
            move.x = pos.x - e.touches[0].clientX;
            move.y = pos.y - e.touches[0].clientY;
            pos.x = e.touches[0].clientX;
            pos.y = e.touches[0].clientY;
        } else {
            move.x = pos.x - e.clientX;
            move.y = pos.y - e.clientY;
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
    
        const menu = document.querySelector('.menu');
        menu.style.top = (menu.offsetTop - move.y) + "px";
        menu.style.left = (menu.offsetLeft - move.x) + "px";
    }

    function dragEnd() {
        isDragging = false;
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('mousemove', dragging);
        document.removeEventListener('touchmove', dragging);
    }
})();