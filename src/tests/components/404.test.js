import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/404';

test('should test 404 page', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
})