import { Link, useNavigate } from "react-router-dom"
import { logo } from '../constants'
import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../helpers/persistence"
import { logoutUser } from "../slice/auth"

const Navbar = () => {
    const { isLoggedIn, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logoutUser())
        removeItem("token")
        navigate("/login")
    }
    return (
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <Link to={"/"} style={{ width: "100px", height: "20px" }}>
                    <img className="mb-4" src={logo} alt="" style={{ width: "120px", height: "120px", marginTop: "-50px" }} />
                </Link>
                <span className="fs-4">Pricing example</span>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {isLoggedIn
                        ?
                        <>
                            <p className="link-body-emphasis text-decoration-none me-3 mt-1 m-0">{user.username}</p>
                            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                        </>
                        :
                        <>
                            <Link className="me-3 py-2 link-body-emphasis text-decoration-none btn btn-success text-white" to={"/login"}>
                                Log In
                            </Link>
                            <Link className="me-3 py-2 link-body-emphasis text-decoration-none btn btn-warning " to={"/register"}>
                                Register
                            </Link>
                        </>
                    }


                </nav>
            </div>
        </header>

    )
}

export default Navbar