import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppRoutes } from '../../constants';

import { Scene } from '../../../cluck/components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path={AppRoutes.GAME.path} component={Scene} />
      </Switch>
    );
  }
}

export default Routes;
