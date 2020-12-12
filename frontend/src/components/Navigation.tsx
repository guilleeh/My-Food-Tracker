import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import Link from 'next/link'

export const Navigation = () => {
  return (
    <div className='container py-3'>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <Navbar.Brand className='font-weight-bold text-muted'>
          My Food Tracker
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
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