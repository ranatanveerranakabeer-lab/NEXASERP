import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormCheck,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

import AppButton from '../../components/common/AppButton'

function BranchAddEditForm({ visible, setVisible, form, setForm, handleSave, branches = [] }) {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>
        <CModalTitle>Add / Edit Branch</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CForm>
          {/* ROW 1 */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Code"
                value={form.code || ''}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
            </CCol>

            <CCol md={6}>
              <CFormInput
                placeholder="Name"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* ROW 2 */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Street"
                value={form.street || ''}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
              />
            </CCol>

            <CCol md={6}>
              <CFormInput
                placeholder="City"
                value={form.city || ''}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* ROW 3 */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Emirate"
                value={form.emirate || ''}
                onChange={(e) => setForm({ ...form, emirate: e.target.value })}
              />
            </CCol>

            <CCol md={6}>
              <CFormInput
                placeholder="Contact Person"
                value={form.contactPerson || ''}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* ROW 4 */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Phone"
                value={form.phone || ''}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </CCol>

            <CCol md={6}>
              <CFormInput
                type="number"
                placeholder="Employee Count"
                value={form.employeeCount || 0}
                onChange={(e) =>
                  setForm({
                    ...form,
                    employeeCount: Number(e.target.value),
                  })
                }
              />
            </CCol>
          </CRow>

          {/* ROW 5 */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormInput
                placeholder="Address"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* ROW 6 */}
          <CRow className="mb-3">
            <CCol md={6}>
              <select
                className="form-select"
                value={form.parentBranchId || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    parentBranchId: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">-- Parent Branch --</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </CCol>

            <CCol md={3} className="d-flex align-items-center">
              <CFormCheck
                label="Is Default"
                checked={form.isDefault || false}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              />
            </CCol>

            <CCol md={3} className="d-flex align-items-center">
              <CFormCheck
                label="Is Active"
                checked={form.isActive ?? true}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>

        <AppButton onClick={handleSave}>Save</AppButton>
      </CModalFooter>
    </CModal>
  )
}

export default BranchAddEditForm
