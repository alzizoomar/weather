import 'rxjs/add/operator/map'
import { HttpClient} from "@angular/common/http";
import { BaseModel } from "./base-model";
import { environment } from "../../environments/environment";


export class BaseApiService<T extends BaseModel> {
    public baseUrl = environment.baseUrl;
    public url = "/";
    public APPID = environment.APPID;


    constructor(protected http: HttpClient) {

    }
}
