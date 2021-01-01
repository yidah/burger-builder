import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux'; 
import * as actions from '../../store/actions/index';

class Auth extends Component {
  // handled state locally not through Redux
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    // In case we do not defined validation properties in any of our "orderForm" objects
    // otherwise we get an undefined error
    // We have also added  "validation:{}," to deliveryMethod object in "orderForm" but
    // therefore the rule below is for double security
    if (!rules) {
      return true;
    }

    // adding "&& isValid" force the value to comply with all rules in order to be valid
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event,controlName) =>{
    const updatedControls = {
      ...this.state.controls,
      [controlName]:{
        ...this.state.controls[controlName],
        value:event.target.value,
        valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched:true
      }
    }
    this.setState({controls:updatedControls})
  }

  submitHandler =(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

  }

  swithAuthModeHandler=()=>{
    this.setState(prevState=>{
      return {isSignup:!prevState.isSignup};
    })
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.swithAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? "SIGN IN": "SIGN UP"}</Button>
      </div>
    );

  }
}

const mapDispatchToProps = dispatch=>{
  return{
    onAuth:(email,password, isSignup)=>dispatch(actions.auth(email,password,isSignup))
  }
}

export default connect(null,mapDispatchToProps)(Auth);
