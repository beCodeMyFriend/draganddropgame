function createGrid() {
    var rows = 9;
    var columns = 9;
    var board = document.getElementById('board');
    var crop_window = document.getElementById('window');
    for(var i = 0; i < rows; i++) {
        var row = document.createElement('tr');
        for(var j = 0; j < columns; j++) {
            var column = document.createElement('td');
            var innerDiv = document.createElement('div');
            innerDiv.className = 'tile';

            column.appendChild(innerDiv);
            row.appendChild(column);
        }
        board.appendChild(row);
    }

    board.style.left = ((crop_window.offsetWidth - board.offsetWidth) / 2).toString() + 'px';
    board.style.top = ((crop_window.offsetHeight - board.offsetHeight) / 2).toString() + 'px';
};

function addDrag() {

    function handleDragStart(e) {
        this.style.opacity = '0.8';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    var cols = document.querySelectorAll('#dock_tile ul li');
    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
    });
};

function addDrop() {

    function handleDragOver(e) {
        if(e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        if(e.preventDefault) {
            e.preventDefault();
        }
        if(e.stopPropagation) {
            e.stopPropagation();
        }

        this.innerHTML = e.dataTransfer.getData('text/html');
        return false;
    }

    var cols = document.querySelectorAll('#board .tile');
    [].forEach.call(cols, function(col) {
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('drop', handleDrop, false);
    });

};

function addScrolls() {
    addScroll('scroll-left', 'left', 1);
    addScroll('scroll-right', 'left', -1);
    addScroll('scroll-top', 'top', 1);
    addScroll('scroll-bottom', 'top', -1);
};

function addScroll(elementId, property, direction) {
    var scroll = document.getElementById(elementId);
    var intervalId;
    var speed = 100;
    var board = document.getElementById('board');
    var crop_window = document.getElementById('window');

    var limit = 0;
    if(direction < 0){
        limit = crop_window.offsetHeight - board.offsetHeight;
    }

    scroll.addEventListener('mouseover', function() {
        var move = function() {
            var position = parseInt(board.style[property].match(/^(.*)px$/)[1]);
            var newPosition = position + (speed * direction);

            if(direction > 0 && newPosition > limit ){
                newPosition = limit;
                clearInterval(intervalId);
            }

            if(direction < 0 && newPosition < limit ) {
                newPosition = limit;
                clearInterval(intervalId);
            }
            board.style[property] = newPosition.toString() + 'px';
        };

        intervalId = setInterval(move, 1000);
    });

    scroll.addEventListener('mouseout', function() {
        clearInterval(intervalId);
    });
};

createGrid();
addDrag();
addDrop();
addScrolls();