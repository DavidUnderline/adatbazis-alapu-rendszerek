import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { FooterComponent } from './shared/footer/footer.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adatbazisalapu-allaskereso-project';

}
