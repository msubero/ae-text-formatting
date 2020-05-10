import { Component, OnInit } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { TextService } from "./text-service/text.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Simple Text Editor";
  text$: Observable<string>;
  textFormat = [];
  text = {
    curr: "",
    firstPart: "",
    lastPart: "",
    selected: {
      text: "",
      start: 0,
      end: 0
    }
  };

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.text$ = from(this.textService.getMockText())
  }

  setFotmat(style) {
    const includesStyle = this.textFormat.includes(style);
    if (includesStyle) {
      this.textFormat = this.textFormat.filter(f => f !== style);
    } else {
      this.textFormat.push(style);
    }

    this.formatText();
  }

  formatText() {
    const replacement = `
    <span class="${this.textFormat.join(" ")}">
    ${this.text.selected.text}
    </span>`;

    const newText = this.text.firstPart + replacement + this.text.lastPart;
    this.text$ = of(newText);
  }

  setText({ selected, currText }) {
    this.text.firstPart = currText.substr(0, selected.start);
    this.text.lastPart = currText.substr(selected.end);
    this.text.selected = selected;
  }
}
