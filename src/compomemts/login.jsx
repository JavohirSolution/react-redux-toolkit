import { useEffect, useState } from 'react'
import { logo } from '../constants'
import { Input } from '../ui'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'
import { ValidationError } from "./"
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isLoading, isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()
        dispatch(signUserStart())
        const user = { email, password }
        try {
            const response = await AuthService.userLogin(user)
            dispatch(signUserSuccess(response.user))
            navigate("/")
        } catch (error) {
            dispatch(signUserFailure(error.response.data.errors))
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])

    return (
        <main className="form-signin w-50 m-auto text-center">
            <form>
                <img className="" src={logo} alt="" width="130" height="130" />
                <h1 className="h3 mb-3 fw-normal">Please Log In</h1>

                <ValidationError />
                <Input type="email" label="Email address" state={email} setState={setEmail} />
                <Input type="password" label="Password" state={password} setState={setPassword} />

                <button className="btn btn-primary w-100 py-2 mb-2" disabled={isLoading} type="submit" onClick={loginHandler}>
                    {isLoading ? "Loading..." : "Log in"}
                </button>
            </form>
        </main>
    )
}

export default LogIn