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
import UserAddEditModal from '../UserAddEditModal'
import AppButton from '../../components/common/AppButton'
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  setUser,
} from '../../redux/slice/userSlice'
import { getAllTenants } from '../../redux/slice/tenantSlice'
import { getAllBranches } from '../../redux/slice/branchSlice'
import { getAllRoles } from '../../redux/slice/roleSlice'
import { getCompany } from '../../redux/slice/companySlice'
function Users() {
  const dispatch = useDispatch()
  // Users.jsx
  // Users.jsx Line 24 ke aas pass replace karein
  const usersData = useSelector((state) => state.users?.result)
  const roles = useSelector((state) => state.roles?.result || [])
  const branches = useSelector((state) => state.branches?.result || [])
  const company = useSelector((state) => state.companies?.result || null)
  const tenants = useSelector((state) => state.tenants?.result || [])
  const users = usersData || [] // Default empty array bahar rakhein

  const [visible, setVisible] = useState(false)
  const [activeColumn, setActiveColumn] = useState('')
  const [form, setForm] = useState({ id: 0, name: '' })

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllRoles())
    dispatch(getAllBranches())
    dispatch(getAllTenants())
    dispatch(getCompany())
  }, [dispatch])

  const handleSave = () => {
    if (!form.name) return

    if (form.id === 0) {
      dispatch(createUser(form))
    } else {
      dispatch(updateUser(form))
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
                <h4 className="mb-1">Users</h4>
                {/* Export Button Header ke nichy */}
                <AppButton variant="golden" data={users} fileName="Users_Report" size="sm">
                  download xls
                </AppButton>
              </div>

              <AppButton onClick={() => setVisible(true)}>Add User</AppButton>
            </div>

            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <TableHeader col="User Name" />
                  <TableHeader col="Email" />
                  <TableHeader col="Phone" />
                  <TableHeader col="Status" />
                  <TableHeader col="Action" />
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {users?.map((u) => (
                  <CTableRow key={u.id}>
                    {/* Data Binding as per your image */}
                    <CTableDataCell>{u.name}</CTableDataCell>
                    <CTableDataCell>{u.email}</CTableDataCell>
                    <CTableDataCell>{u.phoneNumber}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={u.status === 'Active' ? 'success' : 'danger'}>
                        {u.status}
                      </CBadge>
                    </CTableDataCell>

                    <CTableDataCell className="text-end">
                      <AppButton
                        size="sm"
                        onClick={() => {
                          setForm(u) // u is correct now
                          setVisible(true)
                        }}
                      >
                        Edit
                      </AppButton>
                      <AppButton
                        size="sm"
                        color="danger"
                        className="ms-1"
                        onClick={() => dispatch(deleteUser(u.id))}
                      >
                        Delete
                      </AppButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <UserAddEditModal
        visible={visible}
        setVisible={setVisible}
        form={form}
        setForm={setForm}
        handleSave={handleSave}
        roles={roles}
        branches={branches}
        companies={company}
        tenants={tenants}
      />
    </CRow>
  )
}

export default Users
