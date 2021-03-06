// add a debug console to the page
function insertConsole() {
    // skip if already added
    if (document.getElementById("console")) return;

    // an input field to execute code manually
    var runInput = document.createElement("input")
    runInput.setAttribute("type", "text")
    runInput.setAttribute("style", "width: 100%")
    runInput.onkeyup = function(e) {
        // run code when enter is pressed
        if (e.keyCode === 13) {
            var out = eval(runInput.value);
            console.log("-> " + out);
        }
    };
    document.body.insertBefore(runInput, document.body.firstChild)
    
		// DIV to display the log output
    var debugDiv = document.createElement("div")
    debugDiv.setAttribute("id", "console")
    debugDiv.style = "background: salmon; border: 1px dotted red;" + 
			"white-space: pre; overflow: auto";
    document.body.insertBefore(debugDiv, runInput)
 
}

// log console output to page
console.log = function(message, ...params) {
    if (document.getElementById("console") === null) {
        insertConsole();
    }

    if (message instanceof Array) {
			document.getElementById('console').innerHTML += 
						JSON.stringify(message) + "\n";
		} else if (message instanceof Object) {
			document.getElementById('console').innerHTML += 
						Object.prototype.toString.call(message) + "\n" +
						JSON.stringify(message, null, 2) + "\n";
    } else {
			document.getElementById('console').innerHTML += 
						message + "\n";
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

// utility functions for exploratory programming
function dump(obj, filter) {
	  if (obj instanceof Array) {
			console.log(obj)
		} else if (obj instanceof Object) {
				console.log(Object.prototype.toString.call(obj))
        for (p in obj) {
					  if (typeof(filter) === "string" && p.indexOf(filter) < 0) {
							continue;
						}

            if (typeof(obj[p]) === "function") {
                console.log(p + "(...)")
            } else {
                try {
                    console.log(p + " = " + JSON.stringify(obj[p]))
                } catch (e) {
                    console.log(p)               
                }
            }
        }
    } else {
        console.log(obj)
    }
}

// clear console and dump
function dumpc(obj, filter) {
    console.clear()
    dump(obj, filter)
}
