export const removeEmptyFields = (data: {
  [key in string]: never
}) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] == null) {
      delete data[key]
    }
  })
}
