import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Category from '../../src/components/Category';

describe('<Category />', () => {
  it('should render <Category active /> with correct style', (done) => {
    const wrapper = shallow(<Category name="test" active />);
    const categoryProps = wrapper.props();
    expect(categoryProps.backgroundColor).to.eql('#0098d0');
    expect(categoryProps.labelColor).to.eql('#ffffff');
    done();
  });

  it('should render <Category active={false} /> with correct style', (done) => {
    const wrapper = shallow(<Category name="test" active={false} />);
    const categoryProps = wrapper.props();
    expect(categoryProps.backgroundColor).to.eql('');
    expect(categoryProps.labelColor).to.eql('');
    done();
  });
});
