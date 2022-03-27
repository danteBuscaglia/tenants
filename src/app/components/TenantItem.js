import React from 'react'

const TenantItem = ({
  tenant,
  deleteTenant
}) => {

  return (
    <tr>
      <th>{tenant.id}</th>
      <td>{tenant.name}</td>
      <td>{tenant.paymentStatus}</td>
      <td>{tenant.leaseEndDate}</td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteTenant(tenant.id)}>Delete</button>
      </td>
    </tr>
  )

}

export default TenantItem