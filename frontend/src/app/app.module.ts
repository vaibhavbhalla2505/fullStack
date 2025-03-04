import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { BookTableComponent } from './book-table/book-table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService, MsalGuard, MsalRedirectComponent, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalInterceptor, MsalBroadcastService } from '@azure/msal-angular';
import { PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { LoginComponent } from './login/login.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { SignupComponent } from './signup/signup.component';
import { environment } from './auth.config';
export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azure.tenantAuth.clientId,
      authority: environment.azure.tenantAuth.authority,
      redirectUri: environment.azure.tenantAuth.redirectUri, 
      postLogoutRedirectUri: 'http://localhost:4200', 
      navigateToLoginRequestUrl: false 
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,  
      storeAuthStateInCookie: false,  
    },
    system: {
      allowRedirectInIframe:false
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['User.Read']
    }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['User.Read']]
    ])
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    FormInputsComponent,
    BookTableComponent,
    LoginComponent,
    AuthNavbarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalInterceptor,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
