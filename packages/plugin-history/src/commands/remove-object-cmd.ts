import { App } from '@pictode/core';

import { Cmd } from '../types';

import { BaseCmd } from './base';

export class RemoveObjectCmd extends BaseCmd<Cmd.RemoveObjectOptions> {
  constructor(app: App, options: Cmd.RemoveObjectOptions) {
    super(app, options);
  }

  public execute(): void {
    this.app.remove(...this.options.object);
  }

  public undo(): void {
    this.app.add(...this.options.object);
  }
}

export default RemoveObjectCmd;
