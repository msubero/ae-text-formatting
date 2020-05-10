import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"]
})
export class FileComponent {
  @Input() formatedText: string;
  @Output() onSelectedText = new EventEmitter();
  @ViewChild("mockText") mockText: ElementRef;

  constructor(private window: Window) {}

  handleClick() {
    const selection = this.window.getSelection();
    const selected = selection.toString();
    if (selected) {
      const range = selection.getRangeAt(0);
      const selectedStart = range.startOffset;
      const selectedEnd = range.endOffset;
      const data = {
        selected: {
          text: selected,
          start: selectedStart,
          end: selectedEnd
        },
        currText: this.mockText.nativeElement.innerHTML
      };

      this.onSelectedText.emit(data);
    }
  }
}
