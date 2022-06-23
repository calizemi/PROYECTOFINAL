export const rulesEmail = {
    required: { value: true, message: "Campo requerido" },
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: "Ingresar un email valido",
    },
  };
 export const rulesContraseña = {
    required: { value: true, message: "Campo requerido" },
    pattern: {
      value: /[a-zA-Z0-9]{8}/,
      message: "Ingresa 8 carácteres que cuenten con letras y números",
    },
  };
  export const rulesText = {
    required: { value: true, message: "Campo requerido" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "Ingresar solo letras",
    },
    minLength: {
      value: 3,
      message: "Mínimo 3 caracteres",
    },
    maxLength: {
      value: 80,
      message: "Máximo 80 caracteres",
    },
  };
