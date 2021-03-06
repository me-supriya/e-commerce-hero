import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Shop from './core/Shop'

import Menu from './core/Menu'
import AboutUs from './core/AboutUs'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddCoupon from './admin/AddCoupon'
import AddProduct from './admin/AddProduct'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Product from './core/Product'
import Cart from './core/Cart'

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/coupon" exact component={AddCoupon} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
