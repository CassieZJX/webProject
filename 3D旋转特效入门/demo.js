(function () {
    var imageBtn = document.getElementsByClassName('image-buttons')[0],
        cube = document.getElementsByClassName('cube')[0],
        currentClassName = cube.classList[1];
    imageBtn.addEventListener('click', function (e) {
        var targetNode = e.target.nodeName;
        var targetClass = e.target.className;
        // console.log('targetNode' + targetNode);
        // console.log('targetClass' + targetClass);
        if(targetNode==='INPUT'&& targetClass!==currentClassName){
            cube.classList.replace(currentClassName,targetClass);
            currentClassName=targetClass;
        }
    })
})()