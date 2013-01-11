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

    board.style.left = (crop_window.offsetWidth - board.offsetWidth) / 2;
    board.style.top = (crop_window.offsetHeight - board.offsetHeight) / 2;
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

function addScroll() {
    var borderLeft = document.getElementById('border-left');
    var intervalId;
    borderLeft.addEventListener('mouseover', function() {
        intervalId = setInterval(function() {
            var newPosition = parseInt(board.style.left.split("p")[0]) + 100;
            console.log(newPosition);
            if(newPosition >= 0) {
                newPosition = 0;
                clearInterval(intervalId);
            }
            board.style.left = newPosition.toString() + 'px';
        }, 1000);
    });

    borderLeft.addEventListener('mouseout', function() {
        clearInterval(intervalId);
    });
}


createGrid();
addDrag();
addDrop();
addScroll();