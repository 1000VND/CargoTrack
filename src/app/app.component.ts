import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import config from 'devextreme/core/config';
import { licenseKey } from '../devextreme-license';

config({ licenseKey });

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = '';

}
