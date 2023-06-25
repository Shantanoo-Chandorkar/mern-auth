import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlices';


const Hero = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                    <h1 className="text-center mb-4">MERN App</h1>
                    <p className="text-center mb-4">
                        This is a MERN authentication website which stores a JWT in
                        an HTTP-Only cookie. It also uses Redux Toolkit for state management
                        and React Bootstrap for User Interface.
                    </p>
                    <div className="d-flex">
                        {userInfo ? (
                            <>

                                <Button variant="outline-info" onClick={logoutHandler}>
                                    Logout
                                </Button>
                            </>
                        ) : (

                            <>
                                <LinkContainer to='/login'>
                                    <Button variant="outline-dark" className="me-3">
                                        Sign In
                                    </Button>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Button variant="outline-info">
                                        Sign Up
                                    </Button>
                                </LinkContainer>
                            </>
                        )}



                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Hero;