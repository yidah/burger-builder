import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
            console.log(res.data);
            // Firebase objects
            // -MOHcRcNIpnCR661NEaX: {customer: {…}, deliveryMethod: "By moto", ingredients: {…}, price: "6.9"}
            // -MOHcaT4c90p68VKKSNi: {customer: {…}, deliveryMethod: "By moto", ingredients: {…}, price: "5.5"}

            // turning Order objects from Firebase into an array
            const fetchedOrders = [];
            for(let key in res.data){
                // In order to preserve the id (MOHcRcNIpnCR661NEaX) push a new object
                // where I distribute the properties from the FireBase object with the spread operator
                // and I add a new property id which is the key
                fetchedOrders.push({
                    ...res.data[key],
                    id:key})
            }
            this.setState({loading:false, orders:fetchedOrders});
        })
        .catch(err=>{
            this.setState({loading:false});
        })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                           ingredients={order.ingredients}
                           price={+order.price}/>
                ))}
            </div>
        )

    }
} 

export default withErrorHandler(Orders, axios);