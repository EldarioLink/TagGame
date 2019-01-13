window.onload = function () {
    var parent = document.getElementsByClassName("puzzleBox")[0];
    var div = [];
    var rows = 4,
        columns = 4;
    var margin = 11;
    var border = 3;
    var divTop = margin;
    var divLeft = margin;
    var divWidth = 75;
    var i = 0;
    var shiftX;
    var shiftY;

    // clock
    var h = 0,
        min = 0,
        sec = 0,
        textclock;

    /////////////  clock clock
    textclock = setInterval(clockgame, 1000);
    clockgame();
    function clockgame() {
        var clock = document.getElementsByClassName("clock")[0];
        var time = new Date();
        h = (time.getHours() % 24).toString();
        min = time.getMinutes().toString();
        sec = time.getSeconds().toString();
        if (h.length < 2) {
            h = "0" + h;
        }
        if (min.length < 2) {
            min = "0" + min;
        }
        if (sec.length < 2) {
            sec = "0" + sec;
        }
        textclock = h + ":" + min + ":" + sec;
        clock.innerHTML = textclock;
    }

    //for(var i=0;i<15;i++){
    for (columns = 0; columns < 4; columns++) {
        for (rows = 0; rows < 4; rows++) {
            div[i] = document.createElement("div");
            div[i].className = "puzzleBlock";
            div[i].innerHTML = i + 1;
            div[i].style.top = divTop + "px";
            div[i].style.left = divLeft + "px";
            parent.appendChild(div[i]);
            i = i + 1;
            if (i > 14) break;
            divLeft = divLeft + divWidth;
        }

        divLeft = margin;
        divTop = divTop + divWidth;
    }

    document.onmousedown = function (e) {
        i = e.target.innerHTML - 1;
        var coordsmousedownElem = getCoords(div[i]);

        shiftX = e.pageX - coordsmousedownElem.left;
        shiftY = e.pageY - coordsmousedownElem.top;

        document.onmousemove = function (e) {
            let currentElem = div[i];

            // выход за коробку - return
            if ((e.pageX + (div[i].offsetWidth - shiftX) > parent.offsetWidth + margin - 6)
                || (e.pageX - shiftX < margin)
                || (e.pageY - shiftY < margin)
                || (e.pageY + border * 2 + (div[i].offsetHeight - shiftY) > parent.offsetHeight + margin
                ))
                return;


            let newX = e.pageX - shiftX;
            let newY = e.pageY - shiftY;

            let allowX = true;
            let allowY = true;
            for (let index in div) {
                if (index == i) continue;

                let otherElem = div[index];
                let currentX = getCoords(currentElem).left;
                let currentY = getCoords(currentElem).top;

                if (!isLeftSideCollide(newX, otherElem) || !isRightSideCollide(newX, otherElem)) {
                    // allowX = true;
                } else {
                    if (!isTopCollide(currentY, otherElem) || !isBottomCollide(currentY, otherElem)) {
                        // allowX = true;
                    } else {
                        allowX = false;
                        continue;

                    }
                }

                if (!isTopCollide(newY, otherElem) || !isBottomCollide(newY, otherElem)) {

                } else {
                    if (!isLeftSideCollide(newX, otherElem) || !isRightSideCollide(newX, otherElem)) {

                    } else {
                        allowY = false;
                        continue;
                    }
                }
            }

            if (allowX)
                currentElem.style.left = newX + "px";

            if (allowY)
                currentElem.style.top = newY + "px";
        };

        //  проверка на столкновение правой стороны с другим эл-том
        function isRightSideCollide(newX, otherElem) {
            let width = otherElem.offsetWidth;
            let otherElemLeftSide = getCoords(otherElem).left;
            let newRightSide = newX + width;

            return newRightSide > otherElemLeftSide;
        }

        //  проверка на столкновение левой стороны с другим эл-том
        function isLeftSideCollide(newX, otherElem) {
            let width = otherElem.offsetWidth;
            let otherElemRightSide = getCoords(otherElem).left + width;
            let newLeftSide = newX;

            return newLeftSide < otherElemRightSide;
        }
        //  проверка на столкновение нижней стороны с другим эл-том
        function isTopCollide(newY, otherElem) {
            let height = otherElem.offsetHeight;
            let newBottom = newY + height;
            let otherElemTop = getCoords(otherElem).top;

            return newBottom > otherElemTop;
        }
        //  проверка на столкновение с верхней стороны с другим эл-том
        function isBottomCollide(newY, otherElem) {
            let height = otherElem.offsetHeight;
            let newTop = newY;
            let otherElemBottom = getCoords(otherElem).top + height;

            return newTop < otherElemBottom;
        }

        document.onmouseup = function () {
            document.onmousemove = null;
            div[i].onmouseup = null;
        };
    };
    function getCoords(elem) {
        // кроме IE8-
        var box = elem.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    }
};
