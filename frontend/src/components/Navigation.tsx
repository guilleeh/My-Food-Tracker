import Link from 'next/link'
import Router from 'next/router'
import { useAppContext } from '../libs/context'
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import { Auth } from 'aws-amplify'

export const Navigation = () => {
  const { loggedIn, setLoggedIn } = useAppContext()

  const handleLogout = async () => {
    await Auth.signOut()

    setLoggedIn(false)

    Router.push('/login')
  }

  return (
    <div className='container py-3'>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <Link href='/'>
          <Navbar.Brand className='font-weight-bold text-muted'>
            <img src='/img/logo.png' alt='Picture of My Food Tracker logo' width={25} height={25} className='mb-1' />{' '}
          My Food Tracker
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {loggedIn ? (
            <Nav.Link onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (

              <>
                <Nav className='pr-2'>
                  <Link href='/login'>
                    Login
  </Link>
                </Nav>
                <Nav>
                  <Link href='/signup'>
                    Sign Up
  </Link>
                </Nav>
              </>
            )}
        </Navbar.Collapse>
      </Navbar>
      <style jsx>
        {`
          a {
            padding-right: 10px;
          }
        `}
      </style>
    </div>
  )
}