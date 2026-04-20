import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CBadge,
} from '@coreui/react'

import TableHeader from '../../components/common/TableHeader'
import BranchAddEditForm from './BranchAddEditForm'
import AppButton from '../../components/common/AppButton'

import {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  setBranch,
} from '../../redux/slice/branchSlice'
function Branch() {
  const dispatch = useDispatch()
  const branchData = useSelector((state) => state.branches?.result)
  console.info(branchData)
  const branches = branchData || [] // Default empty array bahar rakhein
  const [visible, setVisible] = useState(false)
  const [activeColumn, setActiveColumn] = useState('')
  const [form, setForm] = useState({
    id: 0,
    name: '',
    code: '',
    street: '',
    city: '',
    emirate: '',
    contactPerson: '',
    phone: '',
    address: '',
    employeeCount: '',
  })

  useEffect(() => {
    dispatch(getAllBranches())
  }, [dispatch])

  const handleSave = () => {
    if (!form.name) return

    if (form.id === 0) {
      dispatch(createBranch(form))
    } else {
      dispatch(updateBranch(form))
    }

    setVisible(false)
    setForm({ id: 0, name: '' })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard style={{ border: 'none' }}>
          <CCardBody>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="mb-1">Branches</h4>
                <AppButton variant="golden" data={branches} fileName="Branches_Report" size="sm">
                  Export to Excel
                </AppButton>
              </div>

              <AppButton onClick={() => setVisible(true)}>Add Branch</AppButton>
            </div>

            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <TableHeader
                    col="Branch Name"
                    activeColumn={activeColumn}
                    setActiveColumn={setActiveColumn}
                  />
                  <TableHeader col="Action" />
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {branches?.map((t) => (
                  <CTableRow key={t.id}>
                    <CTableDataCell>
                      <div>
                        <strong>{t.name}</strong>
                      </div>

                      <small>
                        Code: {t.code || '-'} | City: {t.city || '-'} | Emirate: {t.emirate || '-'}
                      </small>

                      <br />

                      <small>
                        Street: {t.street || '-'} | Address: {t.address || '-'}
                      </small>

                      <br />

                      <small>
                        Contact: {t.contactPerson || '-'} | Phone: {t.phone || '-'}
                      </small>

                      <br />

                      <small>Employees: {t.employeeCount ?? 0}</small>
                    </CTableDataCell>

                    <CTableDataCell className="text-end">
                      <AppButton
                        size="sm"
                        onClick={() => {
                          setForm(t)
                          setVisible(true)
                        }}
                      >
                        Edit
                      </AppButton>

                      <AppButton
                        size="sm"
                        color="danger"
                        style={{ marginLeft: 5 }}
                        onClick={() => dispatch(deleteBranch(t.id))}
                      >
                        Delete
                      </AppButton>

                      <AppButton
                        size="sm"
                        style={{ marginLeft: 5 }}
                        onClick={() => dispatch(setBranch(t))}
                      >
                        Select
                      </AppButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <BranchAddEditForm
        visible={visible}
        setVisible={setVisible}
        form={form}
        setForm={setForm}
        handleSave={handleSave}
        branches={branches}
      />
    </CRow>
  )
}

export default Branch
