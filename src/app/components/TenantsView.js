import React, { useState } from 'react'
import Alert from '../../common/components/alert/Alert';
import Loader from '../../common/components/loader/Loader';
import { Service } from '../../Service';
import TenantItem from './TenantItem';
import '../tenants.css'

const TenantsView = ({
  tenants,
  setTenants,
  showAddTenant,
  setShowAddTenant
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [tenantWasDeleted, setTenantWasDeleted] = useState(false);

  const deleteTenant = async (id) => {
    setIsLoading(true);
    try {
      await Service.deleteTenant(id);
      const tenants = await Service.getTenants();
      setTenants({ all: tenants, filtered: tenants });
      setTenantWasDeleted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>

      <Loader isShown={isLoading} />

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Payment Status</th>
            <th>Lease End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.filtered?.map((tenant) =>
            <TenantItem key={tenant.id} tenant={tenant} deleteTenant={deleteTenant} />
          )}
        </tbody>
      </table>

      {tenantWasDeleted && <Alert msg='Tenant deleted' type='danger' setIsShown={setTenantWasDeleted} />}

      <div>
        <button className="btn btn-secondary" onClick={() => setShowAddTenant(!showAddTenant)}>Add Tenant</button>
      </div>

    </>
  )

}

export default TenantsView