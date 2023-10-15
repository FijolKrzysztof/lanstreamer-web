import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = this.formatDateFieldsInRequest(req);

    return next.handle(modifiedReq).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          const modifiedBody = this.parseDateFieldsInResponse(event.body);
          return event.clone({body: modifiedBody});
        }
        return event;
      })
    );
  }

  private formatDateFieldsInRequest(req: HttpRequest<any>): HttpRequest<any> {
    const body = req.body;
    if (body && typeof body === 'object') {
      const formattedBody = this.formatDateFields(body);
      return req.clone({body: formattedBody});
    }
    return req;
  }

  private formatSingleDateField(value: any): any {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }

  private formatDateFields(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = this.formatSingleDateField(obj[key]);
      }
    }
    return obj;
  }

  private parseDateFieldsInResponse(body: any): any {
    const parsedBody = JSON.parse(body, (key, value) => {
      if (typeof value === 'string') {
        const dateValue = new Date(value);
        if (!isNaN(dateValue.getTime())) {
          return dateValue;
        }
      }
      return value;
    });
    return parsedBody;
  }
}
