import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { 
    Jumbotron,
    Spinner,
    Form,
    Button,
    FormGroup,
    Label,
    Input
    } from "reactstrap";
import  firebase  from "../firebaseConfig";

function Login() {
    const history = useHistory();
    const [creds, setCreds] = useState({nickname: ""});
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref("users/");


    const onChange = (e) => {
        e.persist();
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    const login = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('nickname').equalTo(creds.nickname).once('value', snapshot => {
            if (snapshot.exists()) {
                localStorage.setItem('nickname', creds.nickname);
            } else {
                const newUser = firebase.database().ref('users/').push();
                newUser.set(creds);
                localStorage.setItem('nickname', creds.nickname);
            }
            history.push('/roomList');
            setShowLoading(false);
        })
    }

    return (
        <div>
            {showLoading && 
                <Spinner color='primary' />
            }
            <Jumbotron >
                <Form onSubmit={login}>
                    <FormGroup>
                        <Label>Nickname</Label>
                        <Input type='text' onChange={onChange} name='nickname' id='nickname' placeholder='Enter your Nickname'/>
                    </FormGroup>
                    <Button varian='primary' type='submit'>
                        Login
                    </Button>
                </Form>
            </Jumbotron>
            
        </div>
    )

}

export default Login;