import * as React from "react";
import Input from "./input";

export interface FormProps {
  renderInput: any;
  renderButton: Function;
  handleChange: Function;
}

export interface FormState {
  data: any;
}

class Form<T extends FormProps, R extends FormState> extends React.Component<
  T,
  R
> {
  handleChange: Function = () => {};

  public renderInput(name: string, label?: string, type: string = "text") {
    const { data } = this.state;
    return (
      <Input
        label={label}
        id={name}
        name={name}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }

  public renderButton(label: string, style: string, type?: string, func?: any) {
    return (
      <button type={type} className={`${style}`} onClick={func}>
        {label}
      </button>
    );
  }
}

export default Form;
