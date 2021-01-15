export const supplierValues = (values) => {
  let address;
  let city;
  let state;
  let rif;

  if (values.address) {
    address = values.address.split(",")[0].trim();
    city = values.address.split(",")[1].trim();
    state = values.address.split(",")[2].trim().toLowerCase();

    rif = values.rif.substring(1, values.rif.length);
  }

  return {
    supplier_type: values.supplierTypeId || "",
    name: values.name || "",
    rif: rif || "",
    address: address || "",
    city: city || "",
    state: state || "",
    email: values.email || "",
    manager_fname: values.managerFirstName || "",
    manager_lname: values.managerLastName || "",
    local_phone: values.localPhone || "",
    mobile_phone: values.mobilePhone || "",
  };
};

export const currencyFormValues = (values) => ({
  name: values.name || "",
  buyPrice: values.buyPrice || "",
  sellPrice: values.sellPrice || "",
  symbol: values.symbol || "",
});

export const accountValues = (values) => ({ bank_id: "", acc_number: "", acc_type: "" });

export const productValues = (values) => ({
  name: values.name || "",
  amount: Number(values.amount) || 0,
  isDirectDebit: values.isDirectDebit || false,
  currencyConversion: values.currencyConversion || false,
  interestRate: Number(values.interestRate) || 0,
  maxDebitMonths: values.maxDebitMonths || "",
  currencyId: values.currencyId || "",
});
