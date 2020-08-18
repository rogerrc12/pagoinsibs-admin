import * as Yup from "yup";

export const validateSupplierForm = Yup.object().shape({
  supplier_type: Yup.number().required("Debes seleccionar el tipo de empresa"),
  name: Yup.string().required("Debes colocar un nombre"),
  rif: Yup.string()
    .required("Debes colocar un rif")
    .matches(/^[0-9]{3,15}$/, "Debes colocar un rif válido"),
  address: Yup.string().required("Debes colocar una dirección"),
  city: Yup.string().required("Debes colocar una ciudad"),
  state: Yup.string().required("Debes seleccionar un estado"),
  email: Yup.string().email("Debes colocar un correo válido").required("Debes colcoar un correo"),
  manager_fname: Yup.string().required("Debes colocar el primer nombre"),
  manager_lname: Yup.string().required("Debes colocar el primer apellido"),
  local_phone: Yup.string().matches(
    /^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/,
    "Debes colocar un teléfono válido"
  ),
  mobile_phone: Yup.string()
    .matches(
      /^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/,
      "Debes colocar un teléfono válido"
    )
    .notRequired(),
});
