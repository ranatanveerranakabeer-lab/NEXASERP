import React from 'react'
import { CTableHeaderCell } from '@coreui/react'

const TableHeader = ({ col, activeColumn, setActiveColumn }) => {
  const isActive = activeColumn === col

  return (
    <CTableHeaderCell
      onClick={() => setActiveColumn(col)}
      style={{
        cursor: 'pointer',
        padding: '12px 16px',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          color: isActive ? '#7c3aed' : '#6b7280',
          fontWeight: isActive ? '600' : '400',
        }}
      >
        {col}

        {/* ✅ Perfect underline */}
        <div
          style={{
            position: 'absolute',
            bottom: '-6px',
            left: 0,
            width: isActive ? '100%' : '0%',
            height: '3px',
            background: 'linear-gradient(90deg, #7c3aed, #4c1d95)',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
    </CTableHeaderCell>
  )
}

export default TableHeader