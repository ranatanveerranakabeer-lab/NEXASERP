import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer,
  CForm, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilHome } from '@coreui/icons'

import { getAllTenants } from '../../../redux/slice/tenantSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Tenants ka data tenantSlice se lein aur loading status userSlice se
  const tenants = useSelector((state) => state.tenants?.result || [])
  const { isLoading, currentUser } = useSelector((state) => state.users)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    tenantId: 0
  })

  // Page load hote hi tenants fetch karein
  useEffect(() => {
    dispatch(getAllTenants())
  }, [dispatch])
useEffect(() => {
  if (currentUser) {
    navigate('/dashboard') // ya '/dashboard'
  }
}, [currentUser, navigate])
  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.tenantId === 0) {
      alert("Please select a Tenant")
      return
    }
    // Login trigger
    dispatch({ type: 'users/loginUser', payload: loginData })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    
                    {/* Tenant Dropdown (Using data from tenantSlice) */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText><CIcon icon={cilHome} /></CInputGroupText>
                      <CFormSelect 
                        value={loginData.tenantId}
                        onChange={(e) => setLoginData({...loginData, tenantId: parseInt(e.target.value)})}
                        style={{ border: '1px solid #6f42c1', boxShadow: 'none' }}
                      >
                        <option value="0">Select Tenant</option>
                        {tenants.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>

                    {/* Email Input */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput 
                        placeholder="Email" 
                        style={{ border: '1px solid #6f42c1', boxShadow: 'none' }}
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      />
                    </CInputGroup>

                    {/* Password Input */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        style={{ border: '1px solid #6f42c1', boxShadow: 'none' }}
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" disabled={isLoading}>
                          {isLoading ? 'Processing...' : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>ERP Softify</h2>
                    <p>Manage your business operations efficiently with our secure POS and Inventory system.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login