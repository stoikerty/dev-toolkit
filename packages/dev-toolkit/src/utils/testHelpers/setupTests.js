// Additional tests-configuration
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
