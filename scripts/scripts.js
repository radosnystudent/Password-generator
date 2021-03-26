
const generatePasswd = () => {
    let = characters = '';
    if(document.getElementById("lowletters").checked)
        characters += 'abcdefghijklmnopqrstuvwxyz';
    if(document.getElementById("capletters").checked)
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(document.getElementById("numbers").checked)
        characters += '0123456789';
    if(document.getElementById("math_symbols").checked)
        characters += '<>*+=-';
    if(document.getElementById("logograms").checked)
        characters += '#$%&@^`~';
    if(document.getElementById("punctuation").checked)
        characters += '.,:;?!';
    if(document.getElementById("quotation_marks").checked)
        characters += '\'\"';
    if(document.getElementById("dashes_slashes").checked)
        characters += '\\/|_';
    if(document.getElementById("brackets").checked)
        characters += '()[]{}';

    let password_length = document.getElementById("length").value;

    if(characters.length > 0){
        if(typeof password_length == 'number' && password_length > 7 && password_length <= 50){
            let result = '';
            let characters_length = characters.length;

            for(let i = 0; i < password_length; i++)
                result += characters.charAt(Math.floor((window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * characters_length));

            document.getElementById("output").textContent = result;
            document.getElementById("output").style.visibility = 'visible';
            document.getElementById("myalert").style.visibility = 'hidden';
            document.getElementById("myalert").innerHTML = "";
        } else {
            document.getElementById("myalert").style.visibility = 'visible';
            document.getElementById("myalert").innerHTML = "Length must be between 8 and 50";
            document.getElementById("output").style.visibility = 'hidden';
        }
    } else {
        document.getElementById("myalert").style.visibility = 'visible';
        document.getElementById("myalert").innerHTML = "Minimum one checkbox must be checked";
        document.getElementById("output").style.visibility = 'hidden';
    }
}