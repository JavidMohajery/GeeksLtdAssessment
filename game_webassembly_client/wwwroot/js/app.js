window.generateNewRound = function (newCandidateObj) {
    var container = document.getElementById("container");

    var candidateDiv = document.createElement('div');
    candidateDiv.setAttribute('id', 'newCandidate');
    candidateDiv.setAttribute('draggable', 'true');
    candidateDiv.setAttribute('ondragstart', "event.dataTransfer.setData('text/plain',null)");
    candidateDiv.classList.add('defaultPath');
    candidateDiv.style.backgroundImage = 'Url(../images/' + newCandidateObj.image + ')';

    container.appendChild(candidateDiv);
}

window.appStart = function (dotnetHelper) {
    var candidateBox = document.getElementById("newCandidate");

    candidateBox.onanimationend = (e) => {
        var container = document.getElementById("container");
        container.removeChild(candidateBox);

        var nationalityId = getGuessNationalityId(e.animationName);
        dotnetHelper.invokeMethodAsync('GuessAndGo', nationalityId);
    };
    function getGuessNationalityId(animationName) {
        var result;
        switch (animationName) {
            case 'topLeft': result = 1;
                break;
            case 'topRight': result = 2;
                break;
            case 'bottomLeft': result = 3;
                break;
            case 'bottomRight': result = 4;
                break;

            default: result = 0;
        }
        return result;
    }

    let dynamicStyles = null;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }


        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }




    dragElement(document.getElementById("newCandidate"));
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var startTop, startLeft, endTop, endLeft;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {

            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;

            pos3 = e.clientX;
            pos4 = e.clientY;

            var newTop = (elmnt.offsetTop - pos2) + "px";
            var newLeft = (elmnt.offsetLeft - pos1) + "px";

            var element = document.getElementById("newCandidate");
            element.classList.remove('defaultPath');
            element.style.left = newLeft;
            element.style.top = newTop;
            startLeft = normalizePixelValue(element.style.left);
            startTop = normalizePixelValue(element.style.top);
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            var element = document.getElementById("newCandidate");
            endLeft = normalizePixelValue(element.style.left);
            endTop = normalizePixelValue(element.style.top);

            makeTransition();
        }

        function normalizePixelValue(value) {
            var newValue = value.substring(0, value.length - 2);
            return Number(newValue);
        }
        function makeTransition() {
            if (Math.abs(endLeft - startLeft) < 20 && Math.abs(endTop - startTop) < 20) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate', 'middle-end');
                candidateBox.classList.add('middle-end');

                addAnimation(`
                            @keyframes middleEnd{
                                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                                to   {  top:80%; left: 45%;  opacity: 0;}
                            }
                            `);
                return;
            }

            if (endLeft < startLeft && endTop < startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate', 'middle-end');
                candidateBox.classList.add('topleft-animate');

                addAnimation(`
                            @keyframes topLeft{
                                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                                to   {  top:0; left: 0;  opacity: 0;}
                            }
                            `);
            }
            if (endLeft < startLeft && endTop >= startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate', 'middle-end');
                candidateBox.classList.add('bottomleft-animate');

                addAnimation(`
                            @keyframes bottomLeft{
                                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                                to   {  top:80%; left: 0;  opacity: 0;}
                            }
                            `);
            }
            if (endLeft >= startLeft && endTop < startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate', 'middle-end');
                candidateBox.classList.add('topright-animate');

                addAnimation(`
                            @keyframes topRight{
                                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                                to   {  top:0; left: 80%;  opacity: 0;}
                            }
                            `);
            }
            if (endLeft >= startLeft && endTop >= startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate', 'middle-end');
                candidateBox.classList.add('bottomright-animate');

                addAnimation(`
                            @keyframes bottomRight{
                                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                                to   {  top:80%; left: 80%;  opacity: 0;}
                            }
                            `);
            }
        }
    }

}