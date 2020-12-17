import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price:0
  };
  // Before we render the child component
  componentWillMount(){
      const query =new URLSearchParams(this.props.location.search);
      const ingredients ={};
      let price=0;
      for(let param of query.entries()){
          // query.entries method converts our query search paramaters (http://localhost:3000/checkout?bacon=1&cheese=1&meat=1&salad=5)
          // in key value arrays something like this:
            // (2) ["bacon", "1"]
            // (2) ["cheese", "1"]
            // (2) ["meat", "1"]
            // (2) ["salad", "5"] 
          //console.log(param);
          if(param[0]==='price'){
              price = param[1];

          }else{
            ingredients[param[0]] = +param[1];
          }         
      }
      this.setState({ingredients: ingredients, totalPrice:price});

  }
  checkoutCancelledHandler = () => {
    // Goes back to the last page
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* As we use render instead of component history (this.props.history.push('/');) will not be available in the ContactData component 
        to redirect the user to another page once the order was completed
        There are two alternatives:
        1. wrap the  ContactData component with the withRouter helper component 
        2. pass the props I get in the render method on to the ContactData 
        This uses solution 2  */}
        <Route path={this.props.match.path + '/contact-data'} 
               render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/>
      </div>
    );
  }
}

export default Checkout;
