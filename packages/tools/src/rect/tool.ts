import { Konva, Tool, ToolHooks, util } from '@pictode/core';

type ToolOptions = Pick<Konva.RectConfig, 'stroke' | 'fill' | 'strokeWidth' | 'opacity' | 'cornerRadius'>;

export const tool = (options: ToolOptions, hooks?: ToolHooks): Tool => {
  const startPointer: util.Point = new util.Point(0, 0);
  let rectangle: Konva.Rect | null = null;

  return {
    name: 'rectTool',
    options,
    hooks,
    mousedown({ app }): void {
      if (rectangle) {
        return;
      }
      startPointer.clone(app.pointer);
      rectangle = new Konva.Rect({
        strokeScaleEnabled: false,
        ...options,
      });
      rectangle.setPosition(startPointer);
      rectangle.width(0);
      rectangle.height(0);
      app.add(rectangle);
    },
    mousemove({ app }): void {
      if (!rectangle) {
        return;
      }
      rectangle.setPosition(
        new util.Point(Math.min(startPointer.x, app.pointer.x), Math.min(startPointer.y, app.pointer.y))
      );
      rectangle.width(Math.abs(app.pointer.x - startPointer.x));
      rectangle.height(Math.abs(app.pointer.y - startPointer.y));
      app.render();
    },
    mouseup({ app }): void {
      if (!rectangle) {
        return;
      }
      this.hooks?.onCompleteDrawing?.(app, rectangle);
      rectangle = null;
    },
  };
};

export default tool;
