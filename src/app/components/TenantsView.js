import React, { useState } from 'react';
import Alert from '../../common/components/alert/Alert';
import Loader from '../../common/components/loader/Loader';
import { Service } from '../../Service';
import { sortByDate, sortByString } from '../../utils/sorted-by';
import '../tenants.css';
import TenantItem from './TenantItem';

const TenantsView = ({
  tenants,
  setTenants,
  showAddTenant,
  setShowAddTenant
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tenantWasDeleted, setTenantWasDeleted] = useState(false);

  const deleteTenant = async (id) => {
    setIsLoading(true);
    try {
      await Service.deleteTenant(id);
      const tenants = await Service.getTenants();
      setTenants({ all: tenants, filtered: tenants });
      setHasError(false);
      setTenantWasDeleted(true);
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Ascending sorting
   */

  const sortByName = () => {
    const tenantsSortedByName = sortByString('name', tenants.filtered);
    setTenants({ ...tenants, filtered: tenantsSortedByName });
  }

  const sortByPayment = () => {
    const tenantsSortedByPayment = sortByString('paymentStatus', tenants.filtered);
    setTenants({ ...tenants, filtered: tenantsSortedByPayment });
  }

  const sortByLease = () => {
    const tenantsSortedByDate = sortByDate('leaseEndDate', tenants.filtered);
    setTenants({ ...tenants, filtered: tenantsSortedByDate });
  }

  return (
    <>

      <Loader isShown={isLoading} />

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => sortByName()}>Name</th>
            <th onClick={() => sortByPayment()}>Payment Status</th>
            <th onClick={() => sortByLease()}>Lease End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.filtered?.map((tenant) =>
            <TenantItem key={tenant.id} tenant={tenant} deleteTenant={deleteTenant} />
          )}
        </tbody>
      </table>

      {hasError && <Alert msg='Error deleting tenants. Please, try again later.' type='danger' setIsShown={setHasError} />}

      {tenantWasDeleted && <Alert msg='Tenant deleted' type='danger' setIsShown={setTenantWasDeleted} />}

      <div>
        <button className="btn btn-secondary" onClick={() => setShowAddTenant(!showAddTenant)}>Add Tenant</button>
      </div>

    </>
  )

}

export default TenantsView