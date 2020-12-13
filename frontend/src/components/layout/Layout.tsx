import Nav from 'react-bootstrap/esm/Nav'
import { Navigation } from '../Navigation'

export const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}