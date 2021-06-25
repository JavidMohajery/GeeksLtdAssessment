window.generateNewRound = function (newCandidateObj) {
    //debugger
    var container = document.getElementById("container");

    var candidateDiv = document.createElement('div');
    candidateDiv.setAttribute('id', 'newCandidate');
    candidateDiv.setAttribute('draggable', 'true');
    candidateDiv.setAttribute('ondragstart', "event.dataTransfer.setData('text/plain',null)");
    candidateDiv.classList.add('defaultPath');
    candidateDiv.style.backgroundImage = 'Url(../images/' + newCandidateObj.image + ')';
    
    container.appendChild(candidateDiv);

    //var candidateBox = document.getElementById("newCandidate");
    //candidateBox.classList.add('defaultPath');
}

window.appStart = function (objRef) {
    console.log(objRef);
    var candidateBox = document.getElementById("newCandidate");
    /*candidateBox.classList.add('defaultPath');*/
    // candidateBox.classList.add('candidateBox');
    // candidateBox.style.animationName = "candidateDefaultPath";
    candidateBox.onanimationend = (e) => {
/*        debugger*/
        //if (e.animationName == "candidateDefaultPath") {
        //candidateBox.style.opacity = 1;
        ////}

        //candidateBox.style.left = '50%';
        //candidateBox.style.top = 0;
        pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate');
        var container = document.getElementById("container");
        container.removeChild(candidateBox);
    //    candidateBox.classList.add('defaultPath');
    //    addAnimation(`
    //@keyframes candidateDefaultPath {

    //    0%    {  left:50%; top:0; opacity: 1;}
    //    25%   {  left:50%; top:25%;}
    //    50%   {  left:50%;top:50%;}
    //    75%   {  left:50%;top:75%;opacity: 1;}
    //    100%  {  left:50%;top:100%;opacity: 0;}
    //  }
        //`);
        var nationalityId = getGuessNationalityId(e.animationName);
        objRef.invokeMethodAsync('GuessAndGo', nationalityId);
        console.log('Animation ended');
        console.log(e);
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
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

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

            console.log("startLeft", startLeft);
            console.log("startTop", startTop);
        }
        function normalizePixelValue(value) {
            var newValue = value.substring(0, value.length - 2);
            return Number(newValue);
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

            console.log("endLeft", endLeft);
            console.log("endTop", endTop);
            makeTransition();
        }
        function makeTransition() {

            if (endLeft < startLeft && endTop < startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate');
                candidateBox.classList.add('topleft-animate');

                addAnimation(`
            @keyframes topLeft{
                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                to   {  top:0; left: 0;  opacity: 0;}
            }
            `);
            }
            if (endLeft < startLeft && endTop >= startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate');
                candidateBox.classList.add('bottomleft-animate');

                addAnimation(`
            @keyframes bottomLeft{
                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                to   {  top:80%; left: 0;  opacity: 0;}
            }
            `);
            }
            if (endLeft >= startLeft && endTop < startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate');
                candidateBox.classList.add('topright-animate');

                addAnimation(`
            @keyframes topRight{
                from    {  top:${endTop}; left: ${endLeft}; opacity: 1;}
                to   {  top:0; left: 80%;  opacity: 0;}
            }
            `);
            }
            if (endLeft >= startLeft && endTop >= startTop) {
                candidateBox.classList.remove('defaultPath', 'topleft-animate', 'bottomleft-animate', 'bottomright-animate', 'topright-animate');
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