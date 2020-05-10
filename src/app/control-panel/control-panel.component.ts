import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {
  @Output() onSelectedFormat = new EventEmitter<string>()

  
  toggleFormat(style){
    this.onSelectedFormat.emit(style)
  }

  
}
