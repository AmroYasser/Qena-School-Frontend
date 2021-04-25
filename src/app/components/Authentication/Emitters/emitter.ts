import { from } from "rxjs"
import {EventEmitter} from '@angular/core'

export class Emitter {
    public static logged_id=new EventEmitter<number>()
}
