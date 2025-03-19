import {
  DomHandler
} from "./chunk-JZQAVOZS.js";
import {
  CommonModule
} from "./chunk-2X3T34MY.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-UFOZVVBM.js";
import "./chunk-4MWRP73S.js";

// node_modules/primeng/fesm2022/primeng-dragdrop.mjs
var Draggable = class _Draggable {
  el;
  zone;
  renderer;
  scope;
  /**
   * Defines the cursor style.
   * @group Props
   */
  dragEffect;
  /**
   * Selector to define the drag handle, by default anywhere on the target element is a drag handle to start dragging.
   * @group Props
   */
  dragHandle;
  /**
   * Callback to invoke when drag begins.
   * @param {DragEvent} event - Drag event.
   * @group Emits
   */
  onDragStart = new EventEmitter();
  /**
   * Callback to invoke when drag ends.
   * @param {DragEvent} event - Drag event.
   * @group Emits
   */
  onDragEnd = new EventEmitter();
  /**
   * Callback to invoke on dragging.
   * @param {DragEvent} event - Drag event.
   * @group Emits
   */
  onDrag = new EventEmitter();
  handle;
  dragListener;
  mouseDownListener;
  mouseUpListener;
  _pDraggableDisabled = false;
  constructor(el, zone, renderer) {
    this.el = el;
    this.zone = zone;
    this.renderer = renderer;
  }
  get pDraggableDisabled() {
    return this._pDraggableDisabled;
  }
  set pDraggableDisabled(_pDraggableDisabled) {
    this._pDraggableDisabled = _pDraggableDisabled;
    if (this._pDraggableDisabled) {
      this.unbindMouseListeners();
    } else {
      this.el.nativeElement.draggable = true;
      this.bindMouseListeners();
    }
  }
  ngAfterViewInit() {
    if (!this.pDraggableDisabled) {
      this.el.nativeElement.draggable = true;
      this.bindMouseListeners();
    }
  }
  bindDragListener() {
    if (!this.dragListener) {
      this.zone.runOutsideAngular(() => {
        this.dragListener = this.renderer.listen(this.el.nativeElement, "drag", this.drag.bind(this));
      });
    }
  }
  unbindDragListener() {
    if (this.dragListener) {
      this.zone.runOutsideAngular(() => {
        this.dragListener && this.dragListener();
        this.dragListener = null;
      });
    }
  }
  bindMouseListeners() {
    if (!this.mouseDownListener && !this.mouseUpListener) {
      this.zone.runOutsideAngular(() => {
        this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.mousedown.bind(this));
        this.mouseUpListener = this.renderer.listen(this.el.nativeElement, "mouseup", this.mouseup.bind(this));
      });
    }
  }
  unbindMouseListeners() {
    if (this.mouseDownListener && this.mouseUpListener) {
      this.zone.runOutsideAngular(() => {
        this.mouseDownListener && this.mouseDownListener();
        this.mouseUpListener && this.mouseUpListener();
        this.mouseDownListener = null;
        this.mouseUpListener = null;
      });
    }
  }
  drag(event) {
    this.onDrag.emit(event);
  }
  dragStart(event) {
    if (this.allowDrag() && !this.pDraggableDisabled) {
      if (this.dragEffect) {
        event.dataTransfer.effectAllowed = this.dragEffect;
      }
      event.dataTransfer.setData("text", this.scope);
      this.onDragStart.emit(event);
      this.bindDragListener();
    } else {
      event.preventDefault();
    }
  }
  dragEnd(event) {
    this.onDragEnd.emit(event);
    this.unbindDragListener();
  }
  mousedown(event) {
    this.handle = event.target;
  }
  mouseup(event) {
    this.handle = null;
  }
  allowDrag() {
    if (this.dragHandle && this.handle) return DomHandler.matches(this.handle, this.dragHandle);
    else return true;
  }
  ngOnDestroy() {
    this.unbindDragListener();
    this.unbindMouseListeners();
  }
  static ɵfac = function Draggable_Factory(t) {
    return new (t || _Draggable)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Renderer2));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Draggable,
    selectors: [["", "pDraggable", ""]],
    hostAttrs: [1, "p-element"],
    hostBindings: function Draggable_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("dragstart", function Draggable_dragstart_HostBindingHandler($event) {
          return ctx.dragStart($event);
        })("dragend", function Draggable_dragend_HostBindingHandler($event) {
          return ctx.dragEnd($event);
        });
      }
    },
    inputs: {
      scope: [InputFlags.None, "pDraggable", "scope"],
      dragEffect: "dragEffect",
      dragHandle: "dragHandle",
      pDraggableDisabled: "pDraggableDisabled"
    },
    outputs: {
      onDragStart: "onDragStart",
      onDragEnd: "onDragEnd",
      onDrag: "onDrag"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Draggable, [{
    type: Directive,
    args: [{
      selector: "[pDraggable]",
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Renderer2
  }], {
    scope: [{
      type: Input,
      args: ["pDraggable"]
    }],
    dragEffect: [{
      type: Input
    }],
    dragHandle: [{
      type: Input
    }],
    onDragStart: [{
      type: Output
    }],
    onDragEnd: [{
      type: Output
    }],
    onDrag: [{
      type: Output
    }],
    pDraggableDisabled: [{
      type: Input
    }],
    dragStart: [{
      type: HostListener,
      args: ["dragstart", ["$event"]]
    }],
    dragEnd: [{
      type: HostListener,
      args: ["dragend", ["$event"]]
    }]
  });
})();
var Droppable = class _Droppable {
  el;
  zone;
  renderer;
  scope;
  /**
   * Whether the element is droppable, useful for conditional cases.
   * @group Props
   */
  pDroppableDisabled = false;
  /**
   * Defines the cursor style, valid values are none, copy, move, link, copyMove, copyLink, linkMove and all.
   * @group Props
   */
  dropEffect;
  /**
   * Callback to invoke when a draggable enters drop area.
   * @group Emits
   */
  onDragEnter = new EventEmitter();
  /**
   * Callback to invoke when a draggable leave drop area.
   * @group Emits
   */
  onDragLeave = new EventEmitter();
  /**
   * Callback to invoke when a draggable is dropped onto drop area.
   * @group Emits
   */
  onDrop = new EventEmitter();
  constructor(el, zone, renderer) {
    this.el = el;
    this.zone = zone;
    this.renderer = renderer;
  }
  dragOverListener;
  ngAfterViewInit() {
    if (!this.pDroppableDisabled) {
      this.bindDragOverListener();
    }
  }
  bindDragOverListener() {
    if (!this.dragOverListener) {
      this.zone.runOutsideAngular(() => {
        this.dragOverListener = this.renderer.listen(this.el.nativeElement, "dragover", this.dragOver.bind(this));
      });
    }
  }
  unbindDragOverListener() {
    if (this.dragOverListener) {
      this.zone.runOutsideAngular(() => {
        this.dragOverListener && this.dragOverListener();
        this.dragOverListener = null;
      });
    }
  }
  dragOver(event) {
    event.preventDefault();
  }
  drop(event) {
    if (this.allowDrop(event)) {
      DomHandler.removeClass(this.el.nativeElement, "p-draggable-enter");
      event.preventDefault();
      this.onDrop.emit(event);
    }
  }
  dragEnter(event) {
    event.preventDefault();
    if (this.dropEffect) {
      event.dataTransfer.dropEffect = this.dropEffect;
    }
    DomHandler.addClass(this.el.nativeElement, "p-draggable-enter");
    this.onDragEnter.emit(event);
  }
  dragLeave(event) {
    event.preventDefault();
    if (!this.el.nativeElement.contains(event.relatedTarget)) {
      DomHandler.removeClass(this.el.nativeElement, "p-draggable-enter");
      this.onDragLeave.emit(event);
    }
  }
  allowDrop(event) {
    let dragScope = event.dataTransfer.getData("text");
    if (typeof this.scope == "string" && dragScope == this.scope) {
      return true;
    } else if (Array.isArray(this.scope)) {
      for (let j = 0; j < this.scope.length; j++) {
        if (dragScope == this.scope[j]) {
          return true;
        }
      }
    }
    return false;
  }
  ngOnDestroy() {
    this.unbindDragOverListener();
  }
  static ɵfac = function Droppable_Factory(t) {
    return new (t || _Droppable)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Renderer2));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Droppable,
    selectors: [["", "pDroppable", ""]],
    hostAttrs: [1, "p-element"],
    hostBindings: function Droppable_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("drop", function Droppable_drop_HostBindingHandler($event) {
          return ctx.drop($event);
        })("dragenter", function Droppable_dragenter_HostBindingHandler($event) {
          return ctx.dragEnter($event);
        })("dragleave", function Droppable_dragleave_HostBindingHandler($event) {
          return ctx.dragLeave($event);
        });
      }
    },
    inputs: {
      scope: [InputFlags.None, "pDroppable", "scope"],
      pDroppableDisabled: [InputFlags.HasDecoratorInputTransform, "pDroppableDisabled", "pDroppableDisabled", booleanAttribute],
      dropEffect: "dropEffect"
    },
    outputs: {
      onDragEnter: "onDragEnter",
      onDragLeave: "onDragLeave",
      onDrop: "onDrop"
    },
    features: [ɵɵInputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Droppable, [{
    type: Directive,
    args: [{
      selector: "[pDroppable]",
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Renderer2
  }], {
    scope: [{
      type: Input,
      args: ["pDroppable"]
    }],
    pDroppableDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropEffect: [{
      type: Input
    }],
    onDragEnter: [{
      type: Output
    }],
    onDragLeave: [{
      type: Output
    }],
    onDrop: [{
      type: Output
    }],
    drop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }],
    dragEnter: [{
      type: HostListener,
      args: ["dragenter", ["$event"]]
    }],
    dragLeave: [{
      type: HostListener,
      args: ["dragleave", ["$event"]]
    }]
  });
})();
var DragDropModule = class _DragDropModule {
  static ɵfac = function DragDropModule_Factory(t) {
    return new (t || _DragDropModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DragDropModule,
    declarations: [Draggable, Droppable],
    imports: [CommonModule],
    exports: [Draggable, Droppable]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [Draggable, Droppable],
      declarations: [Draggable, Droppable]
    }]
  }], null, null);
})();
export {
  DragDropModule,
  Draggable,
  Droppable
};
//# sourceMappingURL=primeng_dragdrop.js.map
