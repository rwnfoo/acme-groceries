import React from 'react';

import { connect } from 'react-redux';
import { toggleGrocery, createRandomGrocery } from './store'

const _Groceries = ({ groceries, view, toggle, create, deleteGrocery })=> {
  return (
    <div>
      <button onClick={ create }>Create Random Shit</button>
      <ul>
        {
          groceries.filter(grocery => !view ||
          ( grocery.purchased && view === 'purchased') ||( !grocery.purchased && view === 'needs') ).map( grocery => {
            return (
              <li onClick={ ()=> toggle(grocery)} key={ grocery.id }
              className={ grocery.purchased ? 'purchased': ''}>{ grocery.name }
              <button onClick={ () => deleteGrocery(grocery.id) }>Delete</button></li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    toggle: (grocery)=>{
      // const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
      // dispatch({ type: 'UPDATE', grocery: updated});
      dispatch(toggleGrocery(grocery))
    },
    create: async()=>{
      // const grocery = (await axios.post('/api/groceries/random')).data;
      // dispatch({ type: 'CREATE', grocery });
      dispatch(createRandomGrocery())
    },
    deleteGrocery: async(id) => {
      dispatch(deleteGrocery(id))
    }
  };
};

const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;
