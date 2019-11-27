import React, {Component} from 'react';
import Cart from './Cart';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from './Nav';



const SERVER_URL = "http://localhost:3000/products.json"
<<<<<<< HEAD:restaurant_client/src/components/Menu.js
=======
// const SERVER_URL = "https://restaurant-order-server.herokuapp.com/products.json"
>>>>>>> bda4361935c51517a363e85806e624a6687db437:src/components/Menu.js

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state ={
      products: [],
      categories: [],
      selected_products: {}
    }
    this._handleChange = this._handleChange.bind(this);
    this.addItemToOrder = this.addItemToOrder.bind(this);
  }

  //get all products
  fetchProducts() {
    axios.get(SERVER_URL).then( (results) => {
      const allProducts = results.data;
      this.setState({products: allProducts})

      const courses = [...new Set(allProducts.map(p => p.category))]
      this.setState({categories: courses});

    })
  }

  componentDidMount() {
    this.fetchProducts();

    const orderItems = JSON.parse(localStorage.getItem('orderItems'));
    if (orderItems) {
      this.setState({selected_products: orderItems});
    };

  }

  addItemToOrder(id) {
    const orderItems = this.state.selected_products;
    orderItems[id] = 1;
    this.setState({selected_products: orderItems})
  }

  _handleChange(orderItems) {
    this.setState({selected_products: orderItems});
  }

  render() {
    return (
      <div>
        <Nav />
        <div id="main" className="container-lg container-fluid">
          <div id="menu">
            <h1>Menu</h1>
            {this.state.categories.map( cat => {
              return (
              <div id="category" key={cat}>
                <h3>{cat}</h3>
                <span id="cat-divider"></span>
                {this.state.products.map( prod => {
                    return (prod.category === cat &&
                    <div key={prod.id}>
                      <label className="product-name">
                        {prod.name}
                      </label>
                      <label className="product-price">
                        ${Number(prod.price).toFixed(2)}
                      </label>
                      {this.state.selected_products[Number(prod.id).toString()] ?
                        (<button className="quantity" type="button">Added</button>)
                        :
                        (<button className="quantity" type="button" onClick={() => this.addItemToOrder(prod.id)}>Add</button>)
                      }
                      <br/>
                      {prod.stars > 1 ? Array.from(Array(prod.stars).keys()).map( star => { return (<FontAwesomeIcon key={star} icon='heart' />)
                      }) : ""}
                      <br/>
                    </div>);
                })}
              </div>);
            })}
          </div>

          <Cart onClick={this._handleChange} cart_products={this.state.selected_products} products={this.state.products} />
        </div>
      </div>
    );
  }


}


export default Menu;