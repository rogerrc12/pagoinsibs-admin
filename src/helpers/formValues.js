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
  ISO: values.ISO || "",
  symbol: values.symbol || "",
});
