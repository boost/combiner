import Request from './Request';

class MeRequest extends Request {
  uri() {
    return '/me';
  }
}

export default MeRequest;
