import React, { useState } from 'react'
import Alert from '../../common/components/alert/Alert';
import { useForm } from '../../common/custom-hooks/useForm';
import { PAYMENT } from '../../common/enums/payment';
import { Service } from '../../Service';

const AddTenant = ({
  tenants,
  setTenants,
  setIsLoading,
  setShowAddTenant
}) => {

  const [values, handleChange] = useForm({ name: '', paymentStatus: PAYMENT.current, leaseEndDate: '' });
  const [hasError, setHasError] = useState({ hasError: false, isDataComplete: false, isNameValid: false, isLeaseValid: false });

  const addTenant = async (e) => {
    e.preventDefault();
    if (!values.name || !values.leaseEndDate || !values.paymentStatus) {
      setHasError({ ...hasError, isDataComplete: true });
      return;
    }
    if (!isNameValid()) {
      setHasError({ ...hasError, isNameValid: true });
      return;
    }
    if (!isLeaseValid()) {
      setHasError({ ...hasError, isLeaseValid: true });
      return;
    }
    setIsLoading(true);
    try {
      const newTenant = await Service.addTenant(values);
      setTenants({ all: [...tenants.all, newTenant], filtered: [...tenants.filtered, newTenant] });
      setShowAddTenant(false);
      setHasError({ ...hasError, hasError: false });
    } catch (error) {
      console.log(error);
      setHasError({ ...hasError, hasError: true });
    } finally {
      setIsLoading(false);
    }
  }

  const isNameValid = () => {
    return values.name.length <= 25;
  }

  const isLeaseValid = () => {
    return new Date(values.leaseEndDate).getTime() > new Date();
  }

  return (
    <>

      {hasError.hasError && <Alert msg='Error adding tenants. Please, try again later.' type='danger' />}

      {hasError.isDataComplete && <Alert msg='Please, complete all data.' type='danger' setIsShown={setHasError} />}

      {hasError.isLeaseValid && <Alert msg='Please, enter a valid Lease End Date.' type='danger' setIsShown={setHasError} />}

      {hasError.isNameValid && <Alert msg='Please, enter a valid name.' type='danger' setIsShown={setHasError} />}

      <div className="mt-3">
        <form onSubmit={addTenant}>
          <div className="form-group">
            <label>Name</label>
            <input name='name' className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Payment Status</label>
            <select name='paymentStatus' value={values?.paymentStatus} className="form-control" onChange={handleChange}>
              <option value={PAYMENT.current}>CURRENT</option>
              <option value={PAYMENT.late}>LATE</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lease End Date</label>
            <input name='leaseEndDate' className="form-control" onChange={handleChange} />
          </div>
          <button className="btn btn-primary">Save</button>
          <button className="btn" onClick={() => setShowAddTenant(false)}>Cancel</button>
        </form>
      </div>

    </>
  )

}

export default AddTenant