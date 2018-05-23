// @flow
import type { $Request } from 'express';

export type Request$User = {
  ...$Request,
  user: Object,
};

export type Request$Extended = {
  ...$Request,
  body: any,
};

export type Request$User$Extended = {
  ...Request,
  user: Object,
  body: any,
};
