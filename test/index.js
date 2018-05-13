import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import chai from 'chai';

chai.use(require('sinon-chai'));

configure({ adapter: new Adapter() });
