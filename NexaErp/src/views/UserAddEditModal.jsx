import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import AppButton from '../components/common/AppButton'

function UserAddEditModal({
  visible,
  setVisible,
  form,
  setForm,
  handleSave,
  roles = [],
  branches = [],
}) {
  // Logic remains untouched as per your requirement
  const handleSubmit = (event) => {
    event.preventDefault()
    handleSave()
  }

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      backdrop="static"
      size="lg"
      centered
      className="modern-grey-modal"
    >
      {/* Header pattern matched with Roles UI */}
      <CModalHeader className="border-0 pb-0">
        <CModalTitle className="fw-bold px-2" style={{ fontSize: '1.2rem' }}>
          {form.id === 0 ? 'Add New User' : 'Edit User Info'}
        </CModalTitle>
      </CModalHeader>

      <CModalBody className="py-4 px-4">
        <CForm className="needs-validation" onSubmit={handleSubmit}>
          <CRow>
            {/* Input fields styled to match the modern grey/transparent look */}
            <CCol md={6} className="mb-4">
              <CFormInput
                label="Full Name"
                placeholder="Enter full name"
                required
                className="custom-modern-input"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </CCol>
            <CCol md={6} className="mb-4">
              <CFormInput
                label="Username"
                placeholder="Enter username"
                required
                className="custom-modern-input"
                value={form.userName || ''}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
              />
            </CCol>

            <CCol md={6} className="mb-4">
              <CFormInput
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                required
                className="custom-modern-input"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </CCol>
            <CCol md={6} className="mb-4">
              <CFormInput
                label="Phone Number"
                placeholder="+971 XXX XXXX"
                className="custom-modern-input"
                value={form.phoneNumber || ''}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              />
            </CCol>

            <CCol md={6} className="mb-4">
              <CFormSelect
                label="Role"
                required
                className="custom-modern-input"
                value={form.roleId || ''}
                onChange={(e) => setForm({ ...form, roleId: Number(e.target.value) })}
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.roleName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} className="mb-4">
              <CFormSelect
                label="Branch"
                className="custom-modern-input"
                value={form.branchId || ''}
                onChange={(e) => setForm({ ...form, branchId: Number(e.target.value) })}
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol md={6} className="mb-4">
              <CFormSelect
                label="Status"
                className="custom-modern-input"
                value={form.status || 'Active'}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                options={[
                  { label: 'Active', value: 'Active' },
                  { label: 'Inactive', value: 'Inactive' },
                ]}
              />
            </CCol>

            {form.id === 0 && (
              <CCol md={6} className="mb-4">
                <CFormInput
                  label="Password"
                  type="password"
                  required
                  placeholder="Create password"
                  className="custom-modern-input"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </CCol>
            )}
          </CRow>
        </CForm>
      </CModalBody>

      {/* Footer styled with extra padding and clean buttons like Role UI */}
      <CModalFooter className="border-0 pt-0 px-4 pb-4">
        <CButton
          variant="ghost"
          color="secondary"
          className="fw-medium"
          onClick={() => setVisible(false)}
        >
          Cancel
        </CButton>
        <AppButton className="px-4" onClick={handleSave}>
          {form.id === 0 ? 'Create User' : 'Update Changes'}
        </AppButton>
      </CModalFooter>
    </CModal>
  )
}

export default UserAddEditModal
