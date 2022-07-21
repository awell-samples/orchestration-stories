interface LabelProps {
  htmlFor: string
  label: string
  mandatory?: boolean
}
export const Label = ({ htmlFor, label, mandatory }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block text-slate-600 text-3xl pt-2">
      {label}
      {mandatory && <span className="text-red-500">*</span>}
    </label>
  )
}
