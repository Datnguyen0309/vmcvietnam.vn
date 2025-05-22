import React, { type InputHTMLAttributes, forwardRef } from "react";
import Image from "next/image";
export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => <div className={`bg-white rounded-lg border-[1px] shadow ${className}`}>{children}</div>;

export const CardHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => <div className={`p-4 border-b ${className}`}>{children}</div>;

export const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => <div className={`p-4 ${className}`}>{children}</div>;

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  ...props
}) => (
  <button
    className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    {...props}
  />
);

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {React.Children.map(children, (child: any) => {
      if (React.isValidElement(child as React.ReactElement)) {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onChange(child.props.value),
        });
      }
      return child;
    })}
  </div>
);

interface RadioGroupItemProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ label, icon, className = "", ...props }, ref) => (
    <label
      className={`flex items-center space-x-3 cursor-pointer p-4 border rounded-lg ${className}`}
    >
      <input type="radio" className="hidden" ref={ref} {...props} />
      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
        <div
          className={`w-3 h-3 rounded-full bg-blue-600 ${
            props.checked ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {icon && <Image src={icon || "/placeholder.svg"} alt={label} width={24} height={24} />}
      <span>{label}</span>
    </label>
  )
);

RadioGroupItem.displayName = "RadioGroupItem";
