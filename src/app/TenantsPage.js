import React, { useEffect, useState } from 'react';
import Alert from '../common/components/alert/Alert';
import Loader from '../common/components/loader/Loader';
import { Service } from '../Service';
import AddTenant from './components/AddTenant';
import TenantsHeader from './components/TenantsHeader';
import TenantsView from './components/TenantsView';

function TenantsPage() {

  const [tenants, setTenants] = useState({ all: [], filtered: [] });
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = async () => {
    setIsLoading(true);
    try {
      const tenants = await Service.getTenants();
      setTenants({ all: tenants, filtered: tenants });
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Loader isShown={isLoading} />

      <div className="container">
        <h1>Tenants</h1>

        {hasError && <Alert msg='Error getting tenants. Please, try again later' type='danger' />}

        {!hasError && <TenantsHeader tenants={tenants} setTenants={setTenants} />}

        {!hasError && tenants.filtered.length > 0 && !isLoading &&
          <TenantsView
            tenants={tenants}
            setTenants={setTenants}
            showAddTenant={showAddTenant}
            setShowAddTenant={setShowAddTenant}
          />
        }

        {tenants.filtered.length === 0 && !isLoading && !hasError && <Alert msg='There is no data.' type='warning' />}

        {showAddTenant && (
          <AddTenant
            tenants={tenants}
            setTenants={setTenants}
            setIsLoading={setIsLoading}
            setShowAddTenant={setShowAddTenant}
            setHasError={setHasError}
          />
        )}

      </div>

    </>
  );
}

export default TenantsPage;
