import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import Nav from './Nav';
import store from './store';
import Groceries from './Groceries';
import CreateForm from './CreateForm';
import { loadGrocery } from './store'

class _App extends Component{
  componentDidMount(){
    this.props.bootstrap();
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    })
    this.props.setView(window.location.hash.slice(1));
  }
  render(){
    return (
      <div>
        <h1>Acme Groceries</h1>
        <Nav />
        <CreateForm />
        <Groceries />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view)=> dispatch({ type: 'SET_VIEW', view }),
    bootstrap: ()=> {dispatch(loadGrocery())}
  }
}

const App = connect(state => state, mapDispatchToProps)(_App);


render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
