// add a debug console to the page
function insertConsole() {
    // DIV to display the log output
    var debugDiv = document.createElement("div")
    debugDiv.setAttribute("id", "console")
    debugDiv.style = "background: salmon; border: 1px dotted red; white-space: pre;"
    document.body.insertBefore(debugDiv, document.body.firstChild)
    
    // an input field to execute code manually
    var runInput = document.createElement("input")
    runInput.setAttribute("type", "text")
    runInput.setAttribute("style", "width: 100%")
    runInput.onkeyup = function(e){
        if (e.keyCode === 13) {
            var out = eval(runInput.value);
            if (out) console.log(out);
        }
    };
    document.body.insertBefore(runInput, debugDiv)
}

// log console output to page
console.log = function(message, ...params) {
    if (document.getElementById("console") === null) {
        insertConsole();
    }

    if (message instanceof Object || message instanceof Array) {
        document.getElementById('console').innerHTML += 
            JSON.stringify(message, null, 2) + "\n";
    } else {
        document.getElementById('console').innerHTML += message + "\n";
    }
};

console.clear = function() {
    if (document.getElementById('console') !== null) {
        document.getElementById('console').innerHTML = ""
    }
}

// display errors in "console"
window.onerror = function(msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;
    console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
    var suppressErrorAlert = true;
    return suppressErrorAlert;
};
