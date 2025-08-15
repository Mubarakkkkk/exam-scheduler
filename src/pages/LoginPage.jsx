import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const navigateTo = useNavigate();

    const handleUserName = (evt) => {
        setUsername(evt.target.value);
    }
    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (username === "admin" && password === '123') {
            navigateTo("/admin");
        }
        else if (username === "student" && password === '123') {
            navigateTo("/student");
        }
    }

  return (
    <main className = "login">
        <div className = "introduction">
            <div>
                <h2 className = "introduction__1">design and implementaion of</h2>
            </div>
            <div>
                <h1 className = "introduction__2">examination scheduling system using web technology</h1>
            </div>
            <div>
                <span className = "introduction__3">a case study of </span>
                <h4 className = "introduction__4">school of computing, federal polytechnic offa</h4>
            </div>
            <div>
                <span className = "introduction__5">design by </span>
                <h5 className = "introduction__6">uzohako favour</h5>
                <h5 className = "introduction__7"> swd/hnd/f23/0419</h5>
            </div>
        </div>
        <form onSubmit = { handleSubmit } className = "form">
            <header className = "form__header text-center">
                <h3 className = "form__heading-primary size-big">Exam Scheduling System</h3>
                <span className = "form__heading-secondary size-small m-t-medium">School Of Computing</span>
            </header>

            <div className = "form__details m-t-big">
                <div className = "form__group">
                    <label htmlFor="user" className = "form__label">UserName</label>
                    <input type="text" className = "form__input" value = { username } onChange = { handleUserName } required/>
                </div>
                <div className = "form__group">
                    <label htmlFor="pass" className = "form__label">Password</label>
                    <input type="password" className = "form__input" value = { password } onChange = { handlePassword } required/>
                </div>

                <button type = "submit" className = "form__submit">Login</button>
            </div>
        </form>
    </main>
  )
}
