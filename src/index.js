const { spawn }= require('child_process');

function runMyPythonScript(args, callback){

    const pythonProcess = spawn('python',['mypythonscript.py', ...args]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        callback(null, data.toString());
    });    
    
    pythonProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        callback(data.toString(), null);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code: ${code}`);
    });

}

runMyPythonScript(['arg1','arg2'], (err, result) => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("Result: ", result);
    }

});
