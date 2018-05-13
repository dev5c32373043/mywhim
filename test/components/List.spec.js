import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import List from '../../src/components/List';

describe('<List />', () => {
  it('should render <TestComponent /> with correct props', (done) => {
    const items = [{ id: 1, name: 'test' }];
    const TestComponent = props => <h1>props.name</h1>;
    const wrapper = shallow(<List className="test" items={items} component={TestComponent} />);
    expect(wrapper.find(TestComponent)).to.have.length(1);
    const testComponentProps = wrapper.find(TestComponent).props();
    expect(testComponentProps.id).to.eql(items[0].id);
    expect(testComponentProps.name).to.eql(items[0].name);
    done();
  });
});
