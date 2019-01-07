import _get from 'lodash.get'

export const isFormData = value => _get(value, 'constructor.name', '') === 'FormData'
