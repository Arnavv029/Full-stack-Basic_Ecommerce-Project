import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = !! localStorage.getItem('access_token')

const PrivateRoute = ({redirectPath = '/login'}) => {
  return (
      isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />
  )
}

export default PrivateRoute