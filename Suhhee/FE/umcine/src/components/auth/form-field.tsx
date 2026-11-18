import type { InputHTMLAttributes } from "react";

export function FormField({ label, error, hint, children, ...props }: InputHTMLAttributes<HTMLInputElement> & {
  label: string; error?: string; hint?: string; children?: React.ReactNode;
}) {
  const id = props.id || props.name;
  return <div className="auth-field">
    <label htmlFor={id}>{label}</label>
    <div className={`auth-input-row ${error ? "auth-input-error" : ""}`}>
      <input {...props} id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-help` : undefined} />
      {children}
    </div>
    {(error || hint) && <p id={`${id}-help`} className={error ? "field-error" : "field-hint"}>{error || hint}</p>}
  </div>;
}
