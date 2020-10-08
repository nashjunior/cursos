import { Router } from 'express';
import adapterRoute from '../adapters/ExpressRoutesAdapter';
import makeSignUpController from '../factories/SignUp';

export default (router: Router): void => {
  router.post(`/signup`, adapterRoute(makeSignUpController()));
};
