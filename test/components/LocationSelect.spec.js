import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MenuItem from 'material-ui/MenuItem';

import LocationSelect from '../../src/components/LocationSelect';

describe('<LocationSelect />', () => {
  it('should render <MenuItem />', (done) => {
    const locations = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }];
    const wrapper = shallow(<LocationSelect locations={locations} onChange={() => 'test'} />);
    expect(wrapper.find(MenuItem)).to.have.length(3);
    done();
  });
});
