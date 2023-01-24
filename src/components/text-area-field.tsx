import { type ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"textarea"> {
  name: string;
  label?: string;
}

// eslint-disable-next-line react/display-name
const TextAreaField = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref): JSX.Element => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <div>
        {props.label && (
          <label
            htmlFor={props.name}
            className="block text-xs font-medium text-black-700"
          >
            {props.label}
          </label>
        )}
        <textarea {...props} ref={ref} id={props.name} />
        {state.error && <p>{state.error?.message}</p>}
      </div>
    );
  }
);

export { TextAreaField };
