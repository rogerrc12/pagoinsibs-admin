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
  local_phone: Yup.string().matches(/^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, "Debes colocar un teléfono válido"),
  mobile_phone: Yup.string()
    .matches(/^((\+[0-9]{2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, "Debes colocar un teléfono válido")
    .notRequired(),
});

export const productValidationForm = Yup.object().shape({
  name: Yup.string().required("Debes colocar un nombre para el producto."),
  amount: Yup.number().typeError("Debes colocar solo números.").required("Debes colocar un monto."),
  interestRate: Yup.number().when("isDirectDebit", {
    is: true,
    then: Yup.number().required("Debes colocar una tasa de interés.").min(0, "Debe ser mayor a 0.").max(1, "Debe ser menor a 1"),
    otherwise: Yup.number().notRequired(),
  }),
  maxDebitMonths: Yup.number().when("isDirectDebit", {
    is: true,
    then: Yup.number().required("Debes seleccionar los meses máximos a domiciliar"),
    otherwise: Yup.number().notRequired(),
  }),
  currencyId: Yup.number().required("Debes seleccionar la moneda correspondiente."),
});

export const accountValidationForm = Yup.object().shape({
  bank_id: Yup.string().required("Debes elegir un banco"),
  acc_number: Yup.string()
    .required("Debes colocar un número de cuenta")
    .matches(/^[0-9]{20}$/, "Deben ser 20 caracteres. Por favor revisa los datos."),
  acc_type: Yup.string().required("Debes elegir un tipo de cuenta"),
});

export const reportValidation = Yup.object().shape({
  fromDate: Yup.date().required("Debes seleccionar una fecha desde."),
  toDate: Yup.date().required("Debes seleccionar una fecha hasta."),
  reportType: Yup.string().required("Selecciona un tipo de reporte"),
  bankId: Yup.string().when("reportType", {
    is: ["pending-bank", "charged-payments"],
    then: Yup.string().required("El banco es obligatorio para este reporte."),
  }),
  supplierId: Yup.number().when("reportType", {
    is: "pending-supplier",
    then: Yup.number().required("El comercio es obligatorio para este reporte."),
  }),
});
