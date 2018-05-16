import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
  @Input()
  public text = '';
  @Output()
  public selection: EventEmitter<void> = new EventEmitter<void>();
}
