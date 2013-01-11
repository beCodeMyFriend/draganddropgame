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

function addScrollLeft() {
    var borderLeft = document.getElementById('border-left');
    var intervalId;
    var speed = 100;

    borderLeft.addEventListener('mouseover', function() {
        var moveLeft = function() {
            var newPosition = parseInt(board.style.left.match(/^(.*)px$/)[1]) + speed;
            if(newPosition >= 0) {
                newPosition = 0;
                clearInterval(intervalId);
            }
            board.style.left = newPosition.toString() + 'px';
        };

        intervalId = setInterval(moveLeft, 1000);
    });

    borderLeft.addEventListener('mouseout', function() {
        clearInterval(intervalId);
    });
};

function addScrollRight() {
    var borderRight = document.getElementById('border-right');
    var intervalId;
    var speed = 100;

    borderRight.addEventListener('mouseover', function() {
        var moveRight = function() {
            var newPosition = parseInt(board.style.left.match(/^(.*)px$/)[1]) - speed;
            console.log(newPosition)
            if(newPosition < -350) {
                newPosition = -350;
                clearInterval(intervalId);
            }
            board.style.left = newPosition.toString() + 'px';
        };

        intervalId = setInterval(moveRight, 1000);
    });

    borderRight.addEventListener('mouseout', function() {
        clearInterval(intervalId);
    });
};


createGrid();
addDrag();
addDrop();
addScrollLeft();
addScrollRight();