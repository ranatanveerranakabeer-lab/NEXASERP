import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CContainer,
  CSpinner,
  CAvatar,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getCompany, saveCompany, saveProfile } from '../../redux/slice/companySlice'
import AppButton from '../../components/common/AppButton'

const CompanySetting = () => {
  const dispatch = useDispatch()

  const { company, profile, isLoading } = useSelector((state) => state.companies)

  const fileInputRef = useRef(null)

  const [activeKey, setActiveKey] = useState(1)

  const BASE_URL = 'https://localhost:7016'

  const [profileData, setProfileData] = useState({
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    profilePictureUrl: '',
    imageFile: null,
    companyId: 0,
  })

  const [companyData, setCompanyData] = useState({
    id: 0,
    tenantId: 0,
    companyName: '',
    address: '',
    phone: '',
  })

  // Data Fetching
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const currentUser = JSON.parse(userStr)

      const uid = currentUser?.userId || currentUser?.id
      const companyId = currentUser?.companyId

      if (uid) dispatch(getProfile(uid))
      if (companyId) dispatch(getCompany(companyId))
    }
  }, [dispatch])

  // Profile Sync
  useEffect(() => {
    if (profile) {
      setProfileData((prev) => ({
        ...prev,
        id: profile.id || profile.userId || profile.Id || 0,
        name: profile.name || profile.Name || '',
        email: profile.email || profile.Email || '',
        phoneNumber: profile.phoneNumber || profile.PhoneNumber || '',
        profilePictureUrl: profile.profilePictureUrl || profile.ProfilePictureUrl || '',
        companyId: profile.companyId || profile.CompanyId || 0,
      }))
    }
  }, [profile])

  // Company Sync
  useEffect(() => {
    if (company) {
      const data = company.data || company
      setCompanyData({
        id: data.Id || data.id || 0,
        tenantId: data.TenantId || data.tenantId || 0,
        companyName: data.CompanyName || data.companyName || '',
        address: data.Address || data.address || '',
        phone: data.Phone || data.phone || '',
      })
    }
  }, [company])

  // Avatar
  const avatarImage = useMemo(() => {
    if (profileData.imageFile) {
      return URL.createObjectURL(profileData.imageFile)
    }
    if (profileData.profilePictureUrl) {
      const path = profileData.profilePictureUrl.startsWith('/')
        ? profileData.profilePictureUrl
        : `/${profileData.profilePictureUrl}`
      return `${BASE_URL}${path}`
    }
    return 'https://via.placeholder.com/150'
  }, [profileData.imageFile, profileData.profilePictureUrl])

  const onUpdateProfile = () => {
    const formData = new FormData()

    formData.append('Id', profileData.id)
    formData.append('Name', profileData.name)
    formData.append('Email', profileData.email)
    formData.append('PhoneNumber', profileData.phoneNumber || '')
    formData.append('EmployeeId', profileData.employeeId || 0)
    formData.append('CompanyId', profileData.companyId)
    formData.append('WebsiteUrl', profileData.websiteUrl || '')

    if (profileData.imageFile) {
      formData.append('ProfileImage', profileData.imageFile) // 👈 Matches UserRequestDto
    }

    dispatch(saveProfile(formData))
  }

  const onUpdateCompany = () => {
    dispatch(
      saveCompany({
        Id: companyData.id,
        CompanyName: companyData.companyName,
        Address: companyData.address,
        TenantId: companyData.tenantId,
        Phone: companyData.phone,
      }),
    )
  }

  return (
    <CContainer fluid className="px-4 mt-2">
      <h4 className="fw-bold mb-4">Settings</h4>

      <CCard className="border-0 shadow-sm overflow-hidden">
        <CCardBody className="p-0">
          <CRow className="g-0" style={{ minHeight: '500px' }}>
            {/* LEFT SIDE */}
            <CCol md={3} className="border-end bg-light p-4 text-center">
              <CAvatar
                src={avatarImage}
                size="xl"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => fileInputRef.current.click()}
              />

              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setProfileData({
                      ...profileData,
                      imageFile: e.target.files[0],
                    })
                  }
                }}
              />

              <h6 className="fw-bold mt-3">{profileData.name || 'User'}</h6>

              <CNav variant="pills" className="flex-column gap-2 text-start mt-4">
                <CNavItem>
                  <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                    Profile
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    Company
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>

            {/* RIGHT SIDE */}
            <CCol md={9} className="p-4">
              {isLoading ? (
                <div className="text-center py-5">
                  <CSpinner />
                </div>
              ) : (
                <CTabContent>
                  {/* PROFILE */}
                  <CTabPane visible={activeKey === 1}>
                    <h5>Profile</h5>
                    <AppButton onClick={onUpdateProfile}>Update</AppButton>

                    <CForm>
                      <CFormInput
                        label="Name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                      <CFormInput
                        label="Email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </CForm>
                  </CTabPane>

                  {/* COMPANY */}
                  <CTabPane visible={activeKey === 2}>
                    <h5>Company</h5>
                    <AppButton onClick={onUpdateCompany}>Save</AppButton>

                    <CForm>
                      <CFormInput
                        label="Company Name"
                        value={companyData.companyName}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, companyName: e.target.value })
                        }
                      />
                      <CFormInput
                        label="Address"
                        value={companyData.address}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, address: e.target.value })
                        }
                      />
                      <CFormInput
                        label="Phone"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      />
                    </CForm>
                  </CTabPane>
                </CTabContent>
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default CompanySetting
