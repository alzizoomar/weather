import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { I18nService } from 'src/app/services/i18n.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  language: string;
  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
    if(this.i18nService.language == "English") {
      this.language = "Arabic"
    } else {
      this.language = "English"
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
    if(language == "English") {
      this.language = "Arabic"
    } else {
      this.language = "English"
    }
  }

  get languages(): string[] {
      return this.i18nService.supportedLanguages;
  }
}

