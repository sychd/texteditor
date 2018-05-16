import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CONTROL_PANEL_ITEMS} from './contol-panel-items.constant';
import {ControlPanelItem} from './entity/control-panel-item';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {
  @Input()
  public hasSelection = false;

  @Output()
  public modifySelection: EventEmitter<string> = new EventEmitter<string>();

  public panelItems: ControlPanelItem[] = CONTROL_PANEL_ITEMS;

  constructor() {
  }

  public isActive(type: string) {
    return this.hasSelection && document.queryCommandState(type);
  }

  public modify(type: string) {
    this.modifySelection.emit(type);
  }
}
