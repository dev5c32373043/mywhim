import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import CircularProgress from 'material-ui/CircularProgress';

import createMockStore from '../mockStore';
import shallowWithStore from '../shallowWithStore';
import ProductListContainer from '../../src/containers/ProductList';
import List from '../../src/components/List';

describe('<ProductListContainer />', () => {
  it('should render <CircularProgress /> when isLoading == true', (done) => {
    const testState = {
      mainPage: {
        productList: {
          products: [],
          isLoading: true,
        },
      },
    };
    const store = createMockStore(testState);
    const stub = sinon.stub(store, 'dispatch');
    const wrapper = shallowWithStore(<ProductListContainer />, store);
    expect(wrapper.dive().find(CircularProgress)).to.have.length(1);
    expect(wrapper.dive().find(List)).to.have.length(0);
    stub.restore();
    done();
  });

  it('should render <List /> when isLoading == false', (done) => {
    const testState = {
      mainPage: {
        productList: {
          products: [],
          isLoading: false,
        },
      },
    };
    const store = createMockStore(testState);
    const wrapper = shallowWithStore(<ProductListContainer />, store);
    expect(wrapper.dive().find(List)).to.have.length(1);
    expect(wrapper.dive().find(CircularProgress)).to.have.length(0);
    done();
  });
});
