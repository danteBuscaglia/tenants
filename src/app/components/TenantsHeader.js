import React, { useState } from 'react'
import { PAYMENT } from '../../common/enums/payment';
import { TENANTS_HEADER_TABS } from '../../common/enums/tabs';
import '../tenants.css';


const TenantsHeader = ({ tenants, setTenants }) => {

  const [tabs, setTabs] = useState(TENANTS_HEADER_TABS.all);

  const showTenantsWithDebt = () => {
    setTabs(TENANTS_HEADER_TABS.payment)
    const tenantsWithDebt = tenants.all?.filter(tenant => tenant.paymentStatus === PAYMENT.late);
    setTenants({ ...tenants, filtered: tenantsWithDebt });
  }

  const showAllTenants = () => {
    setTabs(TENANTS_HEADER_TABS.all)
    setTenants({ ...tenants, filtered: tenants.all });
  }

  const showLeaseToExpire = () => {
    setTabs(TENANTS_HEADER_TABS.lease)
    var dateInOneMonth = new Date();
    dateInOneMonth.setMonth(dateInOneMonth.getMonth() + 1);
    const tenantsToExpire = tenants.all?.filter(tenant => new Date(tenant.leaseEndDate).getTime() < dateInOneMonth.getTime());
    setTenants({ ...tenants, filtered: tenantsToExpire });
  }

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className={`nav-link tab ${tabs === TENANTS_HEADER_TABS.all && 'active'}`} href="#" onClick={showAllTenants}>All</a>
      </li>
      <li className="nav-item">
        <a className={`nav-link tab ${tabs === TENANTS_HEADER_TABS.payment && 'active'}`} href="#" onClick={showTenantsWithDebt}>Payment is late</a>
      </li>
      <li className="nav-item">
        <a className={`nav-link tab ${tabs === TENANTS_HEADER_TABS.lease && 'active'}`} href="#" onClick={showLeaseToExpire}>Lease ends in less than a month</a>
      </li>
    </ul>
  )

}

export default TenantsHeader