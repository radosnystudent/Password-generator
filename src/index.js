import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Form, Button} from 'react-bootstrap';


const generatePasswd = () => {
    let characters = '';
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
        characters += '\'"';
    if(document.getElementById("dashes_slashes").checked)
        characters += '\\/|_';
    if(document.getElementById("brackets").checked)
        characters += '()[]{}';

    let password_length = document.getElementById("length").value;

    if(characters.length > 0){
        if(password_length > 7 && password_length <= 50){
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

const capitalize = (text) => {
    if (typeof text !== 'string')
        return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const SubmitButton = () => {
    return (
        <div class="submitDiv">
            <Button value="Generate" name="submit" type="submit" variant="dark">Generate</Button>
        </div>
    )
}

const Output = () => {
    return (
        <div className="outputDiv">
            <span className="input" id="output" name="output" contentEditable={true}></span>
        </div>
    )
}

const Alerts = () => {
    return (
        <Alert id="myalert" variant={'danger'} style={{visibility: "hidden"}}></Alert>
    )
}

const Title = (props) => {
    return (
        <div>
            <h2 style={{fontWeight: 'bold', fontSize: '4em'}}>
                {props.value}
            </h2>
        </div>
    )
}

const NormalInput = () => {
    return (
        <li>
            <div>
                <Form.Label for="length" style={{float: "left", marginBottom: "0.5em", padding: "10px"}}>Password length (8-50 characters)</Form.Label>
                <Form.Control type="text" id="length" name="length" defaultValue={8} style={{textAlign: "center", marginTop: "1.5em"}}/>
            </div>
        </li>
    )
}

const MyLabel = (props) => {
    return (
        <li style={{marginBottom: "-1.5px"}}>
            <Form.Label className="second-part" for={props.name}>
                {props.text}
            </Form.Label>
        </li>
    )
}

class CheckboxInput extends React.Component {

    render(){
        return(
            <li>
                <div>
                    <Form.Check 
                        custom
                        defaultChecked={true}
                        type={'checkbox'}
                        id={this.props.name}
                        className="mycheckbox"
                        label={this.props.text}
                    />
                </div>
            </li>
        )
    }
}

class MyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lowletters: true,
            capletters: true,
            numbers: true,
            math_symbols: true,
            logograms: true,
            punctuation: true,
            quotation_marks: true,
            dashes_slashes: true,
            brackets: true,
            length: 8,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        generatePasswd();
    }

    render() {
        let labelTexts = ['(a-z)', '(A-Z)', '(0-9)', '-+=*<>', '#$%&@^`~', '.,:;?!', '\'"', '/\\|_', '[{()}]'];
        let checkboxList = [];
        let names = [];
        let labelList = [];
        for(const [key, value] of Object.entries(this.state)){
            if (key !== 'length'){
                names.push(key);
                checkboxList.push(<CheckboxInput name={key} checked={value} text={capitalize(key.replace("_", " "))}/>)
            }
        }
        
        for(let i = 0; i < labelTexts.length; i++)  {
            labelList.push(<MyLabel text={labelTexts[i]} name={names[i]}/>)
        }

        return (
            <form onSubmit={this.submitHandler}>
                <div className="grid-container">
                    <div className="grid-item">
                        <ul style={{listStyleType: 'none'}}>
                            {checkboxList}
                            <NormalInput/>
                        </ul>
                    </div>
                    <div className="grid-item">
                        <ul style={{listStyleType: "none"}}>
                            {labelList}
                        </ul>
                    </div>
                </div>
                <SubmitButton />
                <Output />
            </form>
        )
    }

}

class App extends React.Component {
    render() {
        return (
            <div className="centerDiv">
                <Alerts />
                <Title value={"Password Generator"} />
                <MyForm />
            </div>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);
