export function createControl(config, validation) {
  return {
    ...config,
    validation,
    value: '',
    valid: !validation,
    touched: false,
  }
}

export function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true

  for (let formControl in formControls) {
    if (formControls.hasOwnProperty(formControl)) {
      isFormValid = formControls[formControl].valid && isFormValid
    }
  }

  return isFormValid
}
