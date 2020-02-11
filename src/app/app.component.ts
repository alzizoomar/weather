import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { I18nService } from './services/i18n.service';
import { environment } from 'src/environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  languages: any = [];
  textDir = 'ltr'

  constructor(private i18nService: I18nService, private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'Arabic')
      {
        this.textDir = 'rtl';
      } 
      else
      {
        this.textDir = 'ltr';
      }
    });
  }

  ngOnInit() {
    environment.supportedLanguages.map(l => this.languages.push(l.name));
    this.i18nService.init(environment.defaultLanguage.name, this.languages);
  }
}
