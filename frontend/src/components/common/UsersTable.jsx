import React from 'react'

const UsersTable = () => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                      <tr>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>No</th>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Username</th>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Fullname</th>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Role</th>
                          <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                  </tbody>
    </table>
    
  )
}

export default UsersTable