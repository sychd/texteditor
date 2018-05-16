import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {TextService} from './text-service/text.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public initialText$: Observable<string>;

  public get hasSelection(): boolean {
    return !!this._lastSelectionRange;
  }

  public get selectedWord(): string | null {
    return this.hasSelection ? this._lastSelectionRange.toString() : null;
  }

  private _lastSelectionRange: Range | null = null;

  constructor(private _textService: TextService) {
  }

  public ngOnInit() {
    this.initialText$ = this._textService.getMockText();
  }

  @HostListener('document:click', ['$event.target'])
  public resetSelectionFlag(target: HTMLElement) {
    const hasSelectedText = !!window.getSelection().toString();

    if (!(hasSelectedText && this._isAllowedElementForSelection(target))) {
      this._lastSelectionRange = null;
    }
  }

  public handleSynonymSelection(synonym: string) {
    if (!this.hasSelection) {
      return;
    }
    const containsSpace = Array.from(this.selectedWord).pop() === ' ';
    const updatedNode = document.createTextNode(containsSpace ? `${synonym} ` : synonym);
    this._lastSelectionRange.deleteContents();
    this._lastSelectionRange.insertNode(updatedNode);
  }

  public handleModification(modificationType: string) {
    if (!this.hasSelection) {
      return;
    }

    document.execCommand(modificationType);
    this._reassignSelectionRange();
  }

  public handleSelection() {
    this._reassignSelectionRange();
  }

  private _isAllowedElementForSelection(e: HTMLElement): boolean {
    const isEditableArea = e.hasAttribute('contenteditable');
    const isControlPanel = !!e.closest('#format-actions');

    return isEditableArea || isControlPanel;
  }

  private _reassignSelectionRange(): void {
    this._lastSelectionRange = window.getSelection().getRangeAt(0);
  }
}
