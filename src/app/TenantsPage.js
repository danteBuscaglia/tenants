import React, { useEffect, useState } from 'react';
import { Service } from '../Service';
import AddTenant from './components/AddTenant';
import TenantsHeader from './components/TenantsHeader';
import TenantsView from './components/TenantsView';

function TenantsPage() {

  const [tenants, setTenants] = useState({ all: [], filtered: [] });
  const [showAddTenant, setShowAddTenant] = useState(false);

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = async () => {
    try {
      const tenants = await Service.getTenants();
      setTenants({ all: tenants, filtered: tenants });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className="container">
        <h1>Tenants</h1>

        <TenantsHeader tenants={tenants} setTenants={setTenants} />

        <TenantsView
          tenants={tenants}
          setTenants={setTenants}
          showAddTenant={showAddTenant}
          setShowAddTenant={setShowAddTenant}
        />

        <AddTenant
          tenants={tenants}
          setTenants={setTenants}
          setShowAddTenant={setShowAddTenant}
        />

      </div>

    </>
  );
}

export default TenantsPage;
