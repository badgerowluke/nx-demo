import { HttpHandler,
    HttpProgressEvent,
    HttpInterceptor,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpUserEvent,
    HttpRequest,
    HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CacheInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      const nextReq = req.clone({
        headers: req.headers.set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Sat, 01 Jan 2999 00:00:00 GMT')
          .set('If-Modified-Since', '0')
      });

      return next.handle(nextReq);
  }
}