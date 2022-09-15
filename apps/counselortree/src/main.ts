import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';


import { StoreModule } from '@ngrx/store'
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { AuthModule,AuthClientConfig } from '@auth0/auth0-angular'
import { AuthGuard, CacheInterceptor } from '@swogeti/control-flow';

import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

fetch('assets/config/config.json')
.then((response) => response.json())
.then(_config => {
  if (environment.production) {
    enableProdMode();
  }
  bootstrapApplication(AppComponent, {
    providers: [
      {
        provide: APP_INITIALIZER,
        multi: true,
        deps:[ AuthClientConfig ],
        useFactory: (authConfig: AuthClientConfig) => {
          authConfig.set(_config.auth)
          const insights = new ApplicationInsights({
            config:{
              instrumentationKey: _config.insights.instrumentationKey,
              enableAutoRouteTracking: environment.production 
            }
          })
          insights.loadAppInsights();
          insights.trackPageView();
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          return() => {}
        }
      },
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi:true },
      HttpClientModule,
      AuthGuard,
      importProvidersFrom(
        AuthModule.forRoot({
          domain: _config.auth.domain,
          clientId: _config.auth.clientId
        }),
        RouterModule.forRoot(routes),
        StoreModule.forRoot({
          router: routerReducer
        }),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument()
      )
    ]
  })
})